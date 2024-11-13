import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPortfolioComponent } from './user-portfolio.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LatestVisitsTableComponent } from './latest-visits-table/latest-visits-table.component';
import { HelperPipesModule } from '../shared/helper-pipes/_helper-pipes.module';
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
import { CompanyPerformanceIndicatorsComponent } from './company-dashboard/company-performance-indicators/company-performance-indicators.component';
import { CompanyStakeholdersComponent } from './company-dashboard/company-stakeholders/company-stakeholders.component';
import { CompanyReportsComponent } from './company-dashboard/company-reports/company-reports.component';
import { CompanySettingsComponent } from './company-dashboard/company-settings/company-settings.component';
import { FacilityDashboardNavComponent } from './facility-dashboard/facility-dashboard-nav/facility-dashboard-nav.component';
import { FacilityDashboardHomeComponent } from './facility-dashboard/facility-dashboard-home/facility-dashboard-home.component';
import { IndustrialSystemInventoryComponent } from './facility-dashboard/industrial-system-inventory/industrial-system-inventory.component';
import { EndUseInventoryComponent } from './facility-dashboard/end-use-inventory/end-use-inventory.component';
import { FacilityReportsComponent } from './facility-dashboard/facility-reports/facility-reports.component';
import { FacilitySettingsComponent } from './facility-dashboard/facility-settings/facility-settings.component';
import { AssessmentDashboardHomeComponent } from './assessment-dashboard/assessment-dashboard-home/assessment-dashboard-home.component';
import { AssessmentDashboardNavComponent } from './assessment-dashboard/assessment-dashboard-nav/assessment-dashboard-nav.component';
import { AssessmentReportsComponent } from './assessment-dashboard/assessment-reports/assessment-reports.component';
import { SharedAssessmentFormsModule } from "../shared/shared-assessment-forms/shared-assessment-forms.module";
import { AssessmentDetailsComponent } from './assessment-dashboard/assessment-details/assessment-details.component';
import { AssessmentEnergyOpportunitiesComponent } from './assessment-dashboard/assessment-energy-opportunities/assessment-energy-opportunities.component';
import { ReportsModule } from '../shared/reports/reports.module';
import { SharedCompanyFormsModule } from "../shared/shared-company-forms/shared-company-forms.module";
import { SharedFacilityFormsModule } from '../shared/shared-facility-forms/shared-facility-forms.module';
import { AssessmentEnergyOpportunitiesHomeComponent } from './assessment-dashboard/assessment-energy-opportunities/assessment-energy-opportunities-home/assessment-energy-opportunities-home.component';
import { AssessmentNebsComponent } from './assessment-dashboard/assessment-nebs/assessment-nebs.component';
import { AssessmentNebsHomeComponent } from './assessment-dashboard/assessment-nebs/assessment-nebs-home/assessment-nebs-home.component';
import { ContactModalModule } from '../shared/contact-modal/contact-modal.module';
import { IndustrialSystemInventoryHomeComponent } from './facility-dashboard/industrial-system-inventory/industrial-system-inventory-home/industrial-system-inventory-home.component';
import { EndUseInventoryHomeComponent } from './facility-dashboard/end-use-inventory/end-use-inventory-home/end-use-inventory-home.component';
import { CompanyStakeholdersHomeComponent } from './company-dashboard/company-stakeholders/company-stakeholders-home/company-stakeholders-home.component';

@NgModule({
  declarations: [
    UserPortfolioComponent,
    LatestVisitsTableComponent,
    PortfolioItemsListComponent,
    CompanyListItemComponent,
    FacilityListItemComponent,
    AssessmentListItemComponent,
    UserPortfolioHomeComponent,
    CompanyDashboardComponent,
    FacilityDashboardComponent,
    AssessmentDashboardComponent,
    CompanyDashboardNavComponent,
    CompanyDashboardHomeComponent,
    CompanyPerformanceIndicatorsComponent,
    CompanyStakeholdersComponent,
    CompanyReportsComponent,
    CompanySettingsComponent,
    FacilityDashboardNavComponent,
    FacilityDashboardHomeComponent,
    IndustrialSystemInventoryComponent,
    EndUseInventoryComponent,
    FacilityReportsComponent,
    FacilitySettingsComponent,
    AssessmentDashboardHomeComponent,
    AssessmentDashboardNavComponent,
    AssessmentReportsComponent,
    AssessmentDetailsComponent,
    AssessmentEnergyOpportunitiesComponent,
    AssessmentEnergyOpportunitiesHomeComponent,
    AssessmentNebsComponent,
    AssessmentNebsHomeComponent,
    IndustrialSystemInventoryHomeComponent,
    EndUseInventoryHomeComponent,
    CompanyStakeholdersHomeComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HelperPipesModule,
    TablePaginationModule,
    RouterModule,
    SharedAssessmentFormsModule,
    ReportsModule,
    SharedCompanyFormsModule,
    SharedFacilityFormsModule,
    ContactModalModule
]
})
export class UserPortfolioModule { }
