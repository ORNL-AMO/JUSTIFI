import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faCopy, faExpand, faIndustry, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';

@Component({
  selector: 'app-company-list-item',
  templateUrl: './company-list-item.component.html',
  styleUrl: './company-list-item.component.css'
})
export class CompanyListItemComponent {
  @Input({ required: true })
  company: IdbCompany;

  faIndustry: IconDefinition = faIndustry;
  faTrash: IconDefinition = faTrash;
  faExpand: IconDefinition = faExpand;
  faCopy: IconDefinition = faCopy;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;
  accordionGuid: string;

  showDeleteCompanyModal: boolean = false;
  showCreateCopyModal: boolean = false;
  constructor(private facilityIdbService: FacilityIdbService,
    private bootstrapService: BootstrapService,
    private dbChangesService: DbChangesService,
    private toastNotificationService: ToastNotificationsService,
    private loadingService: LoadingService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(facilities => {
      this.facilities = facilities.filter(facility => { return facility.companyId == this.company.guid });
    });
  }

  ngOnDestroy() {
    this.facilitiesSub.unsubscribe();
  }

  toggleBS(companyGuid: string) {
    this.bootstrapService.bsCollapse('#' + companyGuid);
    if (this.accordionGuid != companyGuid) {
      this.accordionGuid = companyGuid;
    } else {
      this.accordionGuid = undefined;
    }
  }

  goToCompanyDashboard() {
    this.router.navigateByUrl('/portfolio/company/' + this.company.guid);
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
  }
}
