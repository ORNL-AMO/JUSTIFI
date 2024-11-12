import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilitySetupFormComponent } from './facility-setup-form/facility-setup-form.component';
import { SharedSettingsFormsModule } from '../shared-settings-forms/shared-settings-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnergyEquipmentFormComponent } from './energy-equipment-form/energy-equipment-form.component';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProcessEquipmentFormComponent } from './process-equipment-form/process-equipment-form.component';



@NgModule({
  declarations: [
    FacilitySetupFormComponent,
    EnergyEquipmentFormComponent,
    ProcessEquipmentFormComponent
  ],
  imports: [
    CommonModule,
    SharedSettingsFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HelperPipesModule,
    FontAwesomeModule
  ],
  exports: [
    FacilitySetupFormComponent,
    EnergyEquipmentFormComponent,
    ProcessEquipmentFormComponent
  ]
})
export class SharedFacilityFormsModule { }
