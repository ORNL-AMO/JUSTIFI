import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight, faBuilding, faFolderTree, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbUser } from 'src/app/models/user';
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

  displayAddCompanyModal: boolean = false;
  constructor(private companyIdbService: CompanyIdbService,
    private bootstrapService: BootstrapService,
    private router: Router,
    private userIdbService: UserIdbService,
    private toastNotificationService: ToastNotificationsService
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

  openAddCompanyModal() {
    this.displayAddCompanyModal = true;
  }

  closeAddCompanyModal() {
    this.displayAddCompanyModal = false;
  }

  async confirmCreate() {
    this.closeAddCompanyModal();
    let user: IdbUser = this.userIdbService.user.getValue();
    let newCompanyGuid: string = await this.companyIdbService.addNewCompany(user.guid)
    let newCompany: IdbCompany = this.companyIdbService.getByGUID(newCompanyGuid);
    this.router.navigateByUrl('/portfolio/company/' + newCompany.guid + '/manage');
    this.toastNotificationService.showToast('New Company Added!', undefined, 'bg-success', true, false);
  }
}
