import { Injectable } from '@angular/core';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { UtilityOptions } from 'src/app/shared/constants/utilityTypes';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';

@Injectable({
  providedIn: 'root'
})
export class FacilitySetupService {
  convertValue = new ConvertValue();

  constructor(private facilityIdbService: FacilityIdbService) { }

  async updateFacilityEnergyUse(facilities: Array<IdbFacility>, companyEnergyUnit: string) {
    // update facility energy use
    for (const facility of facilities) {
      let use = 0;
      UtilityOptions.forEach(option => {
        let utilityType = option.utilityType;
        let trimmedType = utilityType.replace(/\s+/g, ''); // Remove spaces
        let camelCaseType = trimmedType.charAt(0).toLowerCase() + trimmedType.slice(1);
        if (facility.unitSettings[`include${trimmedType}`]) {
          let convertedUse = 0;
          let selectedUnitOption = option.energyUnitOptions.find(
            _unitOption => _unitOption.value == facility.unitSettings[`${camelCaseType}Unit`]);
          if (option.isStandardEnergyUnit && selectedUnitOption.isStandard !== false) {
            // standard energy unit
            convertedUse = this.convertValue.convertValue(
              facility.unitSettings[`${camelCaseType}Use`],
              facility.unitSettings[`${camelCaseType}Unit`],
              companyEnergyUnit).convertedValue;
          } else {
            // non-standard energy unit
            convertedUse = this.convertValue.convertValue(
              facility.unitSettings[`${camelCaseType}Use`] *
              facility.unitSettings[`${camelCaseType}HHV`],
              facility.unitSettings[`${camelCaseType}EnergyUnit`],
              companyEnergyUnit).convertedValue;
          }
          use += convertedUse;
        }
        });
      facility.energyUse = use;
      await this.facilityIdbService.asyncUpdate(facility);
    }
  }
}
