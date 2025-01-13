import { Route } from "@angular/router";
import { SetupWizardComponent } from "../setup-wizard/setup-wizard.component";
import { PreVisitComponent } from "../setup-wizard/pre-visit/pre-visit.component";
import { CompanySetupComponent } from "../setup-wizard/pre-visit/company-setup/company-setup.component";
import { CanDeactivateGuard } from "../guards/can-deactivate.guard";
import { FacilitySetupComponent } from "../setup-wizard/pre-visit/facility-setup/facility-setup.component";
import { FacilityEnergyEquipmentSetupComponent } from "../setup-wizard/pre-visit/facility-energy-equipment-setup/facility-energy-equipment-setup.component";
import { FacilityProcessEquipmentSetupComponent } from "../setup-wizard/pre-visit/facility-process-equipment-setup/facility-process-equipment-setup.component";
import { PreAssessmentSetupComponent } from "../setup-wizard/pre-visit/pre-assessment-setup/pre-assessment-setup.component";
import { ReviewPreVisitSetupComponent } from "../setup-wizard/pre-visit/review-pre-visit-setup/review-pre-visit-setup.component";
import { DataCollectionComponent } from "../setup-wizard/data-collection/data-collection.component";
import { DataCollectionManageAssessmentsComponent } from "../setup-wizard/data-collection/data-collection-manage-assessments/data-collection-manage-assessments.component";
import { OnSiteAssessmentComponent } from "../setup-wizard/data-collection/on-site-assessment/on-site-assessment.component";
import { AssessmentNebsFormComponent } from "../setup-wizard/data-collection/on-site-assessment/assessment-nebs-form/assessment-nebs-form.component";
import { OnSiteAssessmentResultsComponent } from "../setup-wizard/data-collection/on-site-assessment/on-site-assessment-results/on-site-assessment-results.component";
import { ReviewOnSiteComponent } from "../setup-wizard/data-collection/review-on-site/review-on-site.component";
import { DataEvaluationComponent } from "../setup-wizard/data-evaluation/data-evaluation.component";
import { DataFollowUpComponent } from "../setup-wizard/data-evaluation/data-follow-up/data-follow-up.component";
import { AssessmentEvaluationComponent } from "../setup-wizard/data-evaluation/assessment-evaluation/assessment-evaluation.component";
import { VisitReportComponent } from "../setup-wizard/data-evaluation/visit-report/visit-report.component";
import { AssessmentDetailsFormComponent } from "../shared/shared-assessment-forms/assessment-details-form/assessment-details-form.component";
import { AssessmentEnergyOpportunitiesFormComponent } from "../setup-wizard/data-collection/on-site-assessment/assessment-energy-opportunities-form/assessment-energy-opportunities-form.component";
import { FacilityKpiSelectComponent } from "../setup-wizard/pre-visit/facility-kpi-select/facility-kpi-select.component";
import { FacilityKpiDetailsComponent } from "../setup-wizard/pre-visit/facility-kpi-details/facility-kpi-details.component";
import { ManageCompanyContactsComponent } from "../setup-wizard/pre-visit/company-contacts/manage-company-contacts/manage-company-contacts.component";
import { CompanyContactDetailsFormComponent } from "../setup-wizard/pre-visit/company-contacts/company-contact-details-form/company-contact-details-form.component";
import { ManageEnergyEquipmentComponent } from "../setup-wizard/pre-visit/facility-energy-equipment/manage-energy-equipment/manage-energy-equipment.component";
import { FacilityEnergyEquipmentFormComponent } from "../setup-wizard/pre-visit/facility-energy-equipment/facility-energy-equipment-form/facility-energy-equipment-form.component";


export const SetupWizardRoutes: Route = {
    path: 'setup-wizard',
    component: SetupWizardComponent,
    children: [
        {
            path: 'pre-visit/:id',
            component: PreVisitComponent,
            children: [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'company-setup'
                },
                {
                    path: 'company-setup',
                    component: CompanySetupComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
                {
                    path: 'kpi-select',
                    component: FacilityKpiSelectComponent
                },
                {
                    path: 'kpi-detail/:id',
                    component: FacilityKpiDetailsComponent
                },
                {
                    path: 'company-contacts',
                    component: ManageCompanyContactsComponent,
                    // canDeactivate: [CanDeactivateGuard]
                },
                {
                    path: 'company-contacts/:id',
                    component: CompanyContactDetailsFormComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
                {
                    path: 'facility-setup',
                    component: FacilitySetupComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
                {
                    path: 'energy-equipment',
                    component: ManageEnergyEquipmentComponent
                },
                {
                    path: 'energy-equipment/:id',
                    component: FacilityEnergyEquipmentFormComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
                {
                    path: 'end-uses',
                    component: FacilityProcessEquipmentSetupComponent
                },
                {
                    path: 'pre-assessment',
                    component: PreAssessmentSetupComponent
                },
                {
                    path: 'review-pre-visit',
                    component: ReviewPreVisitSetupComponent
                }
            ]
        },
        {
            path: 'data-collection/:id',
            component: DataCollectionComponent,
            children: [
                {
                    path: 'manage-assessments',
                    component: DataCollectionManageAssessmentsComponent
                },
                {
                    path: 'assessment/:id',
                    component: OnSiteAssessmentComponent,
                    children: [
                        {
                            path: '',
                            pathMatch: 'full',
                            redirectTo: 'details'
                        },
                        {
                            path: 'details',
                            component: AssessmentDetailsFormComponent
                        },
                        {
                            path: 'energy-opportunities',
                            component: AssessmentEnergyOpportunitiesFormComponent
                        },
                        {
                            path: 'nebs',
                            component: AssessmentNebsFormComponent
                        },
                        {
                            path: 'results',
                            component: OnSiteAssessmentResultsComponent
                        }
                    ]
                },
                {
                    path: 'review-data-collection',
                    component: ReviewOnSiteComponent
                },
            ]
        },
        {
            path: 'data-evaluation/:id',
            component: DataEvaluationComponent,
            children: [
                {
                    path: '',
                    pathMatch: 'full',
                    redirectTo: 'follow-up'
                },
                {
                    path: 'follow-up',
                    component: DataFollowUpComponent
                },
                {
                    path: 'assessment-report/:id',
                    component: AssessmentEvaluationComponent,
                },
                {
                    path: 'visit-report',
                    component: VisitReportComponent,
                }
            ]
        }
    ]
}