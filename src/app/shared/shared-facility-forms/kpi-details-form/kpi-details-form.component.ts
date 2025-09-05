import { Component } from '@angular/core';
import { faBullseye, faCheck, faCircleQuestion, faContactBook, faLinkSlash, faPlus, faScaleUnbalancedFlip, faSearchPlus, faTrash, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { PrimaryKPI, PrimaryKPIs } from '../../constants/keyPerformanceIndicatorOptions';
import { Subscription } from 'rxjs';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { getCustomKPM, getPerformanceMetrics, KeyPerformanceMetric, KeyPerformanceMetricValue } from '../../constants/keyPerformanceMetrics';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { ActivatedRoute } from '@angular/router';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { LocaleService } from '../../shared-services/locale.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';

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
  faCheck: IconDefinition = faCheck;
  faLinkSlash: IconDefinition = faLinkSlash;

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

  addMetricValues: Array<KeyPerformanceMetricValue> = [];
  keyPerformanceMetricOptions: Array<KeyPerformanceMetric> = [];
  usedPerformanceMetrics: Array<KeyPerformanceMetric> = [];
  constructor(
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService,
    private localeService: LocaleService,
    private dbChangesService: DbChangesService
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
      this.setMetricOptions();
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
        this.dbChangesService.deleteKeyPerformanceMetricImpact(kpmImpacts[index]);
      }
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

  async addMetrics(metrics: Array<KeyPerformanceMetric>) {
    metrics.forEach(metric => {
      this.keyPerformanceIndicator.performanceMetrics.unshift(metric);
    })
    await this.saveChanges();
  }


  toggleMetric(keyPerformanceMetric: KeyPerformanceMetric) {
    if (this.addMetricValues.includes(keyPerformanceMetric.value)) {
      this.addMetricValues = this.addMetricValues.filter(value => {
        return value != keyPerformanceMetric.value
      });
    } else {
      this.addMetricValues.push(keyPerformanceMetric.value);
    }
  }

  setMetricOptions() {
    this.keyPerformanceMetricOptions = new Array();
    this.usedPerformanceMetrics = new Array();
    if (!this.keyPerformanceIndicator.isCustom) {
      let allPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.keyPerformanceIndicator.facilityId);
      let usedKpmValues: Array<KeyPerformanceMetricValue> = allPerformanceMetrics.map(metric => {
        return metric.value
      });
      let tmpKeyPerformanceMetricOptions: Array<KeyPerformanceMetric> = getPerformanceMetrics(this.keyPerformanceIndicator.optionValue, this.keyPerformanceIndicator.guid)
      tmpKeyPerformanceMetricOptions.forEach(option => {
        if (usedKpmValues.includes(option.value) == false) {
          this.keyPerformanceMetricOptions.push(option);
        } else {
          this.usedPerformanceMetrics.push(option);
        }
      });
    }
  }

  async addInitialMetrics() {
    let metricsToAdd: Array<KeyPerformanceMetric> = this.keyPerformanceMetricOptions.filter(option => {
      return this.addMetricValues.includes(option.value)
    });
    await this.addMetrics(metricsToAdd);
  }

}
