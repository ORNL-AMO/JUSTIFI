import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faBuilding, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css'
})
export class CompanyDashboardComponent {

  faBuilding: IconDefinition = faBuilding;
  company: IdbCompany;
  constructor(private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let guid: string = params['id'];
      this.company = this.companyIdbService.getByGUID(guid);
      this.companyIdbService.selectedCompany.next(this.company);
    });
  }
}
