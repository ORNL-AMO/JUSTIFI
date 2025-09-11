import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition, faChevronLeft, faCircle, faCircleCheck, faLink, faPlus, faSave, faUser } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { ContactContext, getNewIdbContact, IdbContact } from 'src/app/models/contact';
import * as _ from 'lodash';
import { IdbCompany } from 'src/app/models/company';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-associated-contacts-modal',
  standalone: false,

  templateUrl: './associated-contacts-modal.component.html',
  styleUrl: './associated-contacts-modal.component.css'
})
export class AssociatedContactsModalComponent {
  @Input({ required: true })
  contextGuid: string;
  @Input({ required: true })
  contactContext: ContactContext;
  @Input({ required: true })
  selectedContact: IdbContact;
  @Output('emitCancelContact')
  emitCancelContact: EventEmitter<boolean> = new EventEmitter();
  @Input({ required: true })
  companyGuid: string;

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;
  showAddContactForm: boolean = false;
  newContact: IdbContact;
  contactsSub: Subscription;
  showInvalidFormAlert: boolean = false;
  newContactIndex: number;

  displayModal: boolean = false;
  contacts: Array<IdbContact>;
  faSave: IconDefinition = faSave;
  faCircleCheck: IconDefinition = faCircleCheck;
  faChevronLeft: IconDefinition = faChevronLeft;
  faUser: IconDefinition = faUser;
  faLink: IconDefinition = faLink;
  faCircle: IconDefinition = faCircle;
  faPlus: IconDefinition = faPlus;
  allContacts: Array<IdbContact>;
  constructor(
    private contactIdbService: ContactIdbService,
    private companyIdbService: CompanyIdbService
  ) {
  }

  ngOnInit() {
    //TODO: get contact within dashboards..
    //Use copy to not modify without hitting save

    this.contactsSub = this.contactIdbService.contacts.subscribe(contacts => {
      this.allContacts = contacts;
      this.setContacts();
    });

    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
    });

    setTimeout(() => {
      this.displayModal = true;
    }, 100)
  }

  onContactFormChanged(form: FormGroup) {
    if (form.valid) {
      this.showInvalidFormAlert = false;
    } else {
      this.showInvalidFormAlert = true;
    }
  }

  ngOnDestroy() {
    if (this.selectedCompanySub) {
      this.selectedCompanySub.unsubscribe();
    }

    if (this.contactsSub) {
      this.contactsSub.unsubscribe();
    }
  }

  setContacts() {
    this.contacts = new Array();
    this.allContacts.forEach(contact => {
      if (contact.companyId == this.companyGuid) {
        this.contacts.push(_.cloneDeep(contact));
      }
    });
  }

  closeModal() {
    this.displayModal = false;
    this.emitCancelContact.emit(false);
  }

  async saveChanges() {
    if (this.showAddContactForm) {
      this.toggleContactActive(this.newContactIndex);
    }
    for (let i = 0; i < this.contacts.length; i++) {
      await firstValueFrom(this.contactIdbService.updateWithObservable(this.contacts[i]));
    }
    await this.contactIdbService.setContacts();
    this.closeModal();
  }

  async viewContact(contact: IdbContact) {
    this.selectedContact = contact;
    this.showAddContactForm = false;
    this.toggleContactActive(this.newContactIndex);
    for (let i = 0; i < this.contacts.length; i++) {
      await firstValueFrom(this.contactIdbService.updateWithObservable(this.contacts[i]));
    }
    await this.contactIdbService.setContacts();
  }

  async toggleContactActive(contactIndex: number) {
    if (this.contactContext == 'assessment') {
      if (this.contacts[contactIndex].assessmentIds.includes(this.contextGuid)) {
        this.contacts[contactIndex].assessmentIds = this.contacts[contactIndex].assessmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.contacts[contactIndex].assessmentIds.push(this.contextGuid);
      }
    } else if (this.contactContext == 'processEquipment') {
      if (this.contacts[contactIndex].processEquipmentIds.includes(this.contextGuid)) {
        this.contacts[contactIndex].processEquipmentIds = this.contacts[contactIndex].processEquipmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.contacts[contactIndex].processEquipmentIds.push(this.contextGuid);
      }
    } else if (this.contactContext == 'KPI') {
      if (this.contacts[contactIndex].kpiIds.includes(this.contextGuid)) {
        this.contacts[contactIndex].kpiIds = this.contacts[contactIndex].kpiIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.contacts[contactIndex].kpiIds.push(this.contextGuid);
      }
    } else if (this.contactContext == 'nonEnergyBenefit') {
      if (this.contacts[contactIndex].nonEnergyBenefitIds.includes(this.contextGuid)) {
        this.contacts[contactIndex].nonEnergyBenefitIds = this.contacts[contactIndex].nonEnergyBenefitIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.contacts[contactIndex].nonEnergyBenefitIds.push(this.contextGuid);
      }
    } else if (this.contactContext == 'energyEquipment') {
      if (this.contacts[contactIndex].energyEquipmentIds.includes(this.contextGuid)) {
        this.contacts[contactIndex].energyEquipmentIds = this.contacts[contactIndex].energyEquipmentIds.filter(id => {
          return id != this.contextGuid;
        });
      } else {
        this.contacts[contactIndex].energyEquipmentIds.push(this.contextGuid);
      }
    }
  }

  async addContact() {
    this.newContact = getNewIdbContact(this.selectedCompany.userId, this.selectedCompany.guid);
    await firstValueFrom(this.contactIdbService.addWithObservable(this.newContact))
    await this.contactIdbService.setContacts();
    this.showAddContactForm = true;
    this.newContactIndex = this.contacts.findIndex(contact => { return contact.guid == this.newContact.guid; });
  }
}
