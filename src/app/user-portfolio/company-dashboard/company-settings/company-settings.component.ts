import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCopy, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
    selector: 'app-company-settings',
    templateUrl: './company-settings.component.html',
    styleUrl: './company-settings.component.css',
    standalone: false
})
export class CompanySettingsComponent {

  faTrash: IconDefinition = faTrash;
  faCopy: IconDefinition = faCopy;

  showDeleteCompanyModal: boolean = false;
  showCreateCopyModal: boolean = false;


  company: IdbCompany;
  companySub: Subscription;
  name: FormControl;
  routeGuardWarningModal: boolean = false;

  hasAssessments: boolean = false;
  constructor(
    private companyIdbService: CompanyIdbService,
    private dbChangesService: DbChangesService,
    private loadingService: LoadingService,
    private toastNotificationService: ToastNotificationsService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
      if (this.company) {
        this.name = new FormControl(this.company.generalInformation.name, [Validators.required]);
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
    this.companySub.unsubscribe();
  }


  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }
  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }

  openDeleteCompanyModal() {
    this.showDeleteCompanyModal = true;
  }

  closeDeleteCompanyModal() {
    this.showDeleteCompanyModal = false;
  }

  openCreateCopyModal() {
    this.showCreateCopyModal = true;
  }

  closeCreateCopyModal() {
    this.showCreateCopyModal = false;
  }

  confirmCreateCopy() {
    //TODO...
  }

  async confirmDelete() {
    this.showDeleteCompanyModal = false;
    this.loadingService.setLoadingMessage('Deleting ' + this.company.generalInformation.name + '...');
    this.loadingService.setLoadingStatus(true);
    await this.dbChangesService.deleteCompany(this.company);
    this.loadingService.setLoadingStatus(false);
    this.toastNotificationService.showToast('Company Deleted!', undefined, 'bg-success', true, false);
    this.router.navigateByUrl('/portfolio');
  }
}
