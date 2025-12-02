import { Pipe, PipeTransform } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Pipe({
  name: 'facilityContactList',
  standalone: false
})
export class FacilityContactListPipe implements PipeTransform {
  transform(contacts: Array<IdbContact>, facilityId: string, assessments: Array<IdbAssessment>,
      energyEquipments: Array<IdbEnergyEquipment>, processEquipments: Array<IdbProcessEquipment>,
      kpis: Array<IdbKeyPerformanceIndicator>, nebs: Array<IdbNonEnergyBenefit>
    ): Array<IdbContact> {
    if (!facilityId || !contacts) return [];

    // Get all entity GUIDs for this facility
    const assessmentGuids = assessments.filter(a => a.facilityId === facilityId).map(a => a.guid);
    const energyEquipmentGuids = energyEquipments.filter(e => e.facilityId === facilityId).map(e => e.guid);
    const processEquipmentGuids = processEquipments.filter(p => p.facilityId === facilityId).map(p => p.guid);
    const kpiGuids = kpis.filter(k => k.facilityId === facilityId).map(k => k.guid);
    const nebGuids = nebs.filter(n => n.facilityId === facilityId).map(n => n.guid);

    return contacts.filter(contact => {
      const hasAssessment = contact.assessmentIds?.some(id => assessmentGuids.includes(id));
      const hasEnergyEquipment = contact.energyEquipmentIds?.some(id => energyEquipmentGuids.includes(id));
      const hasProcessEquipment = contact.processEquipmentIds?.some(id => processEquipmentGuids.includes(id));
      const hasKpi = contact.kpiIds?.some(id => kpiGuids.includes(id));
      const hasNeb = contact.nonEnergyBenefitIds?.some(id => nebGuids.includes(id));
      return hasAssessment || hasEnergyEquipment || hasProcessEquipment || hasKpi || hasNeb;
    });
  }

}
