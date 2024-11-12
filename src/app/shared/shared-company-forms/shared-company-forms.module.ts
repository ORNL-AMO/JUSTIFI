import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LabelWithTooltipModule } from '../label-with-tooltip/label-with-tooltip.module';
import { SharedSettingsFormsModule } from '../shared-settings-forms/shared-settings-forms.module';
import { CompanySetupFormComponent } from './company-setup-form/company-setup-form.component';
import { CompanyKpiDetailsFormComponent } from './company-kpi-details-form/company-kpi-details-form.component';
import { PrimaryKpiBadgeModule } from '../primary-kpi-badge/primary-kpi-badge.module';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';
import { KpiDescriptionPipe } from './company-kpi-details-form/kpi-description.pipe';
import { KpmDetailsFormModule } from '../kpm-details-form/kpm-details-form.module';
import { KpmDatabaseModalComponent } from './company-kpi-details-form/kpm-database-modal/kpm-database-modal.component';
import { KpmImpactsTableComponent } from './company-kpi-details-form/kpm-impacts-table/kpm-impacts-table.component';
import { ContactModalModule } from '../contact-modal/contact-modal.module';
import { CompanyKpiSearchFormComponent } from './company-kpi-search-form/company-kpi-search-form.component';
import { AddKpiSearchComponent } from './company-kpi-search-form/add-kpi-search/add-kpi-search.component';
import { CompanyKpiListComponent } from './company-kpi-search-form/company-kpi-list/company-kpi-list.component';
import { SelectedKpiOptionPipe } from './company-kpi-search-form/add-kpi-search/selected-kpi-option.pipe';
import { CompanyContactsFormComponent } from './company-contacts-form/company-contacts-form.component';



@NgModule({
  declarations: [
    CompanySetupFormComponent,
    CompanyKpiDetailsFormComponent,
    KpiDescriptionPipe,
    KpmDatabaseModalComponent,
    KpmImpactsTableComponent,
    CompanyKpiSearchFormComponent,
    AddKpiSearchComponent,
    CompanyKpiListComponent,
    SelectedKpiOptionPipe,
    CompanyContactsFormComponent
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
    CompanyKpiDetailsFormComponent,
    CompanyKpiSearchFormComponent,
    CompanyContactsFormComponent
  ]
})
export class SharedCompanyFormsModule { }
