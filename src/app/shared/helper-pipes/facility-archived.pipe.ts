import { Pipe, PipeTransform } from '@angular/core';
import { IdbFacility } from 'src/app/models/facility';

@Pipe({
  name: 'facilityArchived',
  standalone: false
})
export class FacilityArchivedPipe implements PipeTransform {

  transform(facilityId: string, facilities: Array<IdbFacility>): boolean {
    if (!facilities || !facilityId) {
      return false;
    }
    const facility = facilities.find(f => f.guid === facilityId);
    return facility?.isArchived || false;
  }

}
