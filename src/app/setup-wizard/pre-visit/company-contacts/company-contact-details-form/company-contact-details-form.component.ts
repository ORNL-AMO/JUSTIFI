import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbContact } from 'src/app/models/contact';
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
  contacts: Array<IdbContact>;
  contactsSub: Subscription;
  contactForm: FormGroup;
  routeGuardWarningModal: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private contactIdbService: ContactIdbService,
    private companyContactFormService: CompanyContactsFormService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.contactGuid = params['id'];
      this.setContact();
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(contacts => {
      this.contacts = contacts;
      this.setContact();
    });
  }

  ngOnDestroy() {
    this.contactsSub.unsubscribe();
  }

  setContact() {
    if (this.contacts) {
      this.contact = this.contacts.find(c => { return c.guid == this.contactGuid });
      if (this.contact) {
        this.contactForm = this.companyContactFormService.getFormFromIdbContact(this.contact);
      } else {
        let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
        this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts')
      }
    }
  }

  next() {
    //TODO: implement next
  }

  goBack() {
    //TODO: Implement back

  }

  canDeactivate(): Observable<boolean> {
    if (this.contactForm.invalid) {
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
