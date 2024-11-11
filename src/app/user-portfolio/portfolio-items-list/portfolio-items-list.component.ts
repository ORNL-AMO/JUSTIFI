import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight, faBuilding, faFolderTree, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';

@Component({
  selector: 'app-portfolio-items-list',
  templateUrl: './portfolio-items-list.component.html',
  styleUrl: './portfolio-items-list.component.css'
})
export class PortfolioItemsListComponent {

  faFolderTree: IconDefinition = faFolderTree;
  faBuilding: IconDefinition = faBuilding;
  faPlus: IconDefinition = faPlus;
  faArrowRight: IconDefinition = faArrowRight;

  companies: Array<IdbCompany>
  companiesSub: Subscription
  accordionGuid: string;
  constructor(private companyIdbService: CompanyIdbService,
    private bootstrapService: BootstrapService,
    private router: Router
  ) { }

  ngOnInit() {
    this.companiesSub = this.companyIdbService.companies.subscribe(companies => {
      this.companies = companies;
    });
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
  }

  toggleBS(companyGuid: string) {
    this.bootstrapService.bsCollapse('#' + companyGuid);
    if (this.accordionGuid != companyGuid) {
      this.accordionGuid = companyGuid;
    } else {
      this.accordionGuid = undefined;
    }
  }

  goToCompanyDashboard(company: IdbCompany) {
    this.router.navigateByUrl('/portfolio/company/' + company.guid);
  }
}
