import { Component } from '@angular/core';
import { faBuilding, faCopy, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';

@Component({
    selector: 'app-company-dashboard-home',
    templateUrl: './company-dashboard-home.component.html',
    styleUrl: './company-dashboard-home.component.css',
    standalone: false
})
export class CompanyDashboardHomeComponent {

  faBuilding: IconDefinition = faBuilding;
  faTrash: IconDefinition = faTrash;
  faCopy: IconDefinition = faCopy;
  company: IdbCompany;
  companySub: Subscription;
  constructor(private companyIdbService: CompanyIdbService) {
  }

  ngOnInit() {
    this.companySub = this.companyIdbService.selectedCompany.subscribe(company => {
      this.company = company;
    })
  }

  ngOnDestroy() {
    this.companySub.unsubscribe();
  }

  openCreateCopyModal(){

  }

  openDeleteCompanyModal(){
    
  }
}
