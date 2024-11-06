import { Injectable } from '@angular/core';
import { IdbKeyPerformanceMetricImpact } from '../models/keyPerformanceMetricImpact';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IdbKeyPerformanceIndicator } from '../models/keyPerformanceIndicator';
import { KeyPerformanceMetric } from '../shared/constants/keyPerformanceMetrics';

@Injectable({
  providedIn: 'root'
})
export class KeyPerformanceMetricImpactsIdbService {

  keyPerformanceMetricImpacts: BehaviorSubject<Array<IdbKeyPerformanceMetricImpact>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.keyPerformanceMetricImpacts = new BehaviorSubject<Array<IdbKeyPerformanceMetricImpact>>([]);
  }

  async setKeyPerformanceMetricImpacts() {
    let _keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = await firstValueFrom(this.getAll());
    this.keyPerformanceMetricImpacts.next(_keyPerformanceMetricImpacts);
  }

  getAll(): Observable<Array<IdbKeyPerformanceMetricImpact>> {
    return this.dbService.getAll('keyPerformanceMetricImpact');
  }

  getById(id: number): Observable<IdbKeyPerformanceMetricImpact> {
    return this.dbService.getByKey('keyPerformanceMetricImpact', id);
  }

  addWithObservable(keyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact): Observable<IdbKeyPerformanceMetricImpact> {
    return this.dbService.add('keyPerformanceMetricImpact', keyPerformanceMetricImpact);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('keyPerformanceMetricImpact', id);
  }

  updateWithObservable(keyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact): Observable<IdbKeyPerformanceMetricImpact> {
    keyPerformanceMetricImpact.modifiedDate = new Date();
    return this.dbService.update('keyPerformanceMetricImpact', keyPerformanceMetricImpact);
  }

  async asyncUpdate(keyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact) {
    keyPerformanceMetricImpact = await firstValueFrom(this.updateWithObservable(keyPerformanceMetricImpact));
    await this.setKeyPerformanceMetricImpacts();
  }

  getByGuid(guid: string): IdbKeyPerformanceMetricImpact {
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.getValue();
    return keyPerformanceMetricImpacts.find(kpmImpact => {
      return kpmImpact.guid == guid
    });
  }

  getByNebGuid(nebGuid: string): Array<IdbKeyPerformanceMetricImpact> {
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.getValue();
    return keyPerformanceMetricImpacts.filter(kpmImpact => {
      return kpmImpact.nebId == nebGuid
    });
  }

  getByCompanyGuid(companyGuid: string): Array<IdbKeyPerformanceMetricImpact> {
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.getValue();
    return keyPerformanceMetricImpacts.filter(kpmImpact => {
      return kpmImpact.companyId == companyGuid
    });
  }

  getByKpiGuid(kpiGuid: string): Array<IdbKeyPerformanceMetricImpact> {
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.getValue();
    return keyPerformanceMetricImpacts.filter(kpmImpact => {
      return kpmImpact.kpiGuid == kpiGuid
    });
  }

  async updatePerformanceMetricBaseline(keyPerformanceIndicator: IdbKeyPerformanceIndicator, keyPerformanceMetric: KeyPerformanceMetric) {
    let companyMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.getByKpiGuid(keyPerformanceIndicator.guid);
    for (let i = 0; i < companyMetricImpacts.length; i++) {
      let metricImpact: IdbKeyPerformanceMetricImpact = companyMetricImpacts[i];
      if (keyPerformanceMetric.calculationMethod == 'costPerUnit') {
        metricImpact.costAdjustment = (metricImpact.modificationValue * keyPerformanceMetric.costPerValue);
      } else if (keyPerformanceMetric.calculationMethod == 'percentTotal') {
        metricImpact.costAdjustment = keyPerformanceMetric.baselineCost * (metricImpact.modificationValue / 100);
      } else if(keyPerformanceMetric.calculationMethod == 'directCost'){
        metricImpact.costAdjustment = metricImpact.modificationValue;
      }
      await firstValueFrom(this.updateWithObservable(metricImpact));
    }
    await this.setKeyPerformanceMetricImpacts();
  }

  getAllKpmImpacts(kpmGuid: string): Array<IdbKeyPerformanceMetricImpact> {
    let allKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.getValue();
    return allKpmImpacts.filter(kpmImpact => {
      return kpmImpact.kpmGuid == kpmGuid;
    });
  }
}
