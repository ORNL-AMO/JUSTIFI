import { Pipe, PipeTransform } from '@angular/core';
import { ReportType, ReportTypeOptions } from '../constants/reportTypes';

@Pipe({
  name: 'reportTypeDisplay',
  standalone: false
})
export class ReportTypeDisplayPipe implements PipeTransform {

  transform(reportType: ReportType): string {
    return ReportTypeOptions.find(option => {
      return option.reportType == reportType;
    }).label;
  }

}
