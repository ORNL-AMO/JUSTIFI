import { Pipe, PipeTransform } from '@angular/core';
import { IdbReport } from 'src/app/models/report';

@Pipe({
  name: 'onSiteReportsList',
  standalone: false
})
export class OnSiteReportsListPipe implements PipeTransform {

  transform(reports: Array<IdbReport>, onSiteGuid: string): Array<IdbReport> {
    return reports.filter(report => { return report.onSiteVisitId == onSiteGuid });
  }

}
