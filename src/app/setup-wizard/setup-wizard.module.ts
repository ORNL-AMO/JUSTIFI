import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupWizardComponent } from './setup-wizard.component';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanySetupComponent } from './pre-visit/company-setup/company-setup.component';
import { FacilitySetupComponent } from './pre-visit/facility-setup/facility-setup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedSettingsFormsModule } from '../shared/shared-settings-forms/shared-settings-forms.module';
import { HelperPipesModule } from '../shared/helper-pipes/_helper-pipes.module';
import { SetupWizardSidebarComponent } from './setup-wizard-sidebar/setup-wizard-sidebar.component';
import { ReviewPreVisitSetupComponent } from './pre-visit/review-pre-visit-setup/review-pre-visit-setup.component';
import { ReviewOnSiteComponent } from './data-collection/review-on-site/review-on-site.component';
import { CompanyDetailsSummaryComponent } from './pre-visit/review-pre-visit-setup/company-details-summary/company-details-summary.component';
import { TeamDetailsSummaryComponent } from './pre-visit/review-pre-visit-setup/team-details-summary/team-details-summary.component';
import { CompanyKpisSummaryComponent } from './pre-visit/review-pre-visit-setup/company-kpis-summary/company-kpis-summary.component';
import { FacilityDetailsSummaryComponent } from './pre-visit/review-pre-visit-setup/facility-details-summary/facility-details-summary.component';
import { ProcessEquipmentSummaryComponent } from './pre-visit/review-pre-visit-setup/process-equipment-summary/process-equipment-summary.component';
import { PreAssessmentSummaryComponent } from './pre-visit/review-pre-visit-setup/pre-assessment-summary/pre-assessment-summary.component';
import { TableEntriesModule } from '../shared/table-entries/table-entries.module';
import { OnSiteAssessmentComponent } from './data-collection/on-site-assessment/on-site-assessment.component';
import { AssessmentNebsFormComponent } from './data-collection/on-site-assessment/assessment-nebs-form/assessment-nebs-form.component';
import { PreVisitComponent } from './pre-visit/pre-visit.component';
import { DataCollectionComponent } from './data-collection/data-collection.component';
import { DataCollectionManageAssessmentsComponent } from './data-collection/data-collection-manage-assessments/data-collection-manage-assessments.component';
import { DataEvaluationComponent } from './data-evaluation/data-evaluation.component';
import { DataFollowUpComponent } from './data-evaluation/data-follow-up/data-follow-up.component';
import { VisitReportComponent } from './data-evaluation/visit-report/visit-report.component';
import { ReportsModule } from '../shared/reports/reports.module';
import { AssessmentEvaluationComponent } from './data-evaluation/assessment-evaluation/assessment-evaluation.component';
import { OnSiteAssessmentResultsComponent } from './data-collection/on-site-assessment/on-site-assessment-results/on-site-assessment-results.component';
import { PrimaryKpiBadgeModule } from "../shared/primary-kpi-badge/primary-kpi-badge.module";
import { LabelWithTooltipModule } from '../shared/label-with-tooltip/label-with-tooltip.module';
import { KpmDetailsFormModule } from '../shared/kpm-details-form/kpm-details-form.module';
import { SharedAssessmentFormsModule } from '../shared/shared-assessment-forms/shared-assessment-forms.module';
import { SharedCompanyFormsModule } from "../shared/shared-company-forms/shared-company-forms.module";
import { SharedFacilityFormsModule } from '../shared/shared-facility-forms/shared-facility-forms.module';
import { AssessmentEnergyOpportunitiesFormComponent } from './data-collection/on-site-assessment/assessment-energy-opportunities-form/assessment-energy-opportunities-form.component';
import { SystemInventorySummaryComponent } from './pre-visit/review-pre-visit-setup/system-inventory-summary/system-inventory-summary.component';
import { FacilityKpiDetailsComponent } from './pre-visit/facility-kpi-details/facility-kpi-details.component';
import { FacilityKpiSelectComponent } from './pre-visit/facility-kpi-select/facility-kpi-select.component';
import { ManageCompanyContactsComponent } from './pre-visit/company-contacts/manage-company-contacts/manage-company-contacts.component';
import { CompanyContactDetailsFormComponent } from './pre-visit/company-contacts/company-contact-details-form/company-contact-details-form.component';
import { ManageEnergyEquipmentComponent } from './pre-visit/facility-energy-equipment/manage-energy-equipment/manage-energy-equipment.component';
import { FacilityEnergyEquipmentFormComponent } from './pre-visit/facility-energy-equipment/facility-energy-equipment-form/facility-energy-equipment-form.component';
import { ManageProcessEquipmentComponent } from './pre-visit/facility-process-equipment/manage-process-equipment/manage-process-equipment.component';
import { FacilityProcessEquipmentFormComponent } from './pre-visit/facility-process-equipment/facility-process-equipment-form/facility-process-equipment-form.component';
import { ManagePreAssessmentsComponent } from './pre-visit/pre-assessments/manage-pre-assessments/manage-pre-assessments.component';
import { PreAssessmentFormComponent } from './pre-visit/pre-assessments/pre-assessment-form/pre-assessment-form.component';
import { NavItemActivePipe } from './setup-wizard-sidebar/nav-item-active.pipe';
import { AssociatedProcessEquipmentModule } from '../shared/associated-process-equipment/associated-process-equipment.module';
import { AssociatedContactsModule } from '../shared/associated-contacts/associated-contacts.module';
import { AssessmentDiscoveryEquipmentListComponent } from './data-collection/on-site-assessment/assessment-discovery/assessment-discovery-equipment-list/assessment-discovery-equipment-list.component';
import { EnergyEquipmentDiscoveryComponent } from './data-collection/on-site-assessment/assessment-discovery/energy-equipment-discovery/energy-equipment-discovery.component';
import { ProcessEquipmentDiscoveryComponent } from './data-collection/on-site-assessment/assessment-discovery/process-equipment-discovery/process-equipment-discovery.component';
import { FacilityProtocolQuestionsComponent } from './pre-visit/facility-protocol-questions/facility-protocol-questions.component';
import { AssociatedEnergyEquipmentModule } from "../shared/associated-energy-equipment/associated-energy-equipment.module";
import { SetupWizardSidePanelComponent } from './setup-wizard-side-panel/setup-wizard-side-panel.component';
import { SetupWizardHelpContentComponent } from './setup-wizard-side-panel/setup-wizard-help-content/setup-wizard-help-content.component';
import { SetupWizardSidePanelModule } from './setup-wizard-side-panel/setup-wizard-side-panel.module';

@NgModule({
  declarations: [
    SetupWizardComponent,
    CompanySetupComponent,
    FacilitySetupComponent,
    SetupWizardSidebarComponent,
    ReviewPreVisitSetupComponent,
    ReviewOnSiteComponent,
    CompanyDetailsSummaryComponent,
    TeamDetailsSummaryComponent,
    CompanyKpisSummaryComponent,
    FacilityDetailsSummaryComponent,
    ProcessEquipmentSummaryComponent,
    PreAssessmentSummaryComponent,
    OnSiteAssessmentComponent,
    AssessmentNebsFormComponent,
    PreVisitComponent,
    DataCollectionComponent,
    FacilityKpiSelectComponent,
    FacilityKpiDetailsComponent,
    DataCollectionManageAssessmentsComponent,
    DataEvaluationComponent,
    DataFollowUpComponent,
    VisitReportComponent,
    AssessmentEvaluationComponent,
    OnSiteAssessmentResultsComponent,
    AssessmentEnergyOpportunitiesFormComponent,
    SystemInventorySummaryComponent,
    ManageCompanyContactsComponent,
    CompanyContactDetailsFormComponent,
    ManageEnergyEquipmentComponent,
    FacilityEnergyEquipmentFormComponent,
    ManageProcessEquipmentComponent,
    FacilityProcessEquipmentFormComponent,
    ManagePreAssessmentsComponent,
    PreAssessmentFormComponent,
    NavItemActivePipe,
    AssessmentDiscoveryEquipmentListComponent,
    EnergyEquipmentDiscoveryComponent,
    ProcessEquipmentDiscoveryComponent,
    FacilityProtocolQuestionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    SharedSettingsFormsModule,
    HelperPipesModule,
    TableEntriesModule,
    ReportsModule,
    PrimaryKpiBadgeModule,
    ReactiveFormsModule,
    ReportsModule,
    SetupWizardSidePanelModule,
    LabelWithTooltipModule,
    KpmDetailsFormModule,
    SharedAssessmentFormsModule,
    SharedCompanyFormsModule,
    SharedFacilityFormsModule,
    AssociatedContactsModule,
    AssociatedEnergyEquipmentModule,
    AssociatedProcessEquipmentModule
]
})
export class SetupWizardModule { }
