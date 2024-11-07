import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faIndustry, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-dashboard',
  templateUrl: './facility-dashboard.component.html',
  styleUrl: './facility-dashboard.component.css'
})
export class FacilityDashboardComponent {
  faIndustry: IconDefinition = faIndustry;
  facility: IdbFacility;
  constructor(private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let guid: string = params['id'];
      this.facility = this.facilityIdbService.getByGUID(guid);
      this.facilityIdbService.selectedFacility.next(this.facility);
      let company: IdbCompany = this.companyIdbService.getByGUID(this.facility.companyId);
      this.companyIdbService.selectedCompany.next(company);
    });
  }
}
