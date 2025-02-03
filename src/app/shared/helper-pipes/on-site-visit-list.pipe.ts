import { Pipe, PipeTransform } from '@angular/core';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Pipe({
    name: 'onSiteVisitList',
    standalone: false
})
export class OnSiteVisitListPipe implements PipeTransform {

  transform(facilityGuid: string, onSiteVisits: Array<IdbOnSiteVisit>): Array<IdbOnSiteVisit> {
    return onSiteVisits.filter(visit => {
      return visit.facilityId == facilityGuid;
    });
  }

}
