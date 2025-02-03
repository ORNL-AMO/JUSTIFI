import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { getNewIdbContact, IdbContact } from 'src/app/models/contact';

@Component({
    selector: 'app-company-stakeholders-home',
    templateUrl: './company-stakeholders-home.component.html',
    styleUrl: './company-stakeholders-home.component.css',
    standalone: false
})
export class CompanyStakeholdersHomeComponent {

  faPlus: IconDefinition = faPlus;
  companyContacts: Array<IdbContact>;
  contactsSub: Subscription;

  company: IdbCompany;
  selectedCompanySub: Subscription;
  constructor(
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private toastNotificationService: ToastNotificationsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });

    this.contactsSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.companyContacts = _contacts.filter(contact => {
        return contact.companyId == this.company.guid
      });
    });
  }

  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
    this.contactsSub.unsubscribe();
  }

  async addContact() {
    let newContact: IdbContact = getNewIdbContact(this.company.userId, this.company.guid);
    newContact = await firstValueFrom(this.contactIdbService.addWithObservable(newContact));
    await this.contactIdbService.setContacts();
    this.toastNotificationService.showToast('Stakeholder Added!', 'A new stakeholder has been added to ' + this.company.generalInformation.name, 'bg-success', true, false);
    this.router.navigateByUrl('/portfolio/company/' + newContact.companyId + '/stakeholders/' + newContact.guid);
  }
}
