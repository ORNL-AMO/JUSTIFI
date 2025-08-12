import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { IdbProcessEquipment } from '../models/processEquipment';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessEquipmentIdbService {

  processEquipments: BehaviorSubject<Array<IdbProcessEquipment>>;
  selectedProcessEquipment: BehaviorSubject<IdbProcessEquipment>;
  constructor(private dbService: NgxIndexedDBService,
    private analyticsService: AnalyticsService
  ) {
    this.processEquipments = new BehaviorSubject<Array<IdbProcessEquipment>>([]);
    this.selectedProcessEquipment = new BehaviorSubject<IdbProcessEquipment>(undefined);
  }

  async setProcessEquipments() {
    let _processEquipments: Array<IdbProcessEquipment> = await firstValueFrom(this.getAll());
    this.processEquipments.next(_processEquipments);
  }

  getAll(): Observable<Array<IdbProcessEquipment>> {
    return this.dbService.getAll('processEquipment');
  }

  getById(id: number): Observable<IdbProcessEquipment> {
    return this.dbService.getByKey('processEquipment', id);
  }

  addWithObservable(processEquipment: IdbProcessEquipment): Observable<IdbProcessEquipment> {
    this.analyticsService.sendEvent('add_process_equipment', undefined);
    return this.dbService.add('processEquipment', processEquipment);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('processEquipment', id);
  }

  updateWithObservable(processEquipment: IdbProcessEquipment): Observable<IdbProcessEquipment> {
    processEquipment.modifiedDate = new Date();
    return this.dbService.update('processEquipment', processEquipment);
  }

  setSelectedFromGUID(guid: string): boolean {
    let processEquipment: IdbProcessEquipment = this.getByGuid(guid);
    this.selectedProcessEquipment.next(processEquipment);
    return processEquipment != undefined;
  }

  async asyncUpdate(processEquipment: IdbProcessEquipment) {
    processEquipment = await firstValueFrom(this.updateWithObservable(processEquipment));
    await this.setProcessEquipments();
    this.selectedProcessEquipment.next(processEquipment);
  }

  getByGuid(guid: string): IdbProcessEquipment {
    let processEquipments: Array<IdbProcessEquipment> = this.processEquipments.getValue();
    return processEquipments.find(_processEquipments => { return _processEquipments.guid == guid });
  }

  getFacilityProcessEquipment(facilityId: string): Array<IdbProcessEquipment> {
    let processEquipments: Array<IdbProcessEquipment> = this.processEquipments.getValue();
    return processEquipments.filter(_processEquipments => { return _processEquipments.facilityId == facilityId });
  }
}
