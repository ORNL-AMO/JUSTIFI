import { Pipe, PipeTransform } from '@angular/core';
import { IdbContact } from 'src/app/models/contact';
import { IdbFacility } from 'src/app/models/facility';

@Pipe({
  name: 'filterArchivedContacts',
  standalone: false
})
export class FilterArchivedContactsPipe implements PipeTransform {

  transform(contacts: Array<IdbContact>, facility: IdbFacility): Array<IdbContact> {
    if (!contacts || !facility) {
      return contacts || [];
    }

    if (facility.isArchived) {
      return contacts.filter(contact => contact.archivedFacilityId === facility.guid);
    } else {
      return contacts.filter(contact => !contact.archivedFacilityId);
    }
  }

}
