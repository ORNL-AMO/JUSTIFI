import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbAssessment } from '../models/assessment';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { guidType } from '../shared/constants/guidTypes';

@Injectable({
  providedIn: 'root'
})
export class AssessmentIdbService {

  assessments: BehaviorSubject<Array<IdbAssessment>>;
  selectedAssessment: BehaviorSubject<IdbAssessment>;
  constructor(private dbService: NgxIndexedDBService) {
    this.assessments = new BehaviorSubject<Array<IdbAssessment>>([]);
    this.selectedAssessment = new BehaviorSubject<IdbAssessment>(undefined);
  }

  async setAssessments() {
    let _assessments: Array<IdbAssessment> = await firstValueFrom(this.getAll());
    this.assessments.next(_assessments);
  }

  getAll(): Observable<Array<IdbAssessment>> {
    return this.dbService.getAll('assessment');
  }

  getById(id: number): Observable<IdbAssessment> {
    return this.dbService.getByKey('assessment', id);
  }

  addWithObservable(assessment: IdbAssessment): Observable<IdbAssessment> {
    return this.dbService.add('assessment', assessment);
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.dbService.delete('assessment', id);
  }

  updateWithObservable(assessment: IdbAssessment): Observable<IdbAssessment> {
    assessment.modifiedDate = new Date();
    return this.dbService.update('assessment', assessment);
  }

  setSelectedFromGUID(guid: string): boolean {
    let assessment: IdbAssessment = this.getByGuid(guid);
    this.selectedAssessment.next(assessment);
    return assessment != undefined;
  }

  async asyncUpdate(assessment: IdbAssessment) {
    assessment = await firstValueFrom(this.updateWithObservable(assessment));
    await this.setAssessments();
    this.selectedAssessment.next(assessment);
  }

  getByGuid(guid: string): IdbAssessment {
    let assessments: Array<IdbAssessment> = this.assessments.getValue();
    return assessments.find(_assessment => { return _assessment.guid == guid });
  }

  getByOtherGuid(guid: string, idType: guidType): Array<IdbAssessment> {
    let assessments: Array<IdbAssessment> = this.assessments.getValue();
    if (idType == 'company') {
      return assessments.filter(_assessment => { return _assessment.companyId == guid });
    } else if (idType == 'facility') {
      return assessments.filter(_assessment => { return _assessment.facilityId == guid });
    } else {
      return [];
    }
  }
}
