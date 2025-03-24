import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faFilePen, faList, faPlus, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { getNewIdbReport, IdbReport } from 'src/app/models/report';

@Component({
  selector: 'app-data-evaluation-manage-reports',
  standalone: false,

  templateUrl: './data-evaluation-manage-reports.component.html',
  styleUrl: './data-evaluation-manage-reports.component.css'
})
export class DataEvaluationManageReportsComponent {

  faList: IconDefinition = faList;
  faPlus: IconDefinition = faPlus;
  faTrash: IconDefinition = faTrash;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faFilePen: IconDefinition = faFilePen;

  reports: Array<IdbReport>;
  reportsSub: Subscription;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  displayDeleteModal: boolean = false;
  reportToDelete: IdbReport;
  constructor(private onSiteVisitIdbService: OnSiteVisitIdbService,
    private reportIdbService: ReportIdbService,
    private router: Router,
    private dbChangesService: DbChangesService,
    private toastNotificationService: ToastNotificationsService
  ) { }

  ngOnInit() {
    this.reportsSub = this.reportIdbService.reports.subscribe(reports => {
      this.reports = reports;
    });
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(visit => {
      this.onSiteVisit = visit;
    })
  }

  ngOnDestroy() {
    this.reportsSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
  }

  goBack() {
    // let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    // this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/end-uses');
  }

  goToNext() {
    // this.goToAssessment(this.onSiteVisit.assessmentIds[0])
  }

  async addReport() {
    let newReport: IdbReport = getNewIdbReport(this.onSiteVisit.userId, this.onSiteVisit.companyId, this.onSiteVisit.facilityId, this.onSiteVisit.guid);
    await firstValueFrom(this.reportIdbService.addWithObservable(newReport));
    await this.reportIdbService.setReports();
    this.goToReport(newReport.guid);
  }


  async deleteReport() {
    // await this.dbChangesService.deleteReport(this.reportToDelete);
    console.log(this.reportToDelete.id)
    await this.reportIdbService.deleteWithObservable(this.reportToDelete.id);
    await this.reportIdbService.setReports();
    this.toastNotificationService.showToast('Report Deleted!', undefined, 'bg-success', true, false);
    this.closeDeleteModal();
  }

  openDeleteModal(report: IdbReport) {
    this.reportToDelete = report;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.reportToDelete = undefined;
  }

  goToReport(guid: string) {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/custom-report/' + guid);
  }


}
