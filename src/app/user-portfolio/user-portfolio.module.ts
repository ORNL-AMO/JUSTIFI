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

@NgModule({
  declarations: [
    UserPortfolioComponent,
    LatestVisitsTableComponent,
    PortfolioSummaryCardComponent,
    PortfolioItemsListComponent,
    CompanyListItemComponent,
    FacilityListItemComponent,
    AssessmentListItemComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HelperPipesModule
  ]
})
export class UserPortfolioModule { }
