import { Route } from "@angular/router";
import { UserPortfolioComponent } from "../user-portfolio/user-portfolio.component";
import { UserPortfolioHomeComponent } from "../user-portfolio/user-portfolio-home/user-portfolio-home.component";
import { CompanyDashboardComponent } from "../user-portfolio/company-dashboard/company-dashboard.component";
import { CompanyDashboardHomeComponent } from "../user-portfolio/company-dashboard/company-dashboard-home/company-dashboard-home.component";
import { FacilityDashboardComponent } from "../user-portfolio/facility-dashboard/facility-dashboard.component";
import { AssessmentDashboardComponent } from "../user-portfolio/assessment-dashboard/assessment-dashboard.component";
import { CompanyPerformanceIndicatorsComponent } from "../user-portfolio/company-dashboard/company-performance-indicators/company-performance-indicators.component";
import { CompanyStakeholdersComponent } from "../user-portfolio/company-dashboard/company-stakeholders/company-stakeholders.component";
import { CompanyReportsComponent } from "../user-portfolio/company-dashboard/company-reports/company-reports.component";
import { CompanySettingsComponent } from "../user-portfolio/company-dashboard/company-settings/company-settings.component";
import { FacilityDashboardHomeComponent } from "../user-portfolio/facility-dashboard/facility-dashboard-home/facility-dashboard-home.component";
import { IndustrialSystemInventoryComponent } from "../user-portfolio/facility-dashboard/industrial-system-inventory/industrial-system-inventory.component";
import { EndUseInventoryComponent } from "../user-portfolio/facility-dashboard/end-use-inventory/end-use-inventory.component";
import { FacilityReportsComponent } from "../user-portfolio/facility-dashboard/facility-reports/facility-reports.component";
import { FacilitySettingsComponent } from "../user-portfolio/facility-dashboard/facility-settings/facility-settings.component";
import { AssessmentDashboardHomeComponent } from "../user-portfolio/assessment-dashboard/assessment-dashboard-home/assessment-dashboard-home.component";
import { AssessmentSettingsComponent } from "../user-portfolio/assessment-dashboard/assessment-settings/assessment-settings.component";
import { AssessmentReportsComponent } from "../user-portfolio/assessment-dashboard/assessment-reports/assessment-reports.component";
import { AssessmentDetailsComponent } from "../user-portfolio/assessment-dashboard/assessment-details/assessment-details.component";
import { AssessmentEnergyOpportunitiesComponent } from "../user-portfolio/assessment-dashboard/assessment-energy-opportunities/assessment-energy-opportunities.component";
import { CanDeactivateGuard } from "../guards/can-deactivate.guard";


export const PortfolioRoutes: Route = {
    path: 'portfolio',
    component: UserPortfolioComponent,
    children: [
        {
            path: '',
            component: UserPortfolioHomeComponent
        },
        {
            path: 'company/:id',
            component: CompanyDashboardComponent,
            children: [
                {
                    path: '',
                    component: CompanyDashboardHomeComponent
                },
                {
                    path: 'performance-metrics',
                    component: CompanyPerformanceIndicatorsComponent
                },
                {
                    path: 'stakeholders',
                    component: CompanyStakeholdersComponent
                },
                {
                    path: 'reports',
                    component: CompanyReportsComponent
                },
                {
                    path: 'manage',
                    component: CompanySettingsComponent,
                    canDeactivate: [CanDeactivateGuard]
                }
            ]
        },
        {
            path: 'facility/:id',
            component: FacilityDashboardComponent,
            children: [
                {
                    path: '',
                    component: FacilityDashboardHomeComponent
                },
                {
                    path: 'system-inventory',
                    component: IndustrialSystemInventoryComponent
                },
                {
                    path: 'end-use-inventory',
                    component: EndUseInventoryComponent
                },
                {
                    path: 'reports',
                    component: FacilityReportsComponent
                },
                {
                    path: 'manage',
                    component: FacilitySettingsComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
            ]
        },
        {
            path: 'assessment/:id',
            component: AssessmentDashboardComponent,
            children: [
                {
                    path: '',
                    component: AssessmentDashboardHomeComponent
                },
                {
                    path: 'details',
                    component: AssessmentDetailsComponent
                },
                {
                    path: 'manage',
                    component: AssessmentSettingsComponent
                },
                {
                    path: 'energy-opportunities',
                    component: AssessmentEnergyOpportunitiesComponent
                },
                {
                    path: 'reports',
                    component: AssessmentReportsComponent
                },
            ]
        }
    ]
};