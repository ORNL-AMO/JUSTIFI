import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { IconDefinition, faChevronLeft, faCircle, faCircleCheck, faContactBook, faSave, faUser } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { ContactContext, IdbContact } from 'src/app/models/contact';

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.css'
})
export class ContactModalComponent implements OnInit {
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

  displayModal: boolean = false;
  contacts: Array<IdbContact>;
  faSave: IconDefinition = faSave;
  faCircleCheck: IconDefinition = faCircleCheck;
  faChevronLeft: IconDefinition = faChevronLeft;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;
  faCircle: IconDefinition = faCircle;
  constructor(
    private contactIdbService: ContactIdbService
  ) {
  }

  ngOnInit() {
    //TODO: get contact within dashboards..
    //Use copy to not modify without hitting save
    let allContacts: Array<IdbContact> = this.contactIdbService.contacts.getValue();
    this.contacts = new Array();
    allContacts.forEach(contact => {
      if (contact.companyId == this.companyGuid) {
        this.contacts.push(JSON.parse(JSON.stringify(contact)));
      }
    })

    setTimeout(() => {
      this.displayModal = true;
    }, 100)
  }

  closeModal() {
    this.displayModal = false;
    this.emitCancelContact.emit(false);
  }

  async saveChanges() {
    for (let i = 0; i < this.contacts.length; i++) {
      await firstValueFrom(this.contactIdbService.updateWithObservable(this.contacts[i]));
    }
    await this.contactIdbService.setContacts();
    this.closeModal();
  }

  viewContact(contact: IdbContact) {
    this.selectedContact = contact;
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
}
