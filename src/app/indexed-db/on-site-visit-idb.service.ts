import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from '../models/onSiteVisit';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';

@Injectable({
  providedIn: 'root'
})
export class OnSiteVisitIdbService {

  onSiteVisits: BehaviorSubject<Array<IdbOnSiteVisit>>;
  selectedVisit: BehaviorSubject<IdbOnSiteVisit>;
  constructor(private dbService: NgxIndexedDBService,
    private analyticsService: AnalyticsService
  ) {
    this.onSiteVisits = new BehaviorSubject<Array<IdbOnSiteVisit>>([]);
    this.selectedVisit = new BehaviorSubject<IdbOnSiteVisit>(undefined);
  }

  async setOnSiteVisits() {
    let _onSiteVisits: Array<IdbOnSiteVisit> = await firstValueFrom(this.getAll());
    this.onSiteVisits.next(_onSiteVisits);
  }

  getAll(): Observable<Array<IdbOnSiteVisit>> {
    return this.dbService.getAll('onSiteVisit');
  }

  getById(id: number): Observable<IdbOnSiteVisit> {
    return this.dbService.getByKey('onSiteVisit', id);
  }

  addWithObservable(onSiteVisit: IdbOnSiteVisit): Observable<IdbOnSiteVisit> {
    this.analyticsService.sendEvent('add_on_site_visit', undefined);
    return this.dbService.add('onSiteVisit', onSiteVisit);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('onSiteVisit', id);
  }

  updateWithObservable(onSiteVisit: IdbOnSiteVisit): Observable<IdbOnSiteVisit> {
    onSiteVisit.modifiedDate = new Date();
    return this.dbService.update('onSiteVisit', onSiteVisit);
  }

  setSelectedFromGUID(guid: string): boolean {
    let onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisits.getValue();
    let onSiteVisit: IdbOnSiteVisit = onSiteVisits.find(_onSiteVisit => { return _onSiteVisit.guid == guid });
    this.selectedVisit.next(onSiteVisit);
    return onSiteVisit != undefined;
  }

  setSelectedFromAssessmentGUID(assessmentGUID: string): boolean {
    let onSiteVisit: IdbOnSiteVisit = this.getByAssessmentGUID(assessmentGUID);
    this.selectedVisit.next(onSiteVisit);
    return onSiteVisit != undefined;
  }

  getByAssessmentGUID(assessmentGUID: string): IdbOnSiteVisit {
    let onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisits.getValue();
    let onSiteVisit: IdbOnSiteVisit = onSiteVisits.find(_onSiteVisit => { return _onSiteVisit.assessmentIds.includes(assessmentGUID) });
    return onSiteVisit;
  }

  getByFacilityGUID(facilityGUID: string): Array<IdbOnSiteVisit> {
    let onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisits.getValue();
    let facilityOnSiteVisit: Array<IdbOnSiteVisit> = onSiteVisits.filter(_onSiteVisit => { return _onSiteVisit.facilityId == facilityGUID });
    return facilityOnSiteVisit;
  }

  async asyncUpdate(onSiteVisit: IdbOnSiteVisit) {
    onSiteVisit = await firstValueFrom(this.updateWithObservable(onSiteVisit));
    await this.setOnSiteVisits();
    this.selectedVisit.next(onSiteVisit);
  }


  async addNewOnSiteVisit(userGuid: string, companyGuid: string, facilityGuid: string): Promise<string> {
    let visit: IdbOnSiteVisit = getNewIdbOnSiteVisit(userGuid, companyGuid, facilityGuid);
    visit = await firstValueFrom(this.addWithObservable(visit));
    await this.setOnSiteVisits();
    return visit.guid;
  }

  getByGuid(guid: string): IdbOnSiteVisit {
    let onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisits.getValue();
    return onSiteVisits.find(visit => {
      return visit.guid == guid
    });
  }
}
