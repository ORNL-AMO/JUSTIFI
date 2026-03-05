import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faBookOpen, faChevronDown, faChevronRight, faContactBook, faPlus, faScaleUnbalancedFlip, faSearchPlus, faTrash, faUpRightFromSquare, faUser, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import * as _ from 'lodash';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbReport } from 'src/app/models/report';
@Component({
  selector: 'app-neb-setup-form',
  templateUrl: './neb-setup-form.component.html',
  styleUrl: './neb-setup-form.component.css',
  standalone: false
})
export class NebSetupFormComponent {
  @Input({ required: true })
  nebGuid: string;
  @Output('emitInitialized')
  emitInitialized = new EventEmitter<boolean>();

  nonEnergyBenefit: IdbNonEnergyBenefit;

  faBookOpen: IconDefinition = faBookOpen;
  faSearchPlus: IconDefinition = faSearchPlus;
  faTrash: IconDefinition = faTrash;
  faWeightHanging: IconDefinition = faWeightHanging;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronDown: IconDefinition = faChevronDown;
  faPlus: IconDefinition = faPlus;
  faUpRightFromSquare: IconDefinition = faUpRightFromSquare;

  displayDeleteModal: boolean = false;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;

  kpi: IdbKeyPerformanceIndicator;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  hideUntrackedMetrics: boolean = true;
  performanceMetricToAdd: KeyPerformanceMetric;
  displayAddPerformanceMetricModal: boolean = false;

  performanceMetricImpactGuids: Array<string> = [];
  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>
  kpmImpactsSub: Subscription;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  currencyCode: string;
  currencySub: Subscription;

  constructor(
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private dbChangesService: DbChangesService,
    private contactIdbService: ContactIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastNotificationService: ToastNotificationsService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private localStorageDataService: LocalStorageDataService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private localeService: LocaleService,
    private reportIdbService: ReportIdbService
  ) {
  }

  ngOnInit() {
    if (!this.nebGuid) {
      this.activatedRoute.params.subscribe(params => {
        this.nebGuid = params['id'];
        this.nonEnergyBenefit = this.nonEnergyBenefitsIdbService.getByGuid(this.nebGuid);
        this.setMetricGuids();
      });
    } else {
      this.nonEnergyBenefit = this.nonEnergyBenefitsIdbService.getByGuid(this.nebGuid);
    }

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });

    this.kpmImpactsSub = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.subscribe(_keyPerformanceMetricImpacts => {
      this.keyPerformanceMetricImpacts = _keyPerformanceMetricImpacts;
      this.setMetricGuids();
    });

    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(opps => {
      this.energyOpportunities = opps.filter(opp => { return opp.assessmentId == this.nonEnergyBenefit.assessmentId });
    });

    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
    this.kpmImpactsSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
    this.currencySub.unsubscribe();
  }

  ngAfterViewInit() {
    //emit after intialized. 
    //When adding new nebs this will trigger the form to open
    this.emitInitialized.emit(true);
  }

  async saveChanges() {
    await this.nonEnergyBenefitsIdbService.asyncUpdate(this.nonEnergyBenefit);
  }

  async deleteNonEnergyBenefit() {
    await this.dbChangesService.deleteNonEnergyBenefit(this.nonEnergyBenefit);
    this.closeDeleteModal();
    if (this.nonEnergyBenefit.energyOpportunityId) {
      this.toastNotificationService.showToast('MB Deleted!', 'Multiple Benefit has been removed from the energy efficiency measure.', 'bg-success', true, false)
    } else {
      this.toastNotificationService.showToast('MB Deleted!', 'Multiple Benefit has been removed from the assessment.', 'bg-success', true, false)
    }
    if (this.router.url.includes('portfolio') && !this.nonEnergyBenefit.energyOpportunityId) {
      this.router.navigateByUrl('/portfolio/assessment/' + this.nonEnergyBenefit.assessmentId + '/nebs');
    }
  }

  showDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  toggleNote() {
    this.nonEnergyBenefit.includeNote = !this.nonEnergyBenefit.includeNote;
    this.saveChanges();
  }

  setMetricGuids() {
    // only want to update neb list if changes made
    // otherwise forms get re-init when the list updates
    if (this.nonEnergyBenefit && this.keyPerformanceMetricImpacts) {
      let nebImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.filter(neb => {
        return neb.nebId == this.nonEnergyBenefit.guid
      });
      let tmpNebMetrics: Array<string> = nebImpacts.map(neb => {
        return neb.guid
      });
      if (tmpNebMetrics.length != this.performanceMetricImpactGuids.length) {
        this.performanceMetricImpactGuids = tmpNebMetrics;
      } else {
        let xor: Array<string> = _.xor(this.performanceMetricImpactGuids, tmpNebMetrics)
        if (xor.length != 0) {
          this.performanceMetricImpactGuids = tmpNebMetrics;
        }
      }
    } else {
      this.performanceMetricImpactGuids = [];
    }
  }

  toggleUntrackedNebs() {
    this.hideUntrackedMetrics = !this.hideUntrackedMetrics;
  }

  selectMetricToAdd(metric: KeyPerformanceMetric) {
    this.performanceMetricToAdd = metric;
  }

  closeAddMetricModal() {
    this.displayAddPerformanceMetricModal = false;
    this.performanceMetricToAdd = undefined;
  }

  showUntrackedMetricsModal() {
    this.displayAddPerformanceMetricModal = true;
  }

  goToEnergyOpportunity(energyOpportunityId: string) {
    if (this.router.url.includes('portfolio')) {
      this.router.navigateByUrl('/portfolio/assessment/' + this.nonEnergyBenefit.assessmentId + '/energy-opportunities/' + energyOpportunityId)
    } else if (this.router.url.includes('setup-wizard')) {
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.getByAssessmentGUID(this.nonEnergyBenefit.assessmentId);
      this.localStorageDataService.setEnergyOppAccordionGuid(energyOpportunityId);
      this.router.navigateByUrl('setup-wizard/data-collection/' + onSiteVisit.guid + '/assessment/' + this.nonEnergyBenefit.assessmentId + '/energy-opportunities')
    }
  }

  async changeAssociatedEEM() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.getByAssessmentGUID(this.nonEnergyBenefit.assessmentId);
    let reports: Array<IdbReport> = this.reportIdbService.getReportsByOnSiteVisitId(onSiteVisit.guid);
    if (reports.length > 0) {
      for (let i = 0; i < reports.length; i++) {
        let nebOptionIndex: number = reports[i].nonEnergyBenefitOptions.findIndex(option => {
          return option.nonEnergyBenefitId == this.nonEnergyBenefit.guid
        });
        if (nebOptionIndex != -1) {
          reports[i].nonEnergyBenefitOptions[nebOptionIndex].energyOpportunityId = this.nonEnergyBenefit.energyOpportunityId;
          await firstValueFrom(this.reportIdbService.updateWithObservable(reports[i]));
        }
      }
      await this.reportIdbService.setReports();
    }
    await this.saveChanges();
  }
}
