import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { BackupDataService, BackupFile } from 'src/app/shared/shared-services/backup-data.service';
import { LoadingService } from '../loading/loading.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { Subscription } from 'rxjs';
import { ImportBackupModalService } from './import-backup-modal.service';
import { environment } from 'src/environments/environment';
import { UpdateDbEntriesService } from 'src/app/indexed-db/update-db-entries.service';

@Component({
    selector: 'app-import-backup-modal',
    templateUrl: './import-backup-modal.component.html',
    styleUrl: './import-backup-modal.component.css',
    standalone: false
})
export class ImportBackupModalComponent implements OnInit, OnDestroy {
  

  showImportModalSub: Subscription;
  showImportModal: boolean;
  importFile: any;
  importType: string;
  importFileError: string;
  importForUser: boolean = true;
  currentUser: IdbUser;
  importName: string;
  overwriteData: boolean = true;

  constructor(private userIdbService: UserIdbService,
    private loadingService: LoadingService,
    private backupDataService: BackupDataService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private importBackupModalService: ImportBackupModalService,
    private updateDbEntriesService: UpdateDbEntriesService
  ) {

  }

  ngOnInit(): void {
    this.showImportModalSub = this.importBackupModalService.showImportModal.subscribe(value => {
      this.showImportModal = value;
      if (this.showImportModal) {
        // Load current user
        this.importFile = undefined;
        this.importFileError = undefined;
        this.importName = undefined;
        this.currentUser = this.userIdbService.user.getValue();
        if (!this.currentUser) {
          this.overwriteData = false;
        }
      }
    })
  }

  ngOnDestroy() {
    if (this.showImportModalSub) {
      this.showImportModalSub.unsubscribe();
    }
  }

  cancelImportBackup() {
    this.importBackupModalService.showImportModal.next(false);
    this.importFile = undefined;
    this.importFileError = undefined;
    (document.getElementById('selectImportFile') as HTMLInputElement).value = '';
  }

  
  setImportFile(event: EventTarget) {
    let files: FileList = (event as HTMLInputElement).files;
    if (files) {
      if (files.length !== 0) {
        let fr: FileReader = new FileReader();
        fr.readAsText(files[0]);
        fr.onloadend = (e) => {
          try {
            this.importFile = JSON.parse(JSON.stringify(fr.result));
            let testBackup = JSON.parse(this.importFile)
            if (!testBackup.origin || testBackup.origin != "JUSTIFI") {
              this.importFileError = "Selected file does not come from JUSTIFI and cannot be imported."
            } else if (!testBackup.version || !this.backupDataService.backupFileVersionCheck(testBackup.version, environment.version)) {
              this.importFileError = "Selected file does not match with the current version and cannot be imported."
            } else {
              this.importForUser = (testBackup.backupFileType == "User");
              if (this.importForUser) {
                // Import user backup file
                this.importType = "User"
                this.importName = testBackup.user.guid;
                this.importFileError = undefined;
              }
            }
          } catch (err) {
            console.log(err);
          }
        };
      }
    }
  }

  async importBackupFile() {
    this.showImportModal = false;
    this.loadingService.setLoadingStatus(true);
    this.loadingService.setLoadingMessage("Importing backup file...")
    try {
      let tmpBackupFile: BackupFile = JSON.parse(this.importFile);
      if (this.importForUser) {
        if (this.overwriteData) {
          await this.overwriteCurrentUser(tmpBackupFile);
        } else {
          await this.addToCurrentUser(tmpBackupFile);
        }
      }
      this.loadingService.setLoadingStatus(false);
      this.cancelImportBackup();
      this.router.navigateByUrl('user');
    } catch (err) {
      console.log(err);
      alert('Error importing backup'); // TODO: implement a toast service
      this.loadingService.setLoadingStatus(false);
    }
  }

  async addToCurrentUser(importFile: BackupFile) {
    // Add backup data to current user
    await this.backupDataService.importUserBackupFile(importFile, this.currentUser.guid);
    this.currentUser.kpiFacilityMigrationDone = false;
    await this.updateDbEntriesService.updateDbEntries(this.currentUser);
    await this.dbChangesService.selectUser(this.currentUser, false);
  }

  async overwriteCurrentUser(importFile: BackupFile) {
    // Delete data for current user
    this.loadingService.setLoadingMessage('Deleting Current User Data...');
    await this.dbChangesService.deleteCurrentUserData(this.currentUser);
    // Add backup data to current user
    await this.addToCurrentUser(importFile);
  }

}
