import { Component } from '@angular/core';
import { IconDefinition, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
    selector: 'app-team-details-summary',
    templateUrl: './team-details-summary.component.html',
    styleUrl: './team-details-summary.component.css',
    standalone: false
})
export class TeamDetailsSummaryComponent {

  faAddressBook: IconDefinition = faAddressBook;

  contacts: Array<IdbContact>;
  constructor(private contactIdbService: ContactIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {
  }

  ngOnInit() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    let allContacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
    this.contacts = allContacts.filter(_contact => {
      return _contact.companyId == onSiteVisit.companyId;
    });
  }
}
