import { Component, Input } from '@angular/core';
import { faAsterisk, faChevronDown, faChevronUp, faMagnifyingGlass, faPlus, faSearchPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { getNewIdbKeyPerformanceMetricImpact, IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { convertOptionTypeToMetricType, KeyPerformanceMetric, KeyPerformanceMetricOptions, KpmKeywordList } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';

@Component({
    selector: 'app-performance-metrics-modal',
    templateUrl: './performance-metrics-modal.component.html',
    styleUrl: './performance-metrics-modal.component.css',
    standalone: false
})
export class PerformanceMetricsModalComponent {
  @Input({ required: true })
  nonEnergyBenefit: IdbNonEnergyBenefit;

  faSearchPlus: IconDefinition = faSearchPlus;
  faPlus: IconDefinition = faPlus;
  faMagnifyingGlass: IconDefinition = faMagnifyingGlass;
  faChevronDown: IconDefinition = faChevronDown;
  faChevronUp: IconDefinition = faChevronUp;
  faAsterisk: IconDefinition = faAsterisk;

  displayMetricsModal: boolean = false;

  performanceMetricToAdd: KeyPerformanceMetric;

  performanceMetricOptions: Array<KeyPerformanceMetric> = [];

  kpmSearchStr: string = '';
  orderByDir: 'asc' | 'desc' = 'asc';
  filterAssociatedMetrics: boolean = false;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  kpmKeywordList: string[] = KpmKeywordList;
  filteredKpmKeywordList: string[] = [];

  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService
  ) {

  }

  openMetricModal() {
    this.keyPerformanceIndicators = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    this.displayMetricsModal = true;
    this.setMetricOptions();
  }

  closeAddMetricModal() {
    this.displayMetricsModal = false;
    this.performanceMetricToAdd = undefined;
  }

  filterKpmKeywordList() {
    const searchStr = this.kpmSearchStr.toLowerCase().trim();
    if (!searchStr) {
      this.filteredKpmKeywordList = [];
      return;
    }
    const keywordWithIndex = this.kpmKeywordList
      .map(keyword => {
        const words = keyword.toLowerCase().split(/\s+/);
        const index = words.findIndex(word => word.startsWith(searchStr));
        return { keyword, index };
      })
      .filter(item => item.index !== -1);

    keywordWithIndex.sort((a, b) => a.index - b.index);
    const keywordMatched = Array.from(new Set(keywordWithIndex.map(item => item.keyword)));
    this.filteredKpmKeywordList = keywordMatched.slice(0, 10);
    if (keywordMatched.length > 10) {
      this.filteredKpmKeywordList.push('...');
    }
  }

  selectKpmKeyword(keyword: string) {
    this.kpmSearchStr = keyword;
    this.filteredKpmKeywordList = [];
  }

  async confirmAddMetric() {
    //make sure metric is tracked in KPI
    let addedMetric: KeyPerformanceMetric = await this.keyPerformanceIndicatorIdbService.addKpmToKpi(this.nonEnergyBenefit.companyId, this.performanceMetricToAdd, this.nonEnergyBenefit.userId, this.nonEnergyBenefit.facilityId);
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.nonEnergyBenefit.facilityId, this.performanceMetricToAdd.kpiValue);
    let newKeyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact = getNewIdbKeyPerformanceMetricImpact(this.nonEnergyBenefit.userId, this.nonEnergyBenefit.companyId, this.nonEnergyBenefit.facilityId, this.nonEnergyBenefit.energyOpportunityId, this.nonEnergyBenefit.guid, addedMetric.value, this.nonEnergyBenefit.assessmentId, keyPerformanceIndicator.guid, addedMetric.guid);
    await firstValueFrom(this.keyPerformanceMetricImpactIdbService.addWithObservable(newKeyPerformanceMetricImpact));
    await this.keyPerformanceMetricImpactIdbService.setKeyPerformanceMetricImpacts();
    this.closeAddMetricModal();
  }

  addMetric(performanceMetric: KeyPerformanceMetric) {
    this.performanceMetricToAdd = performanceMetric;
  }

  setMetricOptions() {
    this.performanceMetricOptions = new Array();
    let includedMetrics: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactIdbService.getByNebGuid(this.nonEnergyBenefit.guid);
    let metricIds: Array<string> = includedMetrics.map(metric => {
      return metric.guid;
    });
    let metricValues = includedMetrics.map(metric => {
      return metric.kpmValue;
    });
    KeyPerformanceMetricOptions.forEach(metricOption => {
      let metric: KeyPerformanceMetric = convertOptionTypeToMetricType(metricOption)
      if (this.filterAssociatedMetrics == true) {
        let nebOption: NebOption = NebOptions.find(option => { return option.optionValue == this.nonEnergyBenefit.nebOptionValue });
        if (nebOption) {
          if (metricValues.includes(metric.value) == false && nebOption.KPM.includes(metric.value)) {
            this.performanceMetricOptions.push(metric);
          }
        }
      } else {
        if (metricIds.includes(metric.value) == false) {
          this.performanceMetricOptions.push(metric);
        }
      }
    });

    if (this.filterAssociatedMetrics == false) {
      let companyKPMs: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.nonEnergyBenefit.facilityId);
      let customMetrics: Array<KeyPerformanceMetric> = companyKPMs.filter(kpm => {
        return kpm.isCustom == true
      });
      customMetrics.forEach(metric => {
        if (metricIds.includes(metric.guid) == false) {
          this.performanceMetricOptions.push(metric);
        }
      })


    }
  }

  toggleOrderBy() {
    if (this.orderByDir == 'asc') {
      this.orderByDir = 'desc';
    } else {
      this.orderByDir = 'asc';
    }
  }
}
