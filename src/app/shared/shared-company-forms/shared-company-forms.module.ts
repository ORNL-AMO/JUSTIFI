import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelWithTooltipModule } from '../label-with-tooltip/label-with-tooltip.module';
import { SharedSettingsFormsModule } from '../shared-settings-forms/shared-settings-forms.module';
import { CompanySetupFormComponent } from './company-setup-form/company-setup-form.component';



@NgModule({
  declarations: [
    CompanySetupFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LabelWithTooltipModule,
    SharedSettingsFormsModule
  ],
  exports: [
    CompanySetupFormComponent
  ]
})
export class SharedCompanyFormsModule { }
