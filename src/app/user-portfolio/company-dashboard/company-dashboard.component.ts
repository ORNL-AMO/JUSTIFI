import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrl: './company-dashboard.component.css'
})
export class CompanyDashboardComponent {


  constructor(private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      let guid: string = params['id'];
      let company: IdbCompany = this.companyIdbService.getByGUID(guid);
      this.companyIdbService.selectedCompany.next(company);
    });
  }
}
