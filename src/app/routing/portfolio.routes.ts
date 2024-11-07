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
                    component: CompanySettingsComponent
                }
            ]
        },
        {
            path: 'facility/:id',
            component: FacilityDashboardComponent
        },
        {
            path: 'assessment/:id',
            component: AssessmentDashboardComponent
        }
    ]
};