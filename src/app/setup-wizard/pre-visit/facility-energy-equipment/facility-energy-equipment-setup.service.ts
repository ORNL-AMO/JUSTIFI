import { Injectable } from '@angular/core';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { UnitSettings } from 'src/app/models/unitSettings';
import { UtilityOptions } from 'src/app/shared/constants/utilityTypes';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';

@Injectable({
  providedIn: 'root'
})
export class FacilityEnergyEquipmentSetupService {
  convertValue = new ConvertValue();

  constructor(
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private companyIdbService: CompanyIdbService,
  ) { }

  async updateEnergyEquipmentEnergyUse(energyEquipments: Array<IdbEnergyEquipment>,
    companyEnergyUnit: string) {
    for (const equipment of energyEquipments) {
      // Update energy opportunity energy savings
      if (companyEnergyUnit === 'MMBtu') {
        equipment.annualEnergyUse = this.convertValue.convertValue(
          equipment.annualEnergyUse,
          'kWh',
          'MMBtu').convertedValue;
      } else {
        equipment.annualEnergyUse = this.convertValue.convertValue(
          equipment.annualEnergyUse,
          'MMBtu',
          'kWh').convertedValue;
      }
      await this.energyEquipmentIdbService.asyncUpdate(equipment);
    }
  }

  async updateEnergyEquipmentEnergyUseByUtility(energyEquipments: Array<IdbEnergyEquipment>,
    facilityUnitSettings: UnitSettings) {
    for (const equipment of energyEquipments) {
      const utilityType = equipment.utilityType;
      const trimmedType = utilityType.replace(/\s+/g, '');
      const camelCaseType = trimmedType.charAt(0).toLowerCase()
          + trimmedType.slice(1);
      if (facilityUnitSettings[`include${trimmedType}`]) {
        let selectedUtilityOption = UtilityOptions.find(
          _option => _option.utilityType == utilityType);
        let selectedUnitOption = selectedUtilityOption.energyUnitOptions.find(
          _unitOption => _unitOption.value == facilityUnitSettings[`${camelCaseType}Unit`]);
        if (selectedUtilityOption.isStandardEnergyUnit 
          && selectedUnitOption.isStandard !== false) { // Standard unit
          equipment.facilityUtilityUnit = facilityUnitSettings[`${camelCaseType}Unit`];
        } else { // Non-standard unit
          equipment.facilityUtilityUnit = facilityUnitSettings[`${camelCaseType}EnergyUnit`];
        }
      } else {
        equipment.facilityUtilityUnit = this.companyIdbService.getByGUID(equipment.companyId).companyEnergyUnit; // Default to company unit
      }
      // Conversion
      equipment.annualEnergyUseByUtility = this.convertValue.convertValue(
        equipment.annualEnergyUse,
        this.companyIdbService.getByGUID(equipment.companyId).companyEnergyUnit,
        equipment.facilityUtilityUnit
      ).convertedValue;
      if (!equipment.annualEnergyUseByUtility || 
        equipment.annualEnergyUseByUtility === Infinity) {
        equipment.annualEnergyUseByUtility = 0;
      }
      await this.energyEquipmentIdbService.asyncUpdate(equipment);
    }
  }
}
