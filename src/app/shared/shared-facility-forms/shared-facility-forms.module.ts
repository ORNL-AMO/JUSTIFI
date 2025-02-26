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
    SharedFacilityProtocolQuestionsComponent
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
    AssociatedContactsModule
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
