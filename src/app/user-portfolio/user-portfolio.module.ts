import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPortfolioComponent } from './user-portfolio.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LatestVisitsTableComponent } from './latest-visits-table/latest-visits-table.component';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { PortfolioSummaryCardComponent } from './portfolio-summary-card/portfolio-summary-card.component';
import { PortfolioItemsListComponent } from './portfolio-items-list/portfolio-items-list.component';
import { CompanyListItemComponent } from './portfolio-items-list/company-list-item/company-list-item.component';
import { FacilityListItemComponent } from './portfolio-items-list/facility-list-item/facility-list-item.component';
import { AssessmentListItemComponent } from './portfolio-items-list/assessment-list-item/assessment-list-item.component';
import { TablePaginationModule } from '../shared/table-pagination/table-pagination.module';
import { UserPortfolioHomeComponent } from './user-portfolio-home/user-portfolio-home.component';
import { RouterModule } from '@angular/router';
import { CompanyDashboardComponent } from './company-dashboard/company-dashboard.component';
import { FacilityDashboardComponent } from './facility-dashboard/facility-dashboard.component';
import { AssessmentDashboardComponent } from './assessment-dashboard/assessment-dashboard.component';
import { CompanyDashboardNavComponent } from './company-dashboard/company-dashboard-nav/company-dashboard-nav.component';
import { CompanyDashboardHomeComponent } from './company-dashboard/company-dashboard-home/company-dashboard-home.component';

@NgModule({
  declarations: [
    UserPortfolioComponent,
    LatestVisitsTableComponent,
    PortfolioSummaryCardComponent,
    PortfolioItemsListComponent,
    CompanyListItemComponent,
    FacilityListItemComponent,
    AssessmentListItemComponent,
    UserPortfolioHomeComponent,
    CompanyDashboardComponent,
    FacilityDashboardComponent,
    AssessmentDashboardComponent,
    CompanyDashboardNavComponent,
    CompanyDashboardHomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HelperPipesModule,
    TablePaginationModule,
    RouterModule
    
  ]
})
export class UserPortfolioModule { }
