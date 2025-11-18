import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilitySetupFormComponent } from './facility-setup-form/facility-setup-form.component';
import { SharedSettingsFormsModule } from '../shared-settings-forms/shared-settings-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnergyEquipmentFormComponent } from './energy-equipment-form/energy-equipment-form.component';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProcessEquipmentFormComponent } from './process-equipment-form/process-equipment-form.component';
import { AddKpiSearchComponent } from './kpi-search-form/add-kpi-search/add-kpi-search.component';
import { SelectedKpiOptionPipe } from './kpi-search-form/add-kpi-search/selected-kpi-option.pipe';
import { KpiListComponent } from './kpi-search-form/kpi-list/kpi-list.component';
import { KpiSearchFormComponent } from './kpi-search-form/kpi-search-form.component';
import { KpmDetailsFormModule } from '../kpm-details-form/kpm-details-form.module';
import { PrimaryKpiBadgeModule } from '../primary-kpi-badge/primary-kpi-badge.module';
import { KpmDatabaseModalComponent } from './kpi-details-form/kpm-database-modal/kpm-database-modal.component';
import { KpmImpactsTableComponent } from './kpi-details-form/kpm-impacts-table/kpm-impacts-table.component';
import { KpiDescriptionPipe } from './kpi-details-form/kpi-description.pipe';
import { KpiDetailsFormComponent } from './kpi-details-form/kpi-details-form.component';
import { AssociatedContactsModule } from '../associated-contacts/associated-contacts.module';
import { SharedFacilityProtocolQuestionsComponent } from './shared-facility-protocol-questions/shared-facility-protocol-questions.component';
import { SharedAssessmentFormsModule } from "../shared-assessment-forms/shared-assessment-forms.module";
import { AssociatedProcessEquipmentModule } from "../associated-process-equipment/associated-process-equipment.module";
import { AssociatedEnergyEquipmentModule } from '../associated-energy-equipment/associated-energy-equipment.module';
import { DiscoveryEnergyEquipmentQuestionsComponent } from './discovery-energy-equipment-questions/discovery-energy-equipment-questions.component';
import { EnergyEquipmentEmployeeEngagementComponent } from './discovery-energy-equipment-questions/energy-equipment-employee-engagement/energy-equipment-employee-engagement.component';
import { EnergyEquipmentSustainabilityComponent } from './discovery-energy-equipment-questions/energy-equipment-sustainability/energy-equipment-sustainability.component';
import { EnergyEquipmentOperationsComponent } from './discovery-energy-equipment-questions/energy-equipment-operations/energy-equipment-operations.component';
import { EnergyEquipmentTakeStockComponent } from './discovery-energy-equipment-questions/energy-equipment-take-stock/energy-equipment-take-stock.component';
import { DiscoveryProcessEquipmentQuestionsComponent } from './discovery-process-equipment-questions/discovery-process-equipment-questions.component';
import { ProcessEquipmentTakeStockComponent } from './discovery-process-equipment-questions/process-equipment-take-stock/process-equipment-take-stock.component';
import { ProcessEquipmentOperationsComponent } from './discovery-process-equipment-questions/process-equipment-operations/process-equipment-operations.component';
import { ProcessEquipmentEmployeeEngagementComponent } from './discovery-process-equipment-questions/process-equipment-employee-engagement/process-equipment-employee-engagement.component';
import { ProcessEquipmentSustainabilityComponent } from './discovery-process-equipment-questions/process-equipment-sustainability/process-equipment-sustainability.component';
import { LabelWithTooltipModule } from "../label-with-tooltip/label-with-tooltip.module";
import { TableEntriesModule } from '../table-entries/table-entries.module';

@NgModule({
  declarations: [
    FacilitySetupFormComponent,
    EnergyEquipmentFormComponent,
    ProcessEquipmentFormComponent,
    AddKpiSearchComponent,
    SelectedKpiOptionPipe,
    KpiListComponent,
    KpiSearchFormComponent,
    KpmDatabaseModalComponent,
    KpmImpactsTableComponent,
    KpiDescriptionPipe,
    KpiDetailsFormComponent,
    SharedFacilityProtocolQuestionsComponent,
    DiscoveryEnergyEquipmentQuestionsComponent,
    EnergyEquipmentTakeStockComponent,
    EnergyEquipmentOperationsComponent,
    EnergyEquipmentSustainabilityComponent,
    EnergyEquipmentEmployeeEngagementComponent,
    DiscoveryProcessEquipmentQuestionsComponent,
    ProcessEquipmentTakeStockComponent,
    ProcessEquipmentOperationsComponent,
    ProcessEquipmentEmployeeEngagementComponent,
    ProcessEquipmentSustainabilityComponent,
  ],
  imports: [
    CommonModule,
    SharedSettingsFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HelperPipesModule,
    FontAwesomeModule,
    KpmDetailsFormModule,
    PrimaryKpiBadgeModule,
    AssociatedContactsModule,
    SharedAssessmentFormsModule,
    AssociatedContactsModule,
    AssociatedProcessEquipmentModule,
    AssociatedEnergyEquipmentModule,
    LabelWithTooltipModule,
    TableEntriesModule    
  ],
  exports: [
    FacilitySetupFormComponent,
    EnergyEquipmentFormComponent,
    ProcessEquipmentFormComponent,
    KpiDetailsFormComponent,
    KpiSearchFormComponent,
    SharedFacilityProtocolQuestionsComponent
  ]
})
export class SharedFacilityFormsModule { }
