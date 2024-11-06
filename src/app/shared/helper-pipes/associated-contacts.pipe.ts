import { Pipe, PipeTransform } from '@angular/core';
import { ContactContext, IdbContact } from 'src/app/models/contact';

@Pipe({
  name: 'associatedContacts',
  pure: false
})
export class AssociatedContactsPipe implements PipeTransform {

  transform(guid: string, context: ContactContext, contacts: Array<IdbContact>): Array<IdbContact> {
    let _contacts: Array<IdbContact> = new Array();
    contacts.forEach(_contact => {
      if (context == 'processEquipment' && _contact.processEquipmentIds.includes(guid)) {
        _contacts.push(_contact);
      } else if (context == 'assessment' && _contact.assessmentIds.includes(guid)) {
        _contacts.push(_contact);
      } else if (context == 'facility' && _contact.facilityIds.includes(guid)) {
        _contacts.push(_contact);
      } else if (context == 'company' && _contact.companyId == guid) {
        _contacts.push(_contact);
      } else if (context == 'KPI' && _contact.kpiIds.includes(guid)) {
        _contacts.push(_contact);
      } else if (context == 'nonEnergyBenefit' && _contact.nonEnergyBenefitIds.includes(guid)) {
        _contacts.push(_contact);
      } else if (context == 'energyEquipment' && _contact.energyEquipmentIds.includes(guid)) {
        _contacts.push(_contact);
      }
    });
    if (_contacts.length > 0) {
      return _contacts;
    }
    return [];
  }

}
