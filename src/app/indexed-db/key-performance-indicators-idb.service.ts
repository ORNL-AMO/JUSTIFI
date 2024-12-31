import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { getNewKeyPerformanceIndicator, IdbKeyPerformanceIndicator } from '../models/keyPerformanceIndicator';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { getPerformanceMetrics, KeyPerformanceMetric, KeyPerformanceMetricOption } from '../shared/constants/keyPerformanceMetrics';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from '../shared/constants/keyPerformanceIndicatorOptions';

@Injectable({
  providedIn: 'root'
})
export class KeyPerformanceIndicatorsIdbService {

  keyPerformanceIndicators: BehaviorSubject<Array<IdbKeyPerformanceIndicator>>;
  constructor(private dbService: NgxIndexedDBService) {
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

  getByCompanyGuid(companyGuid: string): Array<IdbKeyPerformanceIndicator> {
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicators.getValue();
    let companyKPIs: Array<IdbKeyPerformanceIndicator> = keyPerformanceIndicators.filter(kpi => {
      return kpi.companyId == companyGuid;
    });
    return companyKPIs;
  }

  getCompanyKeyPerformanceMetrics(companyGuid: string): Array<KeyPerformanceMetric> {
    let companyKPIs: Array<IdbKeyPerformanceIndicator> = this.getByCompanyGuid(companyGuid);
    let companyKPMs: Array<KeyPerformanceMetric> = new Array();
    companyKPIs.forEach(kpi => {
      kpi.performanceMetrics.forEach(kpiMetric => {
        if (kpiMetric.isCustom || companyKPMs.findIndex(_kpiMetric => { return _kpiMetric.value == kpiMetric.value }) == -1) {
          companyKPMs.push(kpiMetric)
        }
      });
    });
    return companyKPMs;
  }

  getKeyPerformanceMetric(companyGuid: string, kpmGuid: string): KeyPerformanceMetric {
    let companyKeyPerformanceMetrics: Array<KeyPerformanceMetric> = this.getCompanyKeyPerformanceMetrics(companyGuid);
    return companyKeyPerformanceMetrics.find(metric => {
      return metric.guid == kpmGuid
    });
  }

  getKpiFromKpm(companyGuid: string, performanceMetricValue: KeyPerformanceIndicatorValue): IdbKeyPerformanceIndicator {
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicators.getValue();
    return keyPerformanceIndicators.find(kpi => {
      return kpi.companyId == companyGuid && kpi.optionValue == performanceMetricValue;
    });
  }

  async addKpmToKpi(companyId: string, performanceMetricToAdd: KeyPerformanceMetric | KeyPerformanceMetricOption, userId: string, facilityId: string): Promise<KeyPerformanceMetric> {
    let addedMetric: KeyPerformanceMetric;
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.getKpiFromKpm(companyId, performanceMetricToAdd.kpiValue);
    if (keyPerformanceIndicator) {
      //check metric is being tracked in existing KPI
      addedMetric = keyPerformanceIndicator.performanceMetrics.find(_metric => {
        return (_metric.value == performanceMetricToAdd.value);
      });
      if (!addedMetric) {
        //if not being tracked. Add metric to existing KPI
        let metrics: Array<KeyPerformanceMetric> = getPerformanceMetrics(keyPerformanceIndicator.optionValue, keyPerformanceIndicator.guid);
        addedMetric = metrics.find(_metric => {
          return (_metric.value == performanceMetricToAdd.value);
        });
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
      addedMetric = keyPerformanceIndicator.performanceMetrics.find(_metric => {
        return (_metric.value == performanceMetricToAdd.value);
      });
      await firstValueFrom(this.addWithObservable(keyPerformanceIndicator));
      await this.setKeyPerformanceIndicators();
    }
    return addedMetric;
  }
}
