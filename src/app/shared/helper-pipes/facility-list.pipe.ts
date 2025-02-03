import { Pipe, PipeTransform } from '@angular/core';
import { IdbFacility } from 'src/app/models/facility';

@Pipe({
    name: 'facilityList',
    standalone: false
})
export class FacilityListPipe implements PipeTransform {

  transform(companyGUID: string, allFacilities: Array<IdbFacility>): Array<IdbFacility> {
    return allFacilities.filter(facility => { return facility.companyId == companyGUID });
  }

}
