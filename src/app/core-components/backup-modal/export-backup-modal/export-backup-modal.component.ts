import { Component } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import { BackupModalService } from '../backup-modal.service';
import { BackupDataService } from 'src/app/shared/shared-services/backup-data.service';
import { faDownload, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { buildExportTree, ExportTreeNode } from './exportTree';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbAssessment } from 'src/app/models/assessment';

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

  exportFileName: string = 'JUSTIFI_backup';
  exportTree: ExportTreeNode[] = [];

  faDownload: IconDefinition = faDownload;

  constructor(
    private backupModalService: BackupModalService,
    private backupDataService: BackupDataService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService,
  ) { }

  ngOnInit(): void {
    this.showExportModalSub = this.backupModalService.showExportModal.subscribe(value => {
      this.showExportModal = value;
    });
    this.getExportTree();
  }

  ngOnDestroy() {
    this.showExportModalSub.unsubscribe();
  }

  async getExportTree() {
    let companies: Array<IdbCompany> = await firstValueFrom(this.companyIdbService.getAll());
    let facilities: Array<IdbFacility> = await firstValueFrom(this.facilityIdbService.getAll());
    let onSiteVisits: Array<IdbOnSiteVisit> = await firstValueFrom(this.onSiteVisitIdbService.getAll());
    let assessments: Array<IdbAssessment> = await firstValueFrom(this.assessmentIdbService.getAll());
    this.exportTree = buildExportTree(companies, facilities, onSiteVisits, assessments);
  }

  closeExportDataModal(){
    this.backupModalService.showExportModal.next(false);
  }

  backupData() {
    this.backupDataService.backupData(this.exportFileName, this.exportTree);
    // to do: update lastBackup property for selectedUser
    // let selectedUser = this.userIdbService.user.getValue();
    this.closeExportDataModal();
  }

}
