import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { IdbEnergyEquipment } from '../models/energyEquipment';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { guidType } from '../shared/constants/guidTypes';

@Injectable({
  providedIn: 'root'
})
export class EnergyEquipmentIdbService {

  energyEquipments: BehaviorSubject<Array<IdbEnergyEquipment>>;
  selectedEnergyEquipment: BehaviorSubject<IdbEnergyEquipment>;
  constructor(private dbService: NgxIndexedDBService) {
    this.energyEquipments = new BehaviorSubject<Array<IdbEnergyEquipment>>([]);
    this.selectedEnergyEquipment = new BehaviorSubject<IdbEnergyEquipment>(undefined);
  }

  async setEnergyEquipments() {
    let _energyEquipments: Array<IdbEnergyEquipment> = await firstValueFrom(this.getAll());
    this.energyEquipments.next(_energyEquipments);
  }

  getAll(): Observable<Array<IdbEnergyEquipment>> {
    return this.dbService.getAll('energyEquipment');
  }

  getById(id: number): Observable<IdbEnergyEquipment> {
    return this.dbService.getByKey('energyEquipment', id);
  }

  addWithObservable(energyEquipment: IdbEnergyEquipment): Observable<IdbEnergyEquipment> {
    return this.dbService.add('energyEquipment', energyEquipment);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('energyEquipment', id);
  }

  updateWithObservable(energyEquipment: IdbEnergyEquipment): Observable<IdbEnergyEquipment> {
    energyEquipment.modifiedDate = new Date();
    return this.dbService.update('energyEquipment', energyEquipment);
  }

  setSelectedFromGUID(guid: string): boolean {
    let energyEquipment: IdbEnergyEquipment = this.getByGuid(guid);
    this.selectedEnergyEquipment.next(energyEquipment);
    return energyEquipment != undefined;
  }

  async asyncUpdate(energyEquipment: IdbEnergyEquipment) {
    energyEquipment = await firstValueFrom(this.updateWithObservable(energyEquipment));
    await this.setEnergyEquipments();
    this.selectedEnergyEquipment.next(energyEquipment);
  }

  getByGuid(guid: string): IdbEnergyEquipment {
    let energyEquipments: Array<IdbEnergyEquipment> = this.energyEquipments.getValue();
    return energyEquipments.find(_energyEquipment => { return _energyEquipment.guid == guid });
  }

  getByOtherGuid(guid: string, idType: guidType): Array<IdbEnergyEquipment> {
    let energyEquipments: Array<IdbEnergyEquipment> = this.energyEquipments.getValue();
    if (idType == 'company') {
      return energyEquipments.filter(_energyEquipment => { return _energyEquipment.companyId == guid });
    } else if (idType == 'facility') {
      return energyEquipments.filter(_energyEquipment => { return _energyEquipment.facilityId == guid });
    } else {
      return [];
    }
  }
}
