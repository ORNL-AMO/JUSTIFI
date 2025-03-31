import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { IdbReport } from '../models/report';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { IdbAssessment } from '../models/assessment';
import { IdbOnSiteVisit } from '../models/onSiteVisit';
import { IdbEnergyOpportunity } from '../models/energyOpportunity';
import { IdbKeyPerformanceMetricImpact } from '../models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from '../models/nonEnergyBenefit';

@Injectable({
  providedIn: 'root'
})
export class ReportIdbService {

  reports: BehaviorSubject<Array<IdbReport>>;
  selectedReport: BehaviorSubject<IdbReport>;
  constructor(private dbService: NgxIndexedDBService) {
    this.reports = new BehaviorSubject<Array<IdbReport>>([]);
    this.selectedReport = new BehaviorSubject<IdbReport>(undefined);
  }

  async setReports() {
    let _reports: Array<IdbReport> = await firstValueFrom(this.getAll());
    this.reports.next(_reports);
  }

  getAll(): Observable<Array<IdbReport>> {
    return this.dbService.getAll('report');
  }

  getById(id: number): Observable<IdbReport> {
    return this.dbService.getByKey('report', id);
  }

  addWithObservable(report: IdbReport): Observable<IdbReport> {
    return this.dbService.add('report', report);
  }

  deleteWithObservable(id: number): Observable<any> {
    console.log(id);
    return this.dbService.delete('report', id);
  }

  updateWithObservable(report: IdbReport): Observable<IdbReport> {
    report.modifiedDate = new Date();
    return this.dbService.update('report', report);
  }

  setSelectedFromGUID(guid: string): boolean {
    let report: IdbReport = this.getByGuid(guid);
    this.selectedReport.next(report);
    return report != undefined;
  }

  async asyncUpdate(report: IdbReport) {
    report = await firstValueFrom(this.updateWithObservable(report));
    await this.setReports();
    this.selectedReport.next(report);
  }

  getByGuid(guid: string): IdbReport {
    let reports: Array<IdbReport> = this.reports.getValue();
    return reports.find(_report => { return _report.guid == guid });
  }

  getReportsByOnSiteVisitId(onSiteVisitId: string): Array<IdbReport> {
    let reports: Array<IdbReport> = this.reports.getValue();
    return reports.filter(report => {
      return report.onSiteVisitId == onSiteVisitId
    });
  }

  async addNewAssessment(assessmentId: string, onSiteVisitId: string) {
    let reports: Array<IdbReport> = this.getReportsByOnSiteVisitId(onSiteVisitId);
    if (reports.length > 0) {
      for (let i = 0; i < reports.length; i++) {
        reports[i].assessmentOptions.push({
          assessmentId: assessmentId,
          include: true
        });
        await firstValueFrom(this.updateWithObservable(reports[i]));
      }
      await this.setReports();
    }
  }


  async addEnergyOpportunity(energyOpportunity: IdbEnergyOpportunity, onSiteVisitId: string) {
    let reports: Array<IdbReport> = this.getReportsByOnSiteVisitId(onSiteVisitId);
    if (reports.length > 0) {
      for (let i = 0; i < reports.length; i++) {
        reports[i].energyOpportunityOptions.push({
          energyOpportunityId: energyOpportunity.guid,
          assessmentId: energyOpportunity.assessmentId,
          include: true
        });
        await firstValueFrom(this.updateWithObservable(reports[i]));
      }
      await this.setReports();
    }
  }

  async addNonEnergyBenefit(neb: IdbNonEnergyBenefit, onSiteVisitId: string) {
    let reports: Array<IdbReport> = this.getReportsByOnSiteVisitId(onSiteVisitId);
    if (reports.length > 0) {
      for (let i = 0; i < reports.length; i++) {
        reports[i].nonEnergyBenefitOptions.push({
          include: true,
          nonEnergyBenefitId: neb.guid,
          assessmentId: neb.assessmentId,
          energyOpportunityId: neb.energyOpportunityId
        });
        console.log(reports);
        await firstValueFrom(this.updateWithObservable(reports[i]));
      }
      await this.setReports();
    }
  }

  async addKpmImpact(impact: IdbKeyPerformanceMetricImpact, onSiteVisitId: string) {
    let reports: Array<IdbReport> = this.getReportsByOnSiteVisitId(onSiteVisitId);
    if (reports.length > 0) {
      for (let i = 0; i < reports.length; i++) {
        reports[i].kpmImpactOptions.push({
          include: true,
          nonEnergyBenefitId: impact.nebId,
          assessmentId: impact.assessmentId,
          energyOpportunityId: impact.energyOpportunityId,
          kpmImpactId: impact.guid
        });
        await firstValueFrom(this.updateWithObservable(reports[i]));
      }
      await this.setReports();
    }
  }
}
