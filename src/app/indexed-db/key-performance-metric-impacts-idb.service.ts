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

  getByFacilityGuid(facilityId: string): Array<IdbKeyPerformanceMetricImpact> {
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.getValue();
    return keyPerformanceMetricImpacts.filter(kpmImpact => {
      return kpmImpact.facilityId == facilityId
    });
  }

  getByKpiGuid(kpiGuid: string): Array<IdbKeyPerformanceMetricImpact> {
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.getValue();
    return keyPerformanceMetricImpacts.filter(kpmImpact => {
      return kpmImpact.kpiGuid == kpiGuid
    });
  }

  getByKpmGuid(kpmGuid: string): Array<IdbKeyPerformanceMetricImpact> {
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpacts.getValue();
    return keyPerformanceMetricImpacts.filter(kpmImpact => {
      return kpmImpact.kpmGuid == kpmGuid
    });
  }

  async updatePerformanceMetricBaseline(keyPerformanceMetric: KeyPerformanceMetric) {
    let facilityMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.getByKpmGuid(keyPerformanceMetric.guid);
    for (let i = 0; i < facilityMetricImpacts.length; i++) {
      let metricImpact: IdbKeyPerformanceMetricImpact = facilityMetricImpacts[i];
      if (metricImpact.calculationMethod == 'costPerUnit') {
        metricImpact.costAdjustment = (metricImpact.modificationValue * keyPerformanceMetric.costPerValue);
      } else if (metricImpact.calculationMethod == 'percentTotal') {
        metricImpact.costAdjustment = keyPerformanceMetric.baselineCost * (metricImpact.modificationValue / 100);
      } else if(metricImpact.calculationMethod == 'directCost'){
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
