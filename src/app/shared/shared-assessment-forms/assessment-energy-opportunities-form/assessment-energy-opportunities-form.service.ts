import { Injectable } from '@angular/core';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { UnitSettings } from 'src/app/models/unitSettings';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { UtilityType } from 'src/app/shared/constants/utilityTypes';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';

@Injectable({
  providedIn: 'root'
})
export class AssessmentEnergyOpportunitiesFormService {

  convertValue = new ConvertValue();
  
  constructor(private energyOpportunityIdbService: EnergyOpportunityIdbService) { }

  async updateEnergyOpportunityEnergyUseFromCompany(energyOpportunities: Array<IdbEnergyOpportunity>,
      companyEnergyUnit: string) {
    for (const energyOpportunity of energyOpportunities) {
      // Update energy opportunity energy savings
      if (companyEnergyUnit === 'MMBtu') {
        energyOpportunity.energySavings = this.convertValue.convertValue(
          energyOpportunity.energySavings,
          'kWh',
          'MMBtu').convertedValue;
      } else {
        energyOpportunity.energySavings = this.convertValue.convertValue(
          energyOpportunity.energySavings,
          'MMBtu',
          'kWh').convertedValue;
      }
      await this.energyOpportunityIdbService.asyncUpdate(energyOpportunity);
    }
  }

  async updateEnergyOpportunityFromAssessment(energyOpportunities: Array<IdbEnergyOpportunity>,
    utilityEnergyUses: Array<UtilityEnergyUse>) {
    for (const energyOpportunity of energyOpportunities) {
      let utilityTypes: Array<UtilityType> = utilityEnergyUses
        .filter(use => use.include)
        .map(use => use.utilityType);

      let utilityType: UtilityType;
      let energyUnit: string = 'MMBtu';

      if (!utilityTypes.includes(energyOpportunity.utilityType)) {
        utilityType = utilityTypes?.[0];
      } else {
        utilityType = energyOpportunity.utilityType;
      }

      if (utilityType) {
        let energyUse = utilityEnergyUses.find(use => use.utilityType === utilityType);
        energyUnit = energyUse.energyUnit;
      }

      energyOpportunity.utilityTypes = utilityTypes;
      energyOpportunity.utilityType = utilityType;
      energyOpportunity.energyUnit = energyUnit;
      await this.energyOpportunityIdbService.asyncUpdate(energyOpportunity);
    }
  }
}
