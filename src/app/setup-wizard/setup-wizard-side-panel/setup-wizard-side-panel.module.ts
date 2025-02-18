import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CompanySetupHelpComponent } from './setup-wizard-help-content/company-setup-help/company-setup-help.component';
import { CompanyContactsHelpComponent } from './setup-wizard-help-content/company-contacts-help/company-contacts-help.component';
import { CompanyKpiSelectHelpComponent } from './setup-wizard-help-content/company-kpi-select-help/company-kpi-select-help.component';
import { CompanyKpiDetailHelpComponent } from './setup-wizard-help-content/company-kpi-detail-help/company-kpi-detail-help.component';
import { FacilitySetupHelpComponent } from './setup-wizard-help-content/facility-setup-help/facility-setup-help.component';
import { EnergyEquipmentHelpComponent } from './setup-wizard-help-content/energy-equipment-help/energy-equipment-help.component';
import { EndUsesHelpComponent } from './setup-wizard-help-content/end-uses-help/end-uses-help.component';
import { PreAssessmentHelpComponent } from './setup-wizard-help-content/pre-assessment-help/pre-assessment-help.component';
import { ReviewPreVisitHelpComponent } from './setup-wizard-help-content/review-pre-visit-help/review-pre-visit-help.component';
import { ManageAssessmentsHelpComponent } from './setup-wizard-help-content/manage-assessments-help/manage-assessments-help.component';
import { AssessmentDetailsHelpComponent } from './setup-wizard-help-content/assessment-details-help/assessment-details-help.component';
import { EnergyOpportunitiesHelpComponent } from './setup-wizard-help-content/energy-opportunities-help/energy-opportunities-help.component';
import { AssessmentNebsHelpComponent } from './setup-wizard-help-content/assessment-nebs-help/assessment-nebs-help.component';
import { AssessmentResultsHelpComponent } from './setup-wizard-help-content/assessment-results-help/assessment-results-help.component';
import { DataFollowUpHelpComponent } from './setup-wizard-help-content/data-follow-up-help/data-follow-up-help.component';
import { AssessmentReportHelpComponent } from './setup-wizard-help-content/assessment-report-help/assessment-report-help.component';
import { RollupReportHelpComponent } from './setup-wizard-help-content/rollup-report-help/rollup-report-help.component';
import { EnergyEquipmentDiscoveryHelpComponent } from './setup-wizard-help-content/energy-equipment-discovery-help/energy-equipment-discovery-help.component';
import { ProcessEquipmentDiscoveryHelpComponent } from './setup-wizard-help-content/process-equipment-discovery-help/process-equipment-discovery-help.component';
import { AssessmentDiscoveryHelpComponent } from './setup-wizard-help-content/assessment-discovery-help/assessment-discovery-help.component';
import { SetupWizardSidePanelComponent } from './setup-wizard-side-panel.component';
import { SetupWizardHelpContentComponent } from './setup-wizard-help-content/setup-wizard-help-content.component';
import { SidePanelResultsComponent } from './side-panel-results/side-panel-results.component';
import { SidePanelSystemDiagramComponent } from './side-panel-system-diagram/side-panel-system-diagram.component';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';



@NgModule({
declarations: [
    SetupWizardSidePanelComponent,
    SetupWizardHelpContentComponent,
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
    AssessmentDiscoveryHelpComponent,
    SidePanelResultsComponent,
    SidePanelSystemDiagramComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HelperPipesModule
  ],
  exports: [
    SetupWizardSidePanelComponent
  ]
})
export class SetupWizardSidePanelModule { }
