import { Pipe, PipeTransform } from '@angular/core';
import { IdbFacility } from 'src/app/models/facility';

@Pipe({
    name: 'facilityName',
    standalone: false
})
export class FacilityNamePipe implements PipeTransform {

  transform(facilityGUID: string, facilities: Array<IdbFacility>): string {
    let facility: IdbFacility = facilities.find(_facility => {
      return _facility.guid == facilityGUID;
    });
    if (facility) {
      return facility.generalInformation.name;
    }
    return '';
  }

}
