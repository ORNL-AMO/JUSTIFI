import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelWithTooltipModule } from '../label-with-tooltip/label-with-tooltip.module';
import { SharedSettingsFormsModule } from '../shared-settings-forms/shared-settings-forms.module';
import { CompanySetupFormComponent } from './company-setup-form/company-setup-form.component';
import { CompanyKpiDetailsFormComponent } from './company-kpi-details-form/company-kpi-details-form.component';
import { PrimaryKpiBadgeModule } from '../primary-kpi-badge/primary-kpi-badge.module';
import { HelperPipesModule } from '../helper-pipes/helper-pipes.module';
import { KpiDescriptionPipe } from './company-kpi-details-form/kpi-description.pipe';
import { KpmDetailsFormModule } from '../kpm-details-form/kpm-details-form.module';
import { KpmDatabaseModalComponent } from './company-kpi-details-form/kpm-database-modal/kpm-database-modal.component';
import { KpmImpactsTableComponent } from './company-kpi-details-form/kpm-impacts-table/kpm-impacts-table.component';
import { ContactModalModule } from '../contact-modal/contact-modal.module';



@NgModule({
  declarations: [
    CompanySetupFormComponent,
    CompanyKpiDetailsFormComponent,
    KpiDescriptionPipe,
    KpmDatabaseModalComponent,
    KpmImpactsTableComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    LabelWithTooltipModule,
    SharedSettingsFormsModule,
    FormsModule,
    PrimaryKpiBadgeModule,
    HelperPipesModule,
    KpmDetailsFormModule,
    ContactModalModule
  ],
  exports: [
    CompanySetupFormComponent,
    CompanyKpiDetailsFormComponent
  ]
})
export class SharedCompanyFormsModule { }
