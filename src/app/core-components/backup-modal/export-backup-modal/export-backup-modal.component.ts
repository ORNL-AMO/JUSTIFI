import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
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
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

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

  dataInitializedSub: Subscription;
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
    private sharedDataService: SharedDataService,
  ) { }

  ngOnInit(): void {
    this.showExportModalSub = this.backupModalService.showExportModal.subscribe(value => {
      this.showExportModal = value;
    });
    this.dataInitializedSub = this.sharedDataService.dataInitialized.subscribe(dataInitialized => {
      if (dataInitialized) {
        this.getExportTree();
      }
    });
  }

  ngOnDestroy() {
    this.showExportModalSub.unsubscribe();
    this.dataInitializedSub.unsubscribe();
  }

  getExportTree() {
    let companies: Array<IdbCompany> = this.companyIdbService.companies.getValue();
    let facilities: Array<IdbFacility> = this.facilityIdbService.facilities.getValue();
    let onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisitIdbService.onSiteVisits.getValue();
    let assessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
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

  selectAll() {
    this.setSelectAll(this.exportTree, true);
  }
  unselectAll() {
    this.setSelectAll(this.exportTree, false);
  }
  expandAll() {
    this.setExpandAll(this.exportTree, true);
  }
  collapseAll() {
    this.setExpandAll(this.exportTree, false);
  }

  private setSelectAll(exportTree: ExportTreeNode[], checked: boolean) {
    exportTree.forEach(node => {
      node.checked = checked;
      node.indeterminate = false;
      if (node.children && node.children.length > 0) {
        this.setSelectAll(node.children, checked);
      }
    });
  }

  private setExpandAll(exportTree: ExportTreeNode[], expanded: boolean) {
    exportTree.forEach(node => {
      node.expanded = expanded;
      if (node.children && node.children.length > 0) {
        this.setExpandAll(node.children, expanded);
      }
    });
  }

  isNoneSelected(exportTree: ExportTreeNode[]): boolean {
    return exportTree.every(node => !node.checked && !node.indeterminate);
  }
}