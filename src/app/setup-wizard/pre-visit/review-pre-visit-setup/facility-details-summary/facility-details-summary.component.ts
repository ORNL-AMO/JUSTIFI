import { Component } from '@angular/core';
import { IconDefinition, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';

@Component({
    selector: 'app-facility-details-summary',
    templateUrl: './facility-details-summary.component.html',
    styleUrl: './facility-details-summary.component.css',
    standalone: false
})
export class FacilityDetailsSummaryComponent {

  facility: IdbFacility;
  faIndustry: IconDefinition = faIndustry;
  companyEnergyUnit: string;
  currencyCode: string;
  currencySub: Subscription;

  constructor(private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService,
    private localeService: LocaleService,
  ){

  }

  ngOnInit(){
    this.facility = this.facilityIdbService.selectedFacility.getValue();
    let company: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    this.companyEnergyUnit = company.companyEnergyUnit;
    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy(){
    this.currencySub.unsubscribe();
  }
}
