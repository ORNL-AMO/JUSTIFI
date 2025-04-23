import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdbFacility } from 'src/app/models/facility';
import { IconDefinition, faChevronLeft, faChevronRight, faIndustry, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { FormControl, Validators } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbContact } from 'src/app/models/contact';
import { SetupWizardService } from '../../setup-wizard.service';

@Component({
    selector: 'app-facility-setup',
    templateUrl: './facility-setup.component.html',
    styleUrl: './facility-setup.component.css',
    standalone: false
})
export class FacilitySetupComponent implements OnInit {

  name: FormControl;
  facilityName: string;

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faIndustry: IconDefinition = faIndustry;
  faCircleExclamation: IconDefinition = faCircleExclamation;

  facilitySub: Subscription;
  facility: IdbFacility;
  routeGuardWarningModal: boolean = false;

  constructor(private facilityIdbService: FacilityIdbService, private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private contactIdbService: ContactIdbService,
    private companyIdbService: CompanyIdbService,
    private setupWizardService: SetupWizardService
  ) {

  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
      if (this.facility) {
        this.name = new FormControl(this.facility.generalInformation.name, [Validators.required]);
      } else {
        this.name = new FormControl('', [Validators.required]);
      }
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async goBack() {
    let company: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    if (!company.sidebarContactsOpen) {
      company.sidebarContactsOpen = true;
      await this.companyIdbService.asyncUpdate(company);
    }
    let contacts: Array<IdbContact> = this.contactIdbService.contacts.getValue()
    let companyContacts: Array<IdbContact> = contacts.filter(c => { return c.companyId == company.guid });
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    if (companyContacts.length != 0) {
      this.router.navigateByUrl('/setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts/' + companyContacts[companyContacts.length - 1].guid);
    } else {
      this.router.navigateByUrl('/setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts');
    }
  }

  async goToQuestions() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-questions');
  }

  canDeactivate(): Observable<boolean> {
    if (this.name && this.name.getError('required')) {
      this.name.markAsTouched();
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
