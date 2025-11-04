import { Route } from "@angular/router";
import { SetupWizardComponent } from "../setup-wizard/setup-wizard.component";
import { PreVisitComponent } from "../setup-wizard/pre-visit/pre-visit.component";
import { CompanySetupComponent } from "../setup-wizard/pre-visit/company-setup/company-setup.component";
import { CanDeactivateGuard } from "../guards/can-deactivate.guard";
import { FacilitySetupComponent } from "../setup-wizard/pre-visit/facility-setup/facility-setup.component";
import { ReviewPreVisitSetupComponent } from "../setup-wizard/pre-visit/review-pre-visit-setup/review-pre-visit-setup.component";
import { DataCollectionComponent } from "../setup-wizard/data-collection/data-collection.component";
import { DataCollectionManageAssessmentsComponent } from "../setup-wizard/data-collection/data-collection-manage-assessments/data-collection-manage-assessments.component";
import { OnSiteAssessmentComponent } from "../setup-wizard/data-collection/on-site-assessment/on-site-assessment.component";
import { AssessmentNebsFormComponent } from "../setup-wizard/data-collection/on-site-assessment/assessment-nebs-form/assessment-nebs-form.component";
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
import { ManageProcessEquipmentComponent } from "../setup-wizard/pre-visit/facility-process-equipment/manage-process-equipment/manage-process-equipment.component";
import { FacilityProcessEquipmentFormComponent } from "../setup-wizard/pre-visit/facility-process-equipment/facility-process-equipment-form/facility-process-equipment-form.component";
import { PreAssessmentFormComponent } from "../setup-wizard/pre-visit/pre-assessments/pre-assessment-form/pre-assessment-form.component";
import { ManagePreAssessmentsComponent } from "../setup-wizard/pre-visit/pre-assessments/manage-pre-assessments/manage-pre-assessments.component";
import { FacilityProtocolQuestionsComponent } from "../setup-wizard/pre-visit/facility-protocol-questions/facility-protocol-questions.component";
import { DataEvaluationManageReportsComponent } from "../setup-wizard/data-evaluation/data-evaluation-manage-reports/data-evaluation-manage-reports.component";
import { DataEvaluationCustomReportComponent } from "../setup-wizard/data-evaluation/data-evaluation-custom-report/data-evaluation-custom-report.component";
import { CustomReportOptionsComponent } from "../shared/reports/custom-reports/custom-report-options/custom-report-options.component";
import { CustomReportComponent } from "../shared/reports/custom-reports/custom-report/custom-report.component";
import { ExecutiveSummaryEvaluationComponent } from "../setup-wizard/data-evaluation/executive-summary-evaluation/executive-summary-evaluation.component";
import { StakeholderEvaluationComponent } from "../setup-wizard/data-evaluation/stakeholder-evaluation/stakeholder-evaluation.component";
import { UploadTemplateComponent } from "../setup-wizard/upload-template/upload-template.component";


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
                    path: 'facility-kpi-select',
                    component: FacilityKpiSelectComponent
                },
                {
                    path: 'facility-kpi-detail/:id',
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
                    path: 'facility-questions',
                    component: FacilityProtocolQuestionsComponent
                },
                {
                    path: 'facility-energy-equipment',
                    component: ManageEnergyEquipmentComponent
                },
                {
                    path: 'facility-energy-equipment/:id',
                    component: FacilityEnergyEquipmentFormComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
                {
                    path: 'facility-end-uses',
                    component: ManageProcessEquipmentComponent
                },
                {
                    path: 'facility-end-uses/:id',
                    component: FacilityProcessEquipmentFormComponent,
                    canDeactivate: [CanDeactivateGuard]
                },
                {
                    path: 'facility-pre-assessment',
                    component: ManagePreAssessmentsComponent
                },
                {
                    path: 'facility-pre-assessment/:id',
                    component: PreAssessmentFormComponent,
                    canDeactivate: [CanDeactivateGuard]
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
                },
                {
                    path: 'stakeholder-report',
                    component: StakeholderEvaluationComponent,
                },
                {
                    path: 'executive-summary',
                    component: ExecutiveSummaryEvaluationComponent,
                },
                {
                    path: 'custom-report',
                    component: DataEvaluationManageReportsComponent,
                },
                {
                    path: 'custom-report/:id',
                    component: DataEvaluationCustomReportComponent,
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
            path: 'upload-template/:id',
            component: UploadTemplateComponent
        }
    ]
}