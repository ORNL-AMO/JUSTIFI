
import { UtilityOptions, UtilityType } from "../shared/constants/utilityTypes";
import { UnitSettings } from "./unitSettings";

export interface UtilityEnergyUse {
    utilityType: UtilityType;
    include: boolean;
    energyUse: number;
    utilitySaving: number;
    energyUnit: string;
    energyHHV?: number;
    energyUnitStandard?: string;
    isKnown?: boolean; // TO DO: allow user to enter estimated values
}

export function getDefaultUtilityEnergyUses(facilityUnitSettings: UnitSettings): Array<UtilityEnergyUse> {
    return UtilityOptions.map(option => {
        const utilityType = option.utilityType.replace(/\s+/g, ''); // Remove spaces
        const camelCaseType = utilityType.charAt(0).toLowerCase()
                 + utilityType.slice(1);
        let energyUnit = option.energyDefaultUnit.value;
        let energyHHV = 0;
        let energyUnitStandard = 'MMBtu';
        if (facilityUnitSettings[`include${utilityType}`]) {
            if (facilityUnitSettings[`${camelCaseType}Unit`]) {
                energyUnit = facilityUnitSettings[`${camelCaseType}Unit`];
            }
        }
        // Override assessment HHV and Standard Energy Unit by facility settings
        energyHHV = facilityUnitSettings[`${camelCaseType}HHV`];
        energyUnitStandard = facilityUnitSettings[`${camelCaseType}EnergyUnit`];
        return {
            utilityType: option.utilityType,
            include: false,
            energyUnitStandard: energyUnitStandard,
            energyHHV: energyHHV,
            energyUse: 0,
            utilitySaving: 0,
            energyUnit: energyUnit,
            isKnown: true
        };
    });
}