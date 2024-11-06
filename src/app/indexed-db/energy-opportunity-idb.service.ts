import { Injectable } from '@angular/core';
import { IdbEnergyOpportunity } from '../models/energyOpportunity';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { guidType } from '../shared/constants/guidTypes';

@Injectable({
  providedIn: 'root'
})
export class EnergyOpportunityIdbService {

  energyOpportunities: BehaviorSubject<Array<IdbEnergyOpportunity>>;
  selectedEnergyOpportunity: BehaviorSubject<IdbEnergyOpportunity>;
  constructor(private dbService: NgxIndexedDBService) {
    this.energyOpportunities = new BehaviorSubject<Array<IdbEnergyOpportunity>>([]);
    this.selectedEnergyOpportunity = new BehaviorSubject<IdbEnergyOpportunity>(undefined);
  }

  async setEnergyOpportunities() {
    let _energyOpportunities: Array<IdbEnergyOpportunity> = await firstValueFrom(this.getAll());
    this.energyOpportunities.next(_energyOpportunities);
  }

  getAll(): Observable<Array<IdbEnergyOpportunity>> {
    return this.dbService.getAll('energyOpportunity');
  }

  getById(id: number): Observable<IdbEnergyOpportunity> {
    return this.dbService.getByKey('energyOpportunity', id);
  }

  addWithObservable(energyOpportunity: IdbEnergyOpportunity): Observable<IdbEnergyOpportunity> {
    return this.dbService.add('energyOpportunity', energyOpportunity);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('energyOpportunity', id);
  }

  updateWithObservable(energyOpportunity: IdbEnergyOpportunity): Observable<IdbEnergyOpportunity> {
    energyOpportunity.modifiedDate = new Date();
    return this.dbService.update('energyOpportunity', energyOpportunity);
  }

  setSelectedFromGUID(guid: string): boolean {
    let energyOpportunity: IdbEnergyOpportunity = this.getByGuid(guid);
    this.selectedEnergyOpportunity.next(energyOpportunity);
    return energyOpportunity != undefined;
  }

  async asyncUpdate(energyOpportunity: IdbEnergyOpportunity) {
    energyOpportunity = await firstValueFrom(this.updateWithObservable(energyOpportunity));
    await this.setEnergyOpportunities();
    this.selectedEnergyOpportunity.next(energyOpportunity);
  }

  getByGuid(guid: string): IdbEnergyOpportunity {
    let energyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunities.getValue();
    return energyOpportunities.find(opportunity => {
      return opportunity.guid == guid;
    });
  }

  getByOtherGuid(guid: string, idType: guidType): Array<IdbEnergyOpportunity> {
    let energyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunities.getValue();
    if (idType == 'company') {
      return energyOpportunities.filter(opportunity => {
        return opportunity.companyId == guid;
      });
    } else if (idType == 'facility') {
      return energyOpportunities.filter(opportunity => {
        return opportunity.facilityId == guid;
      });
    } else if (idType == 'assessment') {
      return energyOpportunities.filter(opportunity => {
        return opportunity.assessmentId == guid;
      });
    } else {
      return [];
    }
  }
}
