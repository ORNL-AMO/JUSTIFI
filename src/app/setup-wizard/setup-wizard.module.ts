import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupWizardComponent } from './setup-wizard.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanySetupComponent } from './pre-visit/company-setup/company-setup.component';
import { FacilitySetupComponent } from './pre-visit/facility-setup/facility-setup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedSettingsFormsModule } from '../shared/shared-settings-forms/shared-settings-forms.module';
import { HelperPipesModule } from '../shared/helper-pipes/helper-pipes.module';
import { SetupWizardSidebarComponent } from './setup-wizard-sidebar/setup-wizard-sidebar.component';
import { CompanyContactsSetupComponent } from './pre-visit/company-contacts-setup/company-contacts-setup.component';
import { FacilityProcessEquipmentSetupComponent } from './pre-visit/facility-process-equipment-setup/facility-process-equipment-setup.component';
import { PreAssessmentSetupComponent } from './pre-visit/pre-assessment-setup/pre-assessment-setup.component';
import { ReviewPreVisitSetupComponent } from './pre-visit/review-pre-visit-setup/review-pre-visit-setup.component';
import { ContactModalModule } from '../shared/contact-modal/contact-modal.module';
import { ReviewOnSiteComponent } from './data-collection/review-on-site/review-on-site.component';
import { CompanyDetailsSummaryComponent } from './pre-visit/review-pre-visit-setup/company-details-summary/company-details-summary.component';
import { TeamDetailsSummaryComponent } from './pre-visit/review-pre-visit-setup/team-details-summary/team-details-summary.component';
import { ContactSummaryCardComponent } from './pre-visit/review-pre-visit-setup/team-details-summary/contact-summary-card/contact-summary-card.component';
import { CompanyKpisSummaryComponent } from './pre-visit/review-pre-visit-setup/company-kpis-summary/company-kpis-summary.component';
import { FacilityDetailsSummaryComponent } from './pre-visit/review-pre-visit-setup/facility-details-summary/facility-details-summary.component';
import { ProcessEquipmentSummaryComponent } from './pre-visit/review-pre-visit-setup/process-equipment-summary/process-equipment-summary.component';
import { PreAssessmentSummaryComponent } from './pre-visit/review-pre-visit-setup/pre-assessment-summary/pre-assessment-summary.component';
import { TableEntriesModule } from '../shared/table-entries/table-entries.module';
import { OnSiteAssessmentComponent } from './data-collection/on-site-assessment/on-site-assessment.component';
import { AssessmentNebsFormComponent } from './data-collection/on-site-assessment/assessment-nebs-form/assessment-nebs-form.component';
import { PreVisitComponent } from './pre-visit/pre-visit.component';
import { DataCollectionComponent } from './data-collection/data-collection.component';
import { CompanyKpiSelectComponent } from './pre-visit/company-kpi-select/company-kpi-select.component';
import { CompanyKpiDetailsComponent } from './pre-visit/company-kpi-details/company-kpi-details.component';
import { DataCollectionManageAssessmentsComponent } from './data-collection/data-collection-manage-assessments/data-collection-manage-assessments.component';
import { DataEvaluationComponent } from './data-evaluation/data-evaluation.component';
import { DataFollowUpComponent } from './data-evaluation/data-follow-up/data-follow-up.component';
import { VisitReportComponent } from './data-evaluation/visit-report/visit-report.component';
import { ReportsModule } from '../shared/reports/reports.module';
import { AssessmentEvaluationComponent } from './data-evaluation/assessment-evaluation/assessment-evaluation.component';
import { OnSiteAssessmentResultsComponent } from './data-collection/on-site-assessment/on-site-assessment-results/on-site-assessment-results.component';
import { ProcessEquipmentFormComponent } from './pre-visit/facility-process-equipment-setup/process-equipment-form/process-equipment-form.component';
import { FacilityEnergyEquipmentSetupComponent } from './pre-visit/facility-energy-equipment-setup/facility-energy-equipment-setup.component';
import { PrimaryKpiBadgeModule } from "../shared/primary-kpi-badge/primary-kpi-badge.module";
import { EnergyOpportunityNebsTableComponent } from './data-collection/on-site-assessment/assessment-nebs-form/energy-opportunity-nebs-table/energy-opportunity-nebs-table.component';
import { EnergyOpportunityNebsListPipe } from './data-collection/on-site-assessment/assessment-nebs-form/energy-opportunity-nebs-table/energy-opportunity-nebs-list.pipe';
import { SetupWizardHelpPanelModule } from './setup-wizard-help-panel/setup-wizard-help-panel.module';
import { LabelWithTooltipModule } from '../shared/label-with-tooltip/label-with-tooltip.module';
import { KpmDetailsFormModule } from '../shared/kpm-details-form/kpm-details-form.module';
import { SharedAssessmentFormsModule } from '../shared/shared-assessment-forms/shared-assessment-forms.module';
import { SharedCompanyFormsModule } from "../shared/shared-company-forms/shared-company-forms.module";
import { SharedFacilityFormsModule } from '../shared/shared-facility-forms/shared-facility-forms.module';
import { AssessmentEnergyOpportunitiesFormComponent } from './data-collection/on-site-assessment/assessment-energy-opportunities-form/assessment-energy-opportunities-form.component';

@NgModule({
  declarations: [
    SetupWizardComponent,
    CompanySetupComponent,
    FacilitySetupComponent,
    SetupWizardSidebarComponent,
    CompanyContactsSetupComponent,
    FacilityProcessEquipmentSetupComponent,
    PreAssessmentSetupComponent,
    ReviewPreVisitSetupComponent,
    ReviewOnSiteComponent,
    CompanyDetailsSummaryComponent,
    TeamDetailsSummaryComponent,
    ContactSummaryCardComponent,
    CompanyKpisSummaryComponent,
    FacilityDetailsSummaryComponent,
    ProcessEquipmentSummaryComponent,
    PreAssessmentSummaryComponent,
    OnSiteAssessmentComponent,
    AssessmentNebsFormComponent,
    PreVisitComponent,
    DataCollectionComponent,
    CompanyKpiSelectComponent,
    CompanyKpiDetailsComponent,
    DataCollectionManageAssessmentsComponent,
    DataEvaluationComponent,
    DataFollowUpComponent,
    VisitReportComponent,
    AssessmentEvaluationComponent,
    OnSiteAssessmentResultsComponent,
    ProcessEquipmentFormComponent,
    FacilityEnergyEquipmentSetupComponent,
    EnergyOpportunityNebsTableComponent,
    EnergyOpportunityNebsListPipe,
    AssessmentEnergyOpportunitiesFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    SharedSettingsFormsModule,
    HelperPipesModule,
    ContactModalModule,
    TableEntriesModule,
    ReportsModule,
    PrimaryKpiBadgeModule,
    ReactiveFormsModule,
    ReportsModule,
    SetupWizardHelpPanelModule,
    LabelWithTooltipModule,
    KpmDetailsFormModule,
    SharedAssessmentFormsModule,
    SharedCompanyFormsModule,
    SharedFacilityFormsModule
]
})
export class SetupWizardModule { }
