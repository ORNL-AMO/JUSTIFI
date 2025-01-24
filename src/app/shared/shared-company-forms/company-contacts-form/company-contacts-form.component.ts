import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CompanyContactsFormService } from './company-contacts-form.service';
import { IdbContact } from 'src/app/models/contact';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IconDefinition, faCircleExclamation, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';

@Component({
  selector: 'app-company-contacts-form',
  templateUrl: './company-contacts-form.component.html',
  styleUrl: './company-contacts-form.component.css'
})
export class CompanyContactsFormComponent {
  @Input({ required: true })
  contactGuid: string;

  faTrash: IconDefinition = faTrash;
  faUser: IconDefinition = faUser;

  faCircleExclamation: IconDefinition = faCircleExclamation;
  contact: IdbContact;
  contactForm: FormGroup;
  displayDeleteModal: boolean = false;
  routeGuardWarningModal: boolean = false;
  constructor(private contactIdbService: ContactIdbService, private companyContactsFormService: CompanyContactsFormService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastNotificationService: ToastNotificationsService
  ) {
  }

  ngOnInit() {
    if (!this.contactGuid) {
      this.activatedRoute.params.subscribe(params => {
        this.contactGuid = params['id'];
        this.contact = this.contactIdbService.getContactByGuid(this.contactGuid);
        this.contactForm = this.companyContactsFormService.getFormFromIdbContact(this.contact);
      });
    } else {
      this.contact = this.contactIdbService.getContactByGuid(this.contactGuid);
      this.contactForm = this.companyContactsFormService.getFormFromIdbContact(this.contact);
    }

  }

  async saveChanges() {
    this.contact = this.companyContactsFormService.updateIdbContactFromForm(this.contactForm, this.contact);
    await this.contactIdbService.asyncUpdate(this.contact);
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async deleteContact() {
    await firstValueFrom(this.contactIdbService.deleteWithObservable(this.contact.id));
    await this.contactIdbService.setContacts();
    this.closeDeleteModal();
    this.toastNotificationService.showToast('Stakeholder Deleted!', 'Stakeholder has been removed from this company.', 'bg-success', true, false);
    if (this.router.url.includes('portfolio')) {
      this.router.navigateByUrl('/portfolio/company/' + this.contact.companyId + '/stakeholders');
    }
  }

  canDeactivate(): Observable<boolean> {
    if (this.contactForm.controls['firstname'].invalid ||
      this.contactForm.controls['lastname'].invalid
    ) {
      this.contactForm.markAllAsTouched();
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
