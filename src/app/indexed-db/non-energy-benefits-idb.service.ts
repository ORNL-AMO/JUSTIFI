import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbNonEnergyBenefit } from '../models/nonEnergyBenefit';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class NonEnergyBenefitsIdbService {

  nonEnergyBenefits: BehaviorSubject<Array<IdbNonEnergyBenefit>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.nonEnergyBenefits = new BehaviorSubject<Array<IdbNonEnergyBenefit>>([]);
  }

  async setNonEnergyBenefits() {
    let _nonEnergyBenefits: Array<IdbNonEnergyBenefit> = await firstValueFrom(this.getAll());
    this.nonEnergyBenefits.next(_nonEnergyBenefits);
  }

  getAll(): Observable<Array<IdbNonEnergyBenefit>> {
    return this.dbService.getAll('nonEnergyBenefit');
  }

  getById(id: number): Observable<IdbNonEnergyBenefit> {
    return this.dbService.getByKey('nonEnergyBenefit', id);
  }

  addWithObservable(nonEnergyBenefit: IdbNonEnergyBenefit): Observable<IdbNonEnergyBenefit> {
    return this.dbService.add('nonEnergyBenefit', nonEnergyBenefit);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('nonEnergyBenefit', id);
  }

  updateWithObservable(nonEnergyBenefit: IdbNonEnergyBenefit): Observable<IdbNonEnergyBenefit> {
    nonEnergyBenefit.modifiedDate = new Date();
    return this.dbService.update('nonEnergyBenefit', nonEnergyBenefit);
  }

  async asyncUpdate(nonEnergyBenefit: IdbNonEnergyBenefit) {
    nonEnergyBenefit = await firstValueFrom(this.updateWithObservable(nonEnergyBenefit));
    await this.setNonEnergyBenefits();
  }

  getByGuid(guid: string): IdbNonEnergyBenefit {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.getValue();
    return nonEnergyBenefits.find(neb => {
      return neb.guid == guid;
    })
  }

  getCompanyNonEnergyBenefits(companyGuid: string): Array<IdbNonEnergyBenefit> {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.getValue();
    return nonEnergyBenefits.filter(neb => {
      return neb.companyId == companyGuid;
    });
  }

  getEnergyOpportunityNonEnergyBenefits(energyOpportunityGuid: string): Array<IdbNonEnergyBenefit> {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.getValue();
    return nonEnergyBenefits.filter(neb => {
      return neb.energyOpportunityId == energyOpportunityGuid;
    });
  }

  getAssessmentNonEnergyBenefits(assessmentId: string, filterEnergyOppBenefits: boolean): Array<IdbNonEnergyBenefit> {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefits.getValue();
    return nonEnergyBenefits.filter(neb => {
      if (filterEnergyOppBenefits) {
        return neb.assessmentId == assessmentId && neb.energyOpportunityId == undefined;
      } else {
        return neb.assessmentId == assessmentId;
      }
    });
  }
}
