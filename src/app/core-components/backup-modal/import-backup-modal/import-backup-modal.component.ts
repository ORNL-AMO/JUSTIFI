import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { BackupDataService, BackupFile } from 'src/app/shared/shared-services/backup-data.service';
import { LoadingService } from '../../loading/loading.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser } from 'src/app/models/user';
import { firstValueFrom, Subscription } from 'rxjs';
import { BackupModalService } from '../backup-modal.service';
import { environment } from 'src/environments/environment';
import { UpdateDbEntriesService } from 'src/app/indexed-db/update-db-entries.service';
import * as ExcelJS from 'exceljs';
import { ParseExcelTemplateService } from 'src/app/shared/shared-services/parse-excel-template.service';
import { getNewIdbCompany, IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';

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

  importMethod: 'jsonFile' | 'template' = undefined;
  workbook: ExcelJS.Workbook;
  fileUploadError: string = '';
  constructor(private userIdbService: UserIdbService,
    private loadingService: LoadingService,
    private backupDataService: BackupDataService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private backupModalService: BackupModalService,
    private updateDbEntriesService: UpdateDbEntriesService,
    private parseExcelTemplateService: ParseExcelTemplateService,
    private companyIdbService: CompanyIdbService
  ) {

  }

  ngOnInit(): void {
    this.showImportModalSub = this.backupModalService.showImportModal.subscribe(value => {
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
    this.backupModalService.showImportModal.next(false);
    this.importFile = undefined;
    this.importFileError = undefined;
    (document.getElementById('selectImportFile') as HTMLInputElement).value = '';
    this.importMethod = undefined;
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
    this.router.navigateByUrl('welcome');
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
    } catch (err) {
      console.log(err);
      alert('Error importing backup'); // TODO: implement a toast service
      this.loadingService.setLoadingStatus(false);
    }
  }

  async addToCurrentUser(importFile: BackupFile) {
    // Add backup data to current user
    await this.backupDataService.importUserBackupFile(importFile, this.currentUser.guid);
    this.currentUser.kpiFacilityMigrationDoneV2 = false;
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

  setImportType(type: 'jsonFile' | 'template') {
    this.importMethod = type;
  }


  onFileSelected(event: EventTarget) {
    let files: FileList = (event as HTMLInputElement).files;
    if (files) {
      if (files.length !== 0) {
        let regex3 = /.xlsx$/;
        for (let index = 0; index < files.length; index++) {
          if (regex3.test(files[index].name)) {
            this.addFile(files[index]);
          }
        }
      }
    }
  }

  addFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = async (e: any) => {
      const bstr: ArrayBuffer = e.target.result;
      // let workBook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true, dateNF: 'mm/dd/yyyy' });
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(bstr);
      try {
        let isTemplate: boolean = workbook.getWorksheet('JUSTIFI_UPLOAD_V1') !== undefined;
        if (isTemplate) {
          this.workbook = workbook;
        } else {
          this.fileUploadError = 'Only template files from JUSTIFI can be uploaded.'
        }
      } catch (err) {
        console.log(err);
        this.fileUploadError = 'An Error Occured Parsing The File.'
      }
    };
    reader.readAsBinaryString(file);
  }

  async parseWorkbook() {
    let user: IdbUser = this.userIdbService.user.getValue();
    let newCompanyGuid: string = await this.companyIdbService.addNewCompany(user.guid);
    let selectedCompany: IdbCompany = this.companyIdbService.getByGUID(newCompanyGuid);
    let parseResults: {
      facilityGuid: string,
      visitGuid: string,
    } = await this.parseExcelTemplateService.parseWorkbook(this.workbook, user, selectedCompany)
    this.router.navigateByUrl('/setup-wizard/pre-visit/' + parseResults.visitGuid);
    this.cancelImportBackup();
    this.workbook = undefined;
    this.fileUploadError = '';
  }

}
