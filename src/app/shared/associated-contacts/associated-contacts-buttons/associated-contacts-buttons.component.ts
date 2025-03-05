import { Component, Input } from '@angular/core';
import { faLink, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { ContactContext, IdbContact } from 'src/app/models/contact';

@Component({
  selector: 'app-associated-contacts-buttons',
  standalone: false,

  templateUrl: './associated-contacts-buttons.component.html',
  styleUrl: './associated-contacts-buttons.component.css'
})
export class AssociatedContactsButtonsComponent {
  @Input({ required: true })
  contextGuid: string;
  @Input({ required: true })
  contactContext: ContactContext;
  @Input({ required: true })
  companyGuid: string;

  faUser: IconDefinition = faUser;
  faLink: IconDefinition = faLink;

  selectedContact: IdbContact;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;
  showModal: boolean = false;
  constructor(private contactsIdbService: ContactIdbService) {

  }

  ngOnInit() {
    this.contactsSub = this.contactsIdbService.contacts.subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }

  openModal(contact: IdbContact) {
    this.selectedContact = contact;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
