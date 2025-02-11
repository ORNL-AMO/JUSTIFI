import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupWizardHelpPanelComponent } from './setup-wizard-help-panel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanySetupHelpComponent } from './company-setup-help/company-setup-help.component';
import { CompanyContactsHelpComponent } from './company-contacts-help/company-contacts-help.component';
import { CompanyKpiSelectHelpComponent } from './company-kpi-select-help/company-kpi-select-help.component';
import { CompanyKpiDetailHelpComponent } from './company-kpi-detail-help/company-kpi-detail-help.component';
import { FacilitySetupHelpComponent } from './facility-setup-help/facility-setup-help.component';
import { EnergyEquipmentHelpComponent } from './energy-equipment-help/energy-equipment-help.component';
import { EndUsesHelpComponent } from './end-uses-help/end-uses-help.component';
import { PreAssessmentHelpComponent } from './pre-assessment-help/pre-assessment-help.component';
import { ReviewPreVisitHelpComponent } from './review-pre-visit-help/review-pre-visit-help.component';
import { ManageAssessmentsHelpComponent } from './manage-assessments-help/manage-assessments-help.component';
import { AssessmentDetailsHelpComponent } from './assessment-details-help/assessment-details-help.component';
import { EnergyOpportunitiesHelpComponent } from './energy-opportunities-help/energy-opportunities-help.component';
import { AssessmentNebsHelpComponent } from './assessment-nebs-help/assessment-nebs-help.component';
import { AssessmentResultsHelpComponent } from './assessment-results-help/assessment-results-help.component';
import { DataFollowUpHelpComponent } from './data-follow-up-help/data-follow-up-help.component';
import { AssessmentReportHelpComponent } from './assessment-report-help/assessment-report-help.component';
import { RollupReportHelpComponent } from './rollup-report-help/rollup-report-help.component';
import { EnergyEquipmentDiscoveryHelpComponent } from './energy-equipment-discovery-help/energy-equipment-discovery-help.component';
import { ProcessEquipmentDiscoveryHelpComponent } from './process-equipment-discovery-help/process-equipment-discovery-help.component';
import { AssessmentDiscoveryHelpComponent } from './assessment-discovery-help/assessment-discovery-help.component';



@NgModule({
  declarations: [
    SetupWizardHelpPanelComponent,
    CompanySetupHelpComponent,
    CompanyContactsHelpComponent,
    CompanyKpiSelectHelpComponent,
    CompanyKpiDetailHelpComponent,
    FacilitySetupHelpComponent,
    EnergyEquipmentHelpComponent,
    EndUsesHelpComponent,
    PreAssessmentHelpComponent,
    ReviewPreVisitHelpComponent,
    ManageAssessmentsHelpComponent,
    AssessmentDetailsHelpComponent,
    EnergyOpportunitiesHelpComponent,
    AssessmentNebsHelpComponent,
    AssessmentResultsHelpComponent,
    DataFollowUpHelpComponent,
    AssessmentReportHelpComponent,
    RollupReportHelpComponent,
    EnergyEquipmentDiscoveryHelpComponent,
    ProcessEquipmentDiscoveryHelpComponent,
    AssessmentDiscoveryHelpComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    SetupWizardHelpPanelComponent
  ]
})
export class SetupWizardHelpPanelModule { }
