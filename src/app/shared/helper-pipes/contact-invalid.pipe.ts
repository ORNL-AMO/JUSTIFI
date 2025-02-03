import { Pipe, PipeTransform } from '@angular/core';
import { CompanyContactsFormService } from '../shared-company-forms/company-contacts-form/company-contacts-form.service';
import { IdbContact } from 'src/app/models/contact';
import { FormGroup } from '@angular/forms';

@Pipe({
    name: 'contactInvalid',
    standalone: false
})
export class ContactInvalidPipe implements PipeTransform {

  constructor(private companyContactsFormService: CompanyContactsFormService) { }

  transform(contactGuid: string, contacts: Array<IdbContact>): boolean {
    let contact: IdbContact = contacts.find(c => { return c.guid == contactGuid });
    let form: FormGroup = this.companyContactsFormService.getFormFromIdbContact(contact);
    return form.invalid;
  }

}
