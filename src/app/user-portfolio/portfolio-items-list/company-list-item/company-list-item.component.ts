import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight, faIndustry, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';

@Component({
    selector: 'app-company-list-item',
    templateUrl: './company-list-item.component.html',
    styleUrl: './company-list-item.component.css',
    standalone: false
})
export class CompanyListItemComponent {
  @Input({ required: true })
  company: IdbCompany;
  @Input()
  inCompanyDashboard: boolean;

  faIndustry: IconDefinition = faIndustry;
  faArrowRight: IconDefinition = faArrowRight;
  faPlus: IconDefinition = faPlus;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;
  accordionGuid: string;
  displayAddFacilityModal: boolean = false;
  showArchivedFacilities: boolean = false;
  constructor(private facilityIdbService: FacilityIdbService,
    private bootstrapService: BootstrapService,
    private router: Router,
    private companyIdbService: CompanyIdbService,
    private toastNotificationService: ToastNotificationsService
  ) {

  }

  ngOnInit() {
    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(facilities => {
      this.facilities = facilities.filter(facility => { 
        const matchesCompany = facility.companyId == this.company.guid;
        const matchesArchivedFilter = this.showArchivedFacilities || !facility.isArchived;
        return matchesCompany && matchesArchivedFilter;
      });
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

  goToFacilityDashboard(facility: IdbFacility) {
    this.router.navigateByUrl('/portfolio/facility/' + facility.guid);
  }

  openAddFacilityModal() {
    this.displayAddFacilityModal = true;
  }

  closeAddFacilityModal() {
    this.displayAddFacilityModal = false;
  }

  async confirmCreate() {
    this.closeAddFacilityModal();
    let company: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    let newFacilityGuid: string = await this.facilityIdbService.addNewFacility(company.userId, company.guid);
    let newFacility: IdbFacility = this.facilityIdbService.getByGUID(newFacilityGuid)
    this.router.navigateByUrl('/portfolio/facility/' + newFacility.guid + '/manage');
    this.toastNotificationService.showToast('New Facility Added!', undefined, 'bg-success', true, false);
  }

  toggleArchivedFacilities() {
    this.showArchivedFacilities = !this.showArchivedFacilities;
    // Manually trigger the filter update
    const allFacilities = this.facilityIdbService.facilities.getValue();
    this.facilities = allFacilities.filter(facility => {
      const matchesCompany = facility.companyId == this.company.guid;
      const matchesArchivedFilter = this.showArchivedFacilities || !facility.isArchived;
      return matchesCompany && matchesArchivedFilter;
    });
  }
}
