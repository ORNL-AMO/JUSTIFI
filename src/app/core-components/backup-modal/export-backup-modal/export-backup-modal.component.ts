import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BackupModalService } from '../backup-modal.service';
import { BackupDataService } from 'src/app/shared/shared-services/backup-data.service';
import { faDownload, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-export-backup-modal',
  standalone: false,
  
  templateUrl: './export-backup-modal.component.html',
  styleUrl: './export-backup-modal.component.css'
})
export class ExportBackupModalComponent {

  showExportModalSub: Subscription;
  showExportModal: boolean = false;
  exportFile: any;
  exportType: string;
  exportFileError: string;
  exportForUser: boolean = true;
  currentUser: any;
  exportName: string;
  overwriteData: boolean = true;

  faDownload: IconDefinition = faDownload;

  constructor(
    private backupModalService: BackupModalService,
    private backupDataService: BackupDataService,
  ) { }

  ngOnInit(): void {
    this.showExportModalSub = this.backupModalService.showExportModal.subscribe(value => {
      this.showExportModal = value;
    });

  }

  ngOnDestroy() {
    this.showExportModalSub.unsubscribe();
  }

  closeExportDataModal(){
    this.backupModalService.showExportModal.next(false);
  }

  backupData() {
    this.backupDataService.backupData();
    // to do: update lastBackup property for selectedUser
    // let selectedUser = this.userIdbService.user.getValue();
    this.closeExportDataModal();
  }

}
