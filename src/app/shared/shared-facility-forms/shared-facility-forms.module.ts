import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilitySetupFormComponent } from './facility-setup-form/facility-setup-form.component';
import { SharedSettingsFormsModule } from '../shared-settings-forms/shared-settings-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnergyEquipmentFormComponent } from './energy-equipment-form/energy-equipment-form.component';
import { HelperPipesModule } from '../helper-pipes/helper-pipes.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    FacilitySetupFormComponent,
    EnergyEquipmentFormComponent
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
    EnergyEquipmentFormComponent
  ]
})
export class SharedFacilityFormsModule { }
