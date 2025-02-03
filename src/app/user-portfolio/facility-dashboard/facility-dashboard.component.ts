import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';

@Component({
    selector: 'app-facility-dashboard',
    templateUrl: './facility-dashboard.component.html',
    styleUrl: './facility-dashboard.component.css',
    standalone: false
})
export class FacilityDashboardComponent {

  constructor(private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let guid: string = params['id'];
      let facility: IdbFacility = this.facilityIdbService.getByGUID(guid);
      this.facilityIdbService.selectedFacility.next(facility);
      let company: IdbCompany = this.companyIdbService.getByGUID(facility.companyId);
      this.companyIdbService.selectedCompany.next(company);
    });
  }
}
