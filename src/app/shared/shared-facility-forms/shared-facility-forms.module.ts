import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacilitySetupFormComponent } from './facility-setup-form/facility-setup-form.component';
import { SharedSettingsFormsModule } from '../shared-settings-forms/shared-settings-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FacilitySetupFormComponent
  ],
  imports: [
    CommonModule,
    SharedSettingsFormsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FacilitySetupFormComponent
  ]
})
export class SharedFacilityFormsModule { }
