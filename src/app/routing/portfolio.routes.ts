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
import { AssessmentReportsComponent } from "../user-portfolio/assessment-dashboard/assessment-reports/assessment-reports.component";
import { AssessmentDetailsComponent } from "../user-portfolio/assessment-dashboard/assessment-details/assessment-details.component";
import { AssessmentEnergyOpportunitiesComponent } from "../user-portfolio/assessment-dashboard/assessment-energy-opportunities/assessment-energy-opportunities.component";
import { CanDeactivateGuard } from "../guards/can-deactivate.guard";
import { CompanyKpiSearchFormComponent } from "../shared/shared-company-forms/company-kpi-search-form/company-kpi-search-form.component";
import { CompanyKpiDetailsFormComponent } from "../shared/shared-company-forms/company-kpi-details-form/company-kpi-details-form.component";
import { AssessmentEnergyOpportunitiesHomeComponent } from "../user-portfolio/assessment-dashboard/assessment-energy-opportunities/assessment-energy-opportunities-home/assessment-energy-opportunities-home.component";
import { EnergyOpportunitySetupFormComponent } from "../shared/shared-assessment-forms/energy-opportunity-setup-form/energy-opportunity-setup-form.component";
import { AssessmentNebsComponent } from "../user-portfolio/assessment-dashboard/assessment-nebs/assessment-nebs.component";
import { AssessmentNebsHomeComponent } from "../user-portfolio/assessment-dashboard/assessment-nebs/assessment-nebs-home/assessment-nebs-home.component";
import { NebSetupFormComponent } from "../shared/shared-assessment-forms/neb-forms-accordion/neb-setup-form/neb-setup-form.component";
import { IndustrialSystemInventoryHomeComponent } from "../user-portfolio/facility-dashboard/industrial-system-inventory/industrial-system-inventory-home/industrial-system-inventory-home.component";
import { EnergyEquipmentFormComponent } from "../shared/shared-facility-forms/energy-equipment-form/energy-equipment-form.component";
import { EndUseInventoryHomeComponent } from "../user-portfolio/facility-dashboard/end-use-inventory/end-use-inventory-home/end-use-inventory-home.component";
import { ProcessEquipmentFormComponent } from "../shared/shared-facility-forms/process-equipment-form/process-equipment-form.component";
import { CompanyStakeholdersHomeComponent } from "../user-portfolio/company-dashboard/company-stakeholders/company-stakeholders-home/company-stakeholders-home.component";
import { CompanyContactsFormComponent } from "../shared/shared-company-forms/company-contacts-form/company-contacts-form.component";


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
                    path: 'performance-indicators',
                    component: CompanyPerformanceIndicatorsComponent,
                    children: [
                        {
                            path: '',
                            component: CompanyKpiSearchFormComponent
                        },
                        {
                            path: 'details/:id',
                            component: CompanyKpiDetailsFormComponent
                        }
                    ]
                },
                {
                    path: 'stakeholders',
                    component: CompanyStakeholdersComponent,
                    children: [
                        {
                            path: '',
                            component: CompanyStakeholdersHomeComponent
                        },
                        {
                            path: ':id',
                            component: CompanyContactsFormComponent,
                            canDeactivate: [CanDeactivateGuard]
                        }
                    ]
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
                    component: IndustrialSystemInventoryComponent,
                    children: [
                        {
                            path: '',
                            component: IndustrialSystemInventoryHomeComponent
                        },
                        {
                            path: ':id',
                            component: EnergyEquipmentFormComponent
                        }
                    ]
                },
                {
                    path: 'end-use-inventory',
                    component: EndUseInventoryComponent,
                    children: [
                        {
                            path: '',
                            component: EndUseInventoryHomeComponent
                        },
                        {
                            path: ':id',
                            component: ProcessEquipmentFormComponent
                        }
                    ]
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
                    path: 'energy-opportunities',
                    component: AssessmentEnergyOpportunitiesComponent,
                    children: [
                        {
                            path: '',
                            component: AssessmentEnergyOpportunitiesHomeComponent
                        },
                        {
                            path: ':id',
                            component: EnergyOpportunitySetupFormComponent
                        }
                    ]
                },
                {
                    path: 'reports',
                    component: AssessmentReportsComponent
                },
                {
                    path: 'nebs',
                    component: AssessmentNebsComponent,
                    children: [
                        {
                            path: '',
                            component: AssessmentNebsHomeComponent
                        },
                        {
                            path: ':id',
                            component: NebSetupFormComponent
                        }
                    ]
                }
            ]
        }
    ]
};