import { Pipe, PipeTransform } from '@angular/core';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Pipe({
  name: 'filterArchivedVisits',
  standalone: false
})
export class FilterArchivedVisitsPipe implements PipeTransform {

  transform(visits: Array<IdbOnSiteVisit>, facilities: Array<IdbFacility>, showArchived: boolean = false): Array<IdbOnSiteVisit> {
    if (!visits || !facilities) {
      return visits || [];
    }

    if (showArchived) {
      return visits;
    }

    return visits.filter(visit => {
      let facility = facilities.find(f => f.guid === visit.facilityId);
      return !facility?.isArchived;
    });
  }

}
