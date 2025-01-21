import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Observable, of, Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { CompanyContactsFormService } from 'src/app/shared/shared-company-forms/company-contacts-form/company-contacts-form.service';

@Component({
  selector: 'app-company-contact-details-form',
  templateUrl: './company-contact-details-form.component.html',
  styleUrl: './company-contact-details-form.component.css'
})
export class CompanyContactDetailsFormComponent {

  faUser: IconDefinition = faUser;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;

  contactGuid: string;
  contact: IdbContact;
  companyContacts: Array<IdbContact>;
  contactsSub: Subscription;
  contactForm: FormGroup;
  routeGuardWarningModal: boolean = false;
  contactIndex: number;

  company: IdbCompany;
  companySub: Subscription;

  contactDeleted: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private contactIdbService: ContactIdbService,
    private companyContactFormService: CompanyContactsFormService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService
  ) {

  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(val => {
      this.company = val;
    });
    this.activatedRoute.params.subscribe(params => {
      this.contactGuid = params['id'];
      this.setContact();
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(contacts => {
      this.companyContacts = contacts.filter(c => { return c.companyId == this.company.guid });
      this.setContact();
    });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
    this.companySub.unsubscribe();
  }

  setContact() {
    if (this.companyContacts) {
      this.contactIndex = this.companyContacts.findIndex(c => { return c.guid == this.contactGuid });
      if (this.contactIndex != -1) {
        this.contact = this.companyContacts[this.contactIndex];
        this.contactForm = this.companyContactFormService.getFormFromIdbContact(this.contact);
      } else {
        this.contactDeleted = true;
        let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
        this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts')
      }
    }
  }

  async next() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.contactIndex++;
    if (this.companyContacts[this.contactIndex]) {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts/' + this.companyContacts[this.contactIndex].guid);
    } else {
      let selectedCompany: IdbCompany = this.companyIdbService.selectedCompany.getValue();
      if (selectedCompany.sidebarContactsOpen) {
        selectedCompany.sidebarContactsOpen = false;
        await this.companyIdbService.asyncUpdate(selectedCompany);
      }
      let facility: IdbFacility = this.facilityIdbService.getByGUID(onSiteVisit.facilityId);
      if (!facility.sidebarOpen) {
        facility.sidebarOpen = true;
        await this.facilityIdbService.asyncUpdate(facility);
      }
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-setup');
    }
  }

  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    if (this.contactIndex != 0) {
      this.contactIndex--;
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts/' + this.companyContacts[this.contactIndex].guid);
    } else {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts');
    }
  }

  canDeactivate(): Observable<boolean> {
    if (this.contactForm.invalid && !this.contactDeleted) {
      this.displayWarningModal();
      return of(false);
    }
    return of(true);
  }

  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }

  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }
}
