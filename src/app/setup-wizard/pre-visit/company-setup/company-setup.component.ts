import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdbCompany } from 'src/app/models/company';
import { IconDefinition, faBuilding, faChevronRight, faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { Observable, Subscription, filter, firstValueFrom, of } from 'rxjs';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-company-setup',
    templateUrl: './company-setup.component.html',
    styleUrl: './company-setup.component.css',
    standalone: false
})
export class CompanySetupComponent implements OnInit, OnDestroy {

  faBuilding: IconDefinition = faBuilding;
  faChevronRight: IconDefinition = faChevronRight;
  faCircleExclamation: IconDefinition = faCircleExclamation;

  selectedCompany: IdbCompany;
  selectedCompanySub: Subscription;
  name: FormControl;
  routeGuardWarningModal: boolean = false;

  hasAssessments: boolean = false;
  constructor(private router: Router,
    private companyIdbService: CompanyIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
  ) {

  }

  ngOnInit() {
    this.selectedCompanySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.selectedCompany = _company;
      if (this.selectedCompany) {
        this.name = new FormControl(this.selectedCompany.generalInformation.name, [Validators.required]);
      }
    });
  }

  canDeactivate(): Observable<boolean> {
    if (this.name && this.name.getError('required')) {
      this.name.markAsTouched();
      this.displayWarningModal();
      return of(false);
    }
    return of(true);
  }

  ngOnDestroy() {
    this.selectedCompanySub.unsubscribe();
  }

  async goToContacts() {
    this.selectedCompany.sidebarContactsOpen = true;
    await this.companyIdbService.asyncUpdate(this.selectedCompany);
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/company-contacts');
  }

  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }
  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }
}
