import { Route } from "@angular/router";
import { UserPortfolioComponent } from "../user-portfolio/user-portfolio.component";
import { UserPortfolioHomeComponent } from "../user-portfolio/user-portfolio-home/user-portfolio-home.component";
import { CompanyDashboardComponent } from "../user-portfolio/company-dashboard/company-dashboard.component";
import { CompanyDashboardHomeComponent } from "../user-portfolio/company-dashboard/company-dashboard-home/company-dashboard-home.component";
import { FacilityDashboardComponent } from "../user-portfolio/facility-dashboard/facility-dashboard.component";
import { AssessmentDashboardComponent } from "../user-portfolio/assessment-dashboard/assessment-dashboard.component";
import { CompanyStakeholdersComponent } from "../user-portfolio/company-dashboard/company-stakeholders/company-stakeholders.component";
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
import { KpiSearchFormComponent } from "../shared/shared-facility-forms/kpi-search-form/kpi-search-form.component";
import { KpiDetailsFormComponent } from "../shared/shared-facility-forms/kpi-details-form/kpi-details-form.component";
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
import { FacilityPerformanceIndicatorsComponent } from "../user-portfolio/facility-dashboard/facility-performance-indicators/facility-performance-indicators.component";
import { FacilityDashboardProtocolQuestionsComponent } from "../user-portfolio/facility-dashboard/facility-dashboard-protocol-questions/facility-dashboard-protocol-questions.component";
import { FacilityReportsHomeComponent } from "../user-portfolio/facility-dashboard/facility-reports/facility-reports-home/facility-reports-home.component";
import { FacilityReportComponent } from "../user-portfolio/facility-dashboard/facility-reports/facility-report/facility-report.component";
import { CustomReportOptionsComponent } from "../shared/reports/custom-reports/custom-report-options/custom-report-options.component";
import { CustomReportComponent } from "../shared/reports/custom-reports/custom-report/custom-report.component";
import { ManageOnSiteVisitsComponent } from "../user-portfolio/facility-dashboard/manage-on-site-visits/manage-on-site-visits.component";


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
                    path: 'performance-indicators',
                    component: FacilityPerformanceIndicatorsComponent,
                    children: [
                        {
                            path: '',
                            component: KpiSearchFormComponent
                        },
                        {
                            path: 'details/:id',
                            component: KpiDetailsFormComponent
                        }
                    ]
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
                    path: 'questions',
                    component: FacilityDashboardProtocolQuestionsComponent
                },
                {
                    path: 'reports',
                    component: FacilityReportsComponent,
                    children: [
                        {
                            path: '',
                            component: FacilityReportsHomeComponent
                        },
                        {
                            path: ':id',
                            component: FacilityReportComponent,
                            children: [
                                {
                                    path: '',
                                    pathMatch: 'full',
                                    redirectTo: 'options'
                                },
                                {
                                    path: 'options',
                                    component: CustomReportOptionsComponent
                                },
                                {
                                    path: 'results',
                                    component: CustomReportComponent
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'manage',
                    component: FacilitySettingsComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
                {
                    path: 'manage-visits',
                    component: ManageOnSiteVisitsComponent
                }
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