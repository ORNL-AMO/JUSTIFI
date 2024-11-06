import { Component, Input } from '@angular/core';
import { faExpand, faIndustry, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
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

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;
  accordionGuid: string;
  constructor(private facilityIdbService: FacilityIdbService,
    private bootstrapService: BootstrapService
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
    // this.localStorageDataService.setNebAccordionGuid(this.accordionGuid);
  }

  goToCompanyDashboard() {

  }

  openDeleteCompanyModal() {

  }
}
