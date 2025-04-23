import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faScrewdriverWrench, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbFacility } from 'src/app/models/facility';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { getNewIdbReport, IdbReport } from 'src/app/models/report';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-facility-reports-home',
  standalone: false,

  templateUrl: './facility-reports-home.component.html',
  styleUrl: './facility-reports-home.component.css'
})
export class FacilityReportsHomeComponent {

  faPlus: IconDefinition = faPlus
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  facilityReports: Array<IdbReport>;
  reportsSub: Subscription;
  facility: IdbFacility;
  facilitySub: Subscription;
  onSiteVisits: Array<IdbOnSiteVisit> = [];

  printSub: Subscription;
  print: boolean;
  displayAddReportModal: boolean = false;
  selectedOnSiteVisitId: string;
  assessments: Array<IdbAssessment> = [];
  constructor(private reportIdbService: ReportIdbService,
    private facilityIdbService: FacilityIdbService,
    private sharedDataService: SharedDataService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService,
    private router: Router,
    private toastNotificationService: ToastNotificationsService,
    private assessmentIdbService: AssessmentIdbService
  ) {

  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
    });

    this.reportsSub = this.reportIdbService.reports.subscribe(reports => {
      this.facilityReports = reports.filter(report => {
        return report.facilityId == this.facility.guid;
      })
    });
    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
    })
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
    this.reportsSub.unsubscribe();
    this.printSub.unsubscribe();
  }

  async openAddReportModal() {
    this.onSiteVisits = this.onSiteVisitIdbService.getByFacilityGUID(this.facility.guid);
    this.assessments = this.assessmentIdbService.getByOtherGuid(this.facility.guid, 'facility');
    if (this.onSiteVisits.length > 0) {
      this.selectedOnSiteVisitId = this.onSiteVisits[0].guid
      //if only one visit. just add report
      if (this.onSiteVisits.length == 1) {
        this.addReport();
      } else {
        //need to select visit for report
        this.displayAddReportModal = true;
      }
    } else {
      this.selectedOnSiteVisitId = undefined;
      this.displayAddReportModal = true;
    }
  }

  closeAddReportModal() {
    this.displayAddReportModal = false;
  }

  async addReport() {
    this.closeAddReportModal();
    let nebs: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue();
    let energyOpps: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let kpmImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactIdbService.keyPerformanceMetricImpacts.getValue();
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisits.find(visit => { return visit.guid == this.selectedOnSiteVisitId });
    let newReport: IdbReport = getNewIdbReport(onSiteVisit, nebs, energyOpps, kpmImpacts);
    await firstValueFrom(this.reportIdbService.addWithObservable(newReport));
    await this.reportIdbService.setReports();
    this.router.navigateByUrl('/portfolio/facility/' + newReport.facilityId + '/reports/' + newReport.guid);
    this.toastNotificationService.showToast('Report Created!', undefined, 'bg-success', true, false);
  }


}
