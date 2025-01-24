import { Component } from '@angular/core';
import { IconDefinition, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-facility-details-summary',
  templateUrl: './facility-details-summary.component.html',
  styleUrl: './facility-details-summary.component.css'
})
export class FacilityDetailsSummaryComponent {

  facility: IdbFacility;
  faIndustry: IconDefinition = faIndustry;
  companyEnergyUnit: string;
  constructor(private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService
  ){

  }

  ngOnInit(){
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    let company: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    this.companyEnergyUnit = company.companyEnergyUnit;
  }
}
