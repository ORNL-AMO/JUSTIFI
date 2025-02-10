import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelWithTooltipModule } from '../label-with-tooltip/label-with-tooltip.module';
import { SharedSettingsFormsModule } from '../shared-settings-forms/shared-settings-forms.module';
import { CompanySetupFormComponent } from './company-setup-form/company-setup-form.component';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';
import { CompanyContactsFormComponent } from './company-contacts-form/company-contacts-form.component';
import { AssociatedContactsModule } from '../associated-contacts/associated-contacts.module';



@NgModule({
  declarations: [
    CompanySetupFormComponent,
    CompanyContactsFormComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LabelWithTooltipModule,
    SharedSettingsFormsModule,
    FormsModule,
    HelperPipesModule,
    AssociatedContactsModule
  ],
  exports: [
    CompanySetupFormComponent,
    CompanyContactsFormComponent
  ]
})
export class SharedCompanyFormsModule { }
