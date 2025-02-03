import { Pipe, PipeTransform } from '@angular/core';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';

@Pipe({
    name: 'energyOpportunityDisplay',
    standalone: false
})
export class EnergyOpportunityDisplayPipe implements PipeTransform {

  transform(guid: string, energyOpportunities: Array<IdbEnergyOpportunity>): string {
    let energyOpportunity: IdbEnergyOpportunity = energyOpportunities.find(opportunity => {
      return opportunity.guid == guid
    });
    if (energyOpportunity) {
      return energyOpportunity.name
    }
    return null;
  }
}
