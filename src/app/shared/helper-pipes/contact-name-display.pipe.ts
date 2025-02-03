import { Pipe, PipeTransform } from '@angular/core';
import { IdbContact } from 'src/app/models/contact';

@Pipe({
    name: 'contactNameDisplay',
    pure: false,
    standalone: false
})
export class ContactNameDisplayPipe implements PipeTransform {

  transform(contact: IdbContact): string {
    if (contact) {
      return (contact.firstName || '') + ' ' + (contact.lastName  || '');
    } else {
      return '';
    }
  }

}
