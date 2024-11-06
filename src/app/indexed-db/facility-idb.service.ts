import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbFacility, getNewIdbFacility } from '../models/facility';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { guidType } from '../shared/constants/guidTypes';

@Injectable({
  providedIn: 'root'
})
export class FacilityIdbService {


  facilities: BehaviorSubject<Array<IdbFacility>>;
  selectedFacility: BehaviorSubject<IdbFacility>;
  constructor(private dbService: NgxIndexedDBService) {
    this.facilities = new BehaviorSubject<Array<IdbFacility>>([]);
    this.selectedFacility = new BehaviorSubject<IdbFacility>(undefined);
  }

  async setFacilities() {
    let _facilities: Array<IdbFacility> = await firstValueFrom(this.getAll());
    this.facilities.next(_facilities);
  }

  getAll(): Observable<Array<IdbFacility>> {
    return this.dbService.getAll('facility');
  }

  getById(id: number): Observable<IdbFacility> {
    return this.dbService.getByKey('facility', id);
  }

  addWithObservable(facility: IdbFacility): Observable<IdbFacility> {
    return this.dbService.add('facility', facility);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('facility', id);
  }

  updateWithObservable(facility: IdbFacility): Observable<IdbFacility> {
    facility.modifiedDate = new Date();
    return this.dbService.update('facility', facility);
  }
  
  setSelectedFromGUID(guid: string): boolean {
    let facility: IdbFacility = this.getByGUID(guid);
    this.selectedFacility.next(facility);
    return facility != undefined;
  }

  async asyncUpdate(facility: IdbFacility) {
    facility = await firstValueFrom(this.updateWithObservable(facility));
    await this.setFacilities();
    this.selectedFacility.next(facility);
  }

  getByGUID(guid: string): IdbFacility {
    let facilities: Array<IdbFacility> = this.facilities.getValue();
    let facility: IdbFacility = facilities.find(_facility => { return _facility.guid == guid });
    return facility;
  }


  async addNewFacility(userGuid: string, facilityGuid: string): Promise<string> {
    let newFacility: IdbFacility = getNewIdbFacility(userGuid, facilityGuid);
    newFacility = await firstValueFrom(this.addWithObservable(newFacility));
    await this.setFacilities();
    return newFacility.guid;
  }

  getByOtherGuid(guid: string, idType: guidType): Array<IdbFacility> {
    let facilities: Array<IdbFacility> = this.facilities.getValue();
    let _facilities: Array<IdbFacility> = facilities.filter(facility => {
      if (idType == 'company') {
        return facility.companyId == guid;
      } else if (idType == 'user') {
        return facility.userId == guid;
      } else {
        return false;
      }
    });
    return _facilities;
  }
}
