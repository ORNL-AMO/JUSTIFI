import { Component, Input } from '@angular/core';
import { faAsterisk, faChevronDown, faChevronUp, faMagnifyingGlass, faPlus, faSearchPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { getNewKeyPerformanceIndicator, IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { getNewIdbKeyPerformanceMetricImpact, IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { convertOptionTypeToMetricType, getPerformanceMetrics, KeyPerformanceMetric, KeyPerformanceMetricOption, KeyPerformanceMetricOptions } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';

@Component({
  selector: 'app-performance-metrics-modal',
  templateUrl: './performance-metrics-modal.component.html',
  styleUrl: './performance-metrics-modal.component.css'
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

  async confirmAddMetric() {
    //make sure metric is tracked in KPI
    let addedMetric: KeyPerformanceMetric;
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.nonEnergyBenefit.companyId, this.performanceMetricToAdd.kpiValue);
    if (keyPerformanceIndicator) {
      //check metric is being tracked in existing KPI
      addedMetric = keyPerformanceIndicator.performanceMetrics.find(_metric => {
        return (_metric.value == this.performanceMetricToAdd.value);
      });
      if (!addedMetric) {
        //if not being tracked. Add metric to existing KPI
        let metrics: Array<KeyPerformanceMetric> = getPerformanceMetrics(keyPerformanceIndicator.optionValue, keyPerformanceIndicator.guid);
        addedMetric = metrics.find(_metric => {
          return (_metric.value == this.performanceMetricToAdd.value);
        });
        if (addedMetric) {
          keyPerformanceIndicator.performanceMetrics.push(addedMetric);
          await this.keyPerformanceIndicatorIdbService.asyncUpdate(keyPerformanceIndicator);
        }
      }
    } else {
      //add untracked KPI if doesn't exist and all associated metrics
      let kpiOption: KeyPerformanceIndicatorOption = KeyPerformanceIndicatorOptions.find(option => {
        return option.optionValue == this.performanceMetricToAdd.kpiValue
      });
      keyPerformanceIndicator = getNewKeyPerformanceIndicator(this.nonEnergyBenefit.userId, this.nonEnergyBenefit.companyId, kpiOption, false);
      addedMetric = keyPerformanceIndicator.performanceMetrics.find(_metric => {
        return (_metric.value == this.performanceMetricToAdd.value);
      });
      await firstValueFrom(this.keyPerformanceIndicatorIdbService.addWithObservable(keyPerformanceIndicator));
      await this.keyPerformanceIndicatorIdbService.setKeyPerformanceIndicators();
    }

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
      let companyKPMs: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.nonEnergyBenefit.companyId);
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
