import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomReportComponent } from './custom-report/custom-report.component';
import { CustomReportOptionsComponent } from './custom-report-options/custom-report-options.component';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';
import { EnergyOpportunityReportOptionsListPipe } from './custom-report-options/energy-opportunity-report-options-list.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NonEnergyBenefitReportOptionsListPipe } from './custom-report-options/non-energy-benefit-report-options-list.pipe';



@NgModule({
  declarations: [
    CustomReportComponent,
    CustomReportOptionsComponent,
    EnergyOpportunityReportOptionsListPipe,
    NonEnergyBenefitReportOptionsListPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HelperPipesModule,
    FontAwesomeModule
  ],
  exports: [
    CustomReportComponent
  ]
})
export class SharedCustomReportsModule { }
