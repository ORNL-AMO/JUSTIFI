import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpmDetailsFormComponent } from './kpm-details-form.component';
import { FormsModule } from '@angular/forms';
import { LabelWithTooltipModule } from '../label-with-tooltip/label-with-tooltip.module';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';



@NgModule({
  declarations: [
    KpmDetailsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    LabelWithTooltipModule,
    HelperPipesModule
  ],
  exports: [KpmDetailsFormComponent]
})
export class KpmDetailsFormModule { }
