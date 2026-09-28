import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { IdbContact } from '../models/contact';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { AnalyticsService } from '../analytics/analytics.service';
import { OnSiteVisitActivityService } from './on-site-visit-activity.service';

@Injectable({
  providedIn: 'root'
})
export class ContactIdbService {

  contacts: BehaviorSubject<Array<IdbContact>>;
  constructor(private dbService: NgxIndexedDBService,
    private analyticsService: AnalyticsService,
    private onSiteVisitActivityService: OnSiteVisitActivityService
  ) {
    this.contacts = new BehaviorSubject<Array<IdbContact>>([]);
  }

  async setContacts() {
    let _contacts: Array<IdbContact> = await firstValueFrom(this.getAll());
    this.contacts.next(_contacts);
  }

  getAll(): Observable<Array<IdbContact>> {
    return this.dbService.getAll('contact');
  }

  getById(id: number): Observable<IdbContact> {
    return this.dbService.getByKey('contact', id);
  }

  addWithObservable(contact: IdbContact): Observable<IdbContact> {
    this.analyticsService.sendEvent('add_contact', undefined);
    return this.onSiteVisitActivityService.trackActivity(this.dbService.add('contact', contact));
  }

  deleteWithObservable(id: number): Observable<any> {
    return this.onSiteVisitActivityService.trackActivity(this.dbService.delete('contact', id));
  }

  updateWithObservable(contact: IdbContact): Observable<IdbContact> {
    contact.modifiedDate = new Date();
    return this.onSiteVisitActivityService.trackActivity(this.dbService.update('contact', contact));
  }

  async asyncUpdate(contact: IdbContact) {
    contact = await firstValueFrom(this.updateWithObservable(contact));
    await this.setContacts();
  }

  getContactByGuid(guid: string): IdbContact {
    let contacts: Array<IdbContact> = this.contacts.getValue();
    return contacts.find(contact => { return contact.guid == guid });
  }
}
