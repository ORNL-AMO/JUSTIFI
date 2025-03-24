import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomReportComponent } from './custom-report/custom-report.component';
import { CustomReportOptionsComponent } from './custom-report-options/custom-report-options.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomReportComponent,
    CustomReportOptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CustomReportComponent
  ]
})
export class SharedCustomReportsModule { }
