import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsFormComponent } from './units-form/units-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NaicsListPipe } from './additional-details-form/naics-list.pipe';
import { LocationFormComponent } from './location-form/location-form.component';
import { AdditionalDetailsFormComponent } from './additional-details-form/additional-details-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';

@NgModule({
  declarations: [
    UnitsFormComponent,
    NaicsListPipe,
    LocationFormComponent,
    AdditionalDetailsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HelperPipesModule
  ],
  exports: [
    UnitsFormComponent,
    LocationFormComponent,
    AdditionalDetailsFormComponent
  ]
})
export class SharedSettingsFormsModule { }
