import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { IdbReport } from '../models/report';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class ReportIdbService {

  reports: BehaviorSubject<Array<IdbReport>>;
  constructor(private dbService: NgxIndexedDBService) {
    this.reports = new BehaviorSubject<Array<IdbReport>>([]);
  }

  async setReports() {
    let _reports: Array<IdbReport> = await firstValueFrom(this.getAll());
    console.log(_reports);
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

  // setSelectedFromGUID(guid: string): boolean {
  //   let report: IdbReport = this.getByGuid(guid);
  //   this.selectedEnergyEquipment.next(energyEquipment);
  //   return energyEquipment != undefined;
  // }

  async asyncUpdate(report: IdbReport) {
    report = await firstValueFrom(this.updateWithObservable(report));
    await this.setReports();
    // this.selectedEnergyEquipment.next(energyEquipment);
  }

  getByGuid(guid: string): IdbReport {
    let reports: Array<IdbReport> = this.reports.getValue();
    return reports.find(_report => { return _report.guid == guid });
  }
}
