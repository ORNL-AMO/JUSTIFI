import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssessmentDetailsFormComponent } from './assessment-details-form/assessment-details-form.component';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NebFormsAccordionComponent } from './neb-forms-accordion/neb-forms-accordion.component';
import { NebSetupFormComponent } from './neb-forms-accordion/neb-setup-form/neb-setup-form.component';
import { PerformanceMetricsModalComponent } from './neb-forms-accordion/neb-setup-form/performance-metrics-modal/performance-metrics-modal.component';
import { AssociatedMetricIndicatorPipe } from './neb-forms-accordion/neb-setup-form/performance-metrics-modal/associated-metric-indicator.pipe';
import { MetricOptionsModalListPipe } from './neb-forms-accordion/neb-setup-form/performance-metrics-modal/metric-options-modal-list.pipe';
import { PerformanceMetricImpactFormComponent } from './neb-forms-accordion/neb-setup-form/performance-metric-impact-form/performance-metric-impact-form.component';
import { PrimaryKpiBadgeModule } from '../primary-kpi-badge/primary-kpi-badge.module';
import { KpmDetailsFormModule } from '../kpm-details-form/kpm-details-form.module';
import { AddNebsModalComponent } from './add-nebs-modal/add-nebs-modal.component';
import { NebsDatabaseModule } from 'src/app/nebs-database/nebs-database.module';
import { EnergyOpportunitySetupFormComponent } from './energy-opportunity-setup-form/energy-opportunity-setup-form.component';
import { EnergyOpportunityNebsTableComponent } from './energy-opportunity-nebs-table/energy-opportunity-nebs-table.component';
import { TableEntriesModule } from '../table-entries/table-entries.module';
import { LabelWithTooltipModule } from "../label-with-tooltip/label-with-tooltip.module";
import { AssociatedProcessEquipmentModule } from '../associated-process-equipment/associated-process-equipment.module';
import { AssociatedContactsModule } from "../associated-contacts/associated-contacts.module";
import { AssociatedEnergyEquipmentModule } from '../associated-energy-equipment/associated-energy-equipment.module';


@NgModule({
  declarations: [
    AssessmentDetailsFormComponent,
    NebFormsAccordionComponent,
    NebSetupFormComponent,
    PerformanceMetricsModalComponent,
    AssociatedMetricIndicatorPipe,
    MetricOptionsModalListPipe,
    PerformanceMetricImpactFormComponent,
    AddNebsModalComponent,
    EnergyOpportunitySetupFormComponent,
    EnergyOpportunityNebsTableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HelperPipesModule,
    FontAwesomeModule,
    PrimaryKpiBadgeModule,
    KpmDetailsFormModule,
    NebsDatabaseModule,
    TableEntriesModule,
    LabelWithTooltipModule,
    LabelWithTooltipModule,
    AssociatedProcessEquipmentModule,
    AssociatedContactsModule,
    AssociatedEnergyEquipmentModule
],
  exports: [
    AssessmentDetailsFormComponent,
    NebFormsAccordionComponent,
    AddNebsModalComponent,
    EnergyOpportunitySetupFormComponent,
    EnergyOpportunityNebsTableComponent,
    AssociatedProcessEquipmentModule
  ]
})
export class SharedAssessmentFormsModule { }
