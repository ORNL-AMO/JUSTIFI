import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { getNewKeyPerformanceIndicator, IdbKeyPerformanceIndicator } from '../models/keyPerformanceIndicator';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { getPerformanceMetrics, KeyPerformanceMetric, KeyPerformanceMetricOption } from '../shared/constants/keyPerformanceMetrics';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from '../shared/constants/keyPerformanceIndicatorOptions';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable({
  providedIn: 'root'
})
export class KeyPerformanceIndicatorsIdbService {

  keyPerformanceIndicators: BehaviorSubject<Array<IdbKeyPerformanceIndicator>>;
  constructor(private dbService: NgxIndexedDBService,
    private analyticsService: AnalyticsService
  ) {
    this.keyPerformanceIndicators = new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([]);
  }

  async setKeyPerformanceIndicators() {
    let _keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = await firstValueFrom(this.getAll());
    this.keyPerformanceIndicators.next(_keyPerformanceIndicators);
  }

  getAll(): Observable<Array<IdbKeyPerformanceIndicator>> {
    return this.dbService.getAll('keyPerformanceIndicator');
  }

  getById(id: number): Observable<IdbKeyPerformanceIndicator> {
    return this.dbService.getByKey('keyPerformanceIndicator', id);
  }

  addWithObservable(keyPerformanceIndicator: IdbKeyPerformanceIndicator): Observable<IdbKeyPerformanceIndicator> {
    this.analyticsService.sendEvent('add_kpi', { kpi_name: keyPerformanceIndicator.label });
    return this.dbService.add('keyPerformanceIndicator', keyPerformanceIndicator);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('keyPerformanceIndicator', id);
  }

  updateWithObservable(keyPerformanceIndicator: IdbKeyPerformanceIndicator): Observable<IdbKeyPerformanceIndicator> {
    keyPerformanceIndicator.modifiedDate = new Date();
    return this.dbService.update('keyPerformanceIndicator', keyPerformanceIndicator);
  }

  async asyncUpdate(keyPerformanceIndicator: IdbKeyPerformanceIndicator) {
    keyPerformanceIndicator = await firstValueFrom(this.updateWithObservable(keyPerformanceIndicator));
    await this.setKeyPerformanceIndicators();
  }

  getByGuid(guid: string): IdbKeyPerformanceIndicator {
    let keyPerformanceInidcators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicators.getValue();
    return keyPerformanceInidcators.find(kpi => {
      return kpi.guid == guid
    });
  }

  getFacilityKeyPerformanceMetrics(facilityId: string): Array<KeyPerformanceMetric> {
    let facilityKPIs: Array<IdbKeyPerformanceIndicator> = this.getByFacilityGuid(facilityId);
    let facilityKPMs: Array<KeyPerformanceMetric> = new Array();
    facilityKPIs.forEach(kpi => {
      kpi.performanceMetrics.forEach(kpiMetric => {
        if (kpiMetric.isCustom || facilityKPMs.findIndex(_kpiMetric => { return _kpiMetric.value == kpiMetric.value }) == -1) {
          facilityKPMs.push(kpiMetric)
        }
      });
    });
    return facilityKPMs;
  }

  getKeyPerformanceMetric(facilityId: string, kpmGuid: string): KeyPerformanceMetric {
    let companyKeyPerformanceMetrics: Array<KeyPerformanceMetric> = this.getFacilityKeyPerformanceMetrics(facilityId);
    return companyKeyPerformanceMetrics.find(metric => {
      return metric.guid == kpmGuid
    });
  }

  getKpiFromKpm(facilityId: string, performanceMetricValue: KeyPerformanceIndicatorValue): IdbKeyPerformanceIndicator {
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicators.getValue();
    return keyPerformanceIndicators.find(kpi => {
      return kpi.facilityId == facilityId && kpi.optionValue == performanceMetricValue;
    });
  }

  async addKpmToKpi(companyId: string, performanceMetricToAdd: KeyPerformanceMetric, userId: string, facilityId: string): Promise<KeyPerformanceMetric> {
    this.analyticsService.sendEvent('add_kpm', { kpm_name: performanceMetricToAdd.label });

    let addedMetric: KeyPerformanceMetric;
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator;
    if (performanceMetricToAdd.kpiGuid) {
      keyPerformanceIndicator = this.getByGuid(performanceMetricToAdd.kpiGuid);
    } else {
      keyPerformanceIndicator = this.getKpiFromKpm(facilityId, performanceMetricToAdd.kpiValue);
    }
    if (keyPerformanceIndicator) {
      //check metric is being tracked in existing KPI
      if (performanceMetricToAdd.guid) {
        addedMetric = keyPerformanceIndicator.performanceMetrics.find(_metric => {
          return (_metric.guid == performanceMetricToAdd.guid);
        });
      } else {
        addedMetric = keyPerformanceIndicator.performanceMetrics.find(_metric => {
          return (_metric.value == performanceMetricToAdd.value);
        });
      }
      if (!addedMetric) {
        //if not being tracked. Add metric to existing KPI
        let metrics: Array<KeyPerformanceMetric> = getPerformanceMetrics(keyPerformanceIndicator.optionValue, keyPerformanceIndicator.guid);
        if (performanceMetricToAdd.guid) {
          addedMetric = metrics.find(_metric => {
            return (_metric.guid == performanceMetricToAdd.guid);
          });
        } else {
          addedMetric = metrics.find(_metric => {
            return (_metric.value == performanceMetricToAdd.value);
          });
        }
        if (addedMetric) {
          keyPerformanceIndicator.performanceMetrics.push(addedMetric);
          await this.asyncUpdate(keyPerformanceIndicator);
        }
      }
    } else {
      //add untracked KPI if doesn't exist and all associated metrics
      let kpiOption: KeyPerformanceIndicatorOption = KeyPerformanceIndicatorOptions.find(option => {
        return option.optionValue == performanceMetricToAdd.kpiValue
      });
      keyPerformanceIndicator = getNewKeyPerformanceIndicator(userId, companyId, kpiOption, false, facilityId);

      //check metric is being tracked in existing KPI
      if (performanceMetricToAdd.guid) {
        addedMetric = keyPerformanceIndicator.performanceMetrics.find(_metric => {
          return (_metric.guid == performanceMetricToAdd.guid);
        });
      } else {
        addedMetric = keyPerformanceIndicator.performanceMetrics.find(_metric => {
          return (_metric.value == performanceMetricToAdd.value);
        });
      }
      await firstValueFrom(this.addWithObservable(keyPerformanceIndicator));
      await this.setKeyPerformanceIndicators();
    }
    return addedMetric;
  }

  getByFacilityGuid(facilityGuid: string): Array<IdbKeyPerformanceIndicator> {
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicators.getValue();
    let facilityKPIs: Array<IdbKeyPerformanceIndicator> = keyPerformanceIndicators.filter(kpi => {
      return kpi.facilityId == facilityGuid;
    });
    return facilityKPIs;
  }
}
