import { Component } from '@angular/core';
import { faBullseye, faCircleQuestion, faContactBook, faPlus, faScaleUnbalancedFlip, faSearchPlus, faTrash, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { PrimaryKPI, PrimaryKPIs } from '../../constants/keyPerformanceIndicatorOptions';
import { firstValueFrom, Subscription } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { getCustomKPM, KeyPerformanceMetric } from '../../constants/keyPerformanceMetrics';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { ActivatedRoute } from '@angular/router';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { LocaleService } from '../../shared-services/locale.service';

@Component({
    selector: 'app-kpi-details-form',
    templateUrl: './kpi-details-form.component.html',
    styleUrl: './kpi-details-form.component.css',
    standalone: false
})
export class KpiDetailsFormComponent {
  // @Input({ required: true })


  keyPerformanceIndicator: IdbKeyPerformanceIndicator;

  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;
  faTrash: IconDefinition = faTrash;
  faSearchPlus: IconDefinition = faSearchPlus;

  primaryKPIs: Array<PrimaryKPI> = PrimaryKPIs;
  faCircleQuestion: IconDefinition = faCircleQuestion;
  faBullseye: IconDefinition = faBullseye;
  faPlus: IconDefinition = faPlus;
  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;

  companySub: Subscription;
  company: IdbCompany;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  displayDeleteKpmModal: boolean = false;
  kpmToDelete: KeyPerformanceMetric;

  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>;
  keyPerformanceMetricImpactsSub: Subscription;

  timeOptions: Array<string> = ['day', 'week', 'month', 'year'];
  dropdownMenuGuid: string;

  displayAddMetricModal: boolean = false;
  showAddMetricDropdown: boolean = false;

  currencyCode: string;
  currencySub: Subscription;

  constructor(
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService,
    private sharedDataService: SharedDataService,
    private localeService: LocaleService,
  ) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });

    this.keyPerformanceMetricImpactsSub = this.keyPerformanceMetricImpactIdbService.keyPerformanceMetricImpacts.subscribe(_keyPerformanceMetricImpacts => {
      this.keyPerformanceMetricImpacts = _keyPerformanceMetricImpacts;
    });

    this.activatedRoute.params.subscribe(params => {
      let kpiGuid: string = params['id'];
      this.keyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getByGuid(kpiGuid);
      this.showAddMetricDropdown = false;
    });

    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
    this.contactsSub.unsubscribe();
    this.keyPerformanceMetricImpactsSub.unsubscribe();
    this.currencySub.unsubscribe();
  }

  ngOnChanges() {
    this.showAddMetricDropdown = false;
  }

  async saveChanges() {
    if (this.keyPerformanceIndicator.optionValue == 'other') {
      this.keyPerformanceIndicator.htmlLabel = this.keyPerformanceIndicator.label;
    }
    this.keyPerformanceIndicator.performanceMetrics.forEach(metric => {
      if (metric.isCustom) {
        metric.htmlLabel = metric.label;
      }
    })
    await this.keyPerformanceIndicatorIdbService.asyncUpdate(this.keyPerformanceIndicator);
    await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
  }

  async calculateCost(keyPerformanceMetric: KeyPerformanceMetric) {
    await this.keyPerformanceMetricImpactIdbService.updatePerformanceMetricBaseline(keyPerformanceMetric);
    await this.saveChanges();
  }

  addPerformanceMetric() {
    if (this.showAddMetricDropdown) {
      this.showAddMetricDropdown = false;
    }
    let newCustomKPM: KeyPerformanceMetric = getCustomKPM(this.keyPerformanceIndicator.optionValue, this.keyPerformanceIndicator.guid);
    this.keyPerformanceIndicator.performanceMetrics.unshift(newCustomKPM);
    this.saveChanges();
  }

  openDeleteMetricModal(keyPerformanceMetric: KeyPerformanceMetric) {
    this.kpmToDelete = keyPerformanceMetric;
    this.displayDeleteKpmModal = true;
  }

  closeDeleteKpmModal() {
    this.displayDeleteKpmModal = false;
    this.kpmToDelete = undefined;
  }

  async untrackMetric() {
    this.keyPerformanceIndicator.performanceMetrics = this.keyPerformanceIndicator.performanceMetrics.filter(kpm => {
      return kpm.guid != this.kpmToDelete.guid
    });
    let kpmImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.filter(kpmImpact => {
      return kpmImpact.kpmGuid == this.kpmToDelete.guid;
    });
    if (kpmImpacts.length > 0) {
      for (let index = 0; index < kpmImpacts.length; index++) {
        await firstValueFrom(this.keyPerformanceMetricImpactIdbService.deleteWithObservable(kpmImpacts[index].id));
      }
      await this.keyPerformanceMetricImpactIdbService.setKeyPerformanceMetricImpacts();
    }
    await this.saveChanges();
    this.closeDeleteKpmModal();
  }

  setDropdownMenuGuid(guid: string) {
    if (this.dropdownMenuGuid != guid) {
      this.dropdownMenuGuid = guid;
    } else {
      this.dropdownMenuGuid = undefined;
    }
  }

  toggleAddMetricDropdown() {
    this.showAddMetricDropdown = !this.showAddMetricDropdown;
  }

  showSuggestedMetrics() {
    if (this.showAddMetricDropdown) {
      this.showAddMetricDropdown = false;
    }
    this.displayAddMetricModal = true;
  }

  closeSuggestedMetrics() {
    this.displayAddMetricModal = false;
  }

  addMetrics(metrics: Array<KeyPerformanceMetric>) {
    metrics.forEach(metric => {
      this.keyPerformanceIndicator.performanceMetrics.unshift(metric);
    })
    this.saveChanges();
  }

}
