import { UtilityOptions } from "../shared/constants/utilityTypes";

export interface UnitSettings {
    includeElectricity: boolean,
    electricityUse: number,
    electricityUnit: string,
    electricityPrice: number,
    electricityHHV: number,
    electricityEnergyUnit: string,

    includeNaturalGas: boolean,
    naturalGasUse: number,
    naturalGasUnit: string,
    naturalGasPrice: number,
    naturalGasHHV: number,
    naturalGasEnergyUnit: string,
    
    includeSteam: boolean,
    steamUse: number,
    steamUnit: string,
    steamPrice: number,
    steamHHV: number,
    steamEnergyUnit: string,
    
    includeWater: boolean,
    waterUse: number,
    waterUnit: string,
    waterPrice: number,
    waterHHV: number,
    waterEnergyUnit: string,

    includeWasteWater: boolean,
    wasteWaterUse: number,
    wasteWaterUnit: string,
    wasteWaterPrice: number,
    wasteWaterHHV: number,
    wasteWaterEnergyUnit: string,

    includeOtherFuels: boolean,
    otherFuelsUse: number,
    otherFuelsUnit: string,
    otherFuelsPrice: number,
    otherFuelsHHV: number,
    otherFuelsEnergyUnit: string,

    includeCompressedAir: boolean,
    compressedAirUse: number,
    compressedAirUnit: string,
    compressedAirPrice: number,
    compressedAirHHV: number,
    compressedAirEnergyUnit: string,
}

export function getDefaultUnitSettings(): UnitSettings {
    const settings: UnitSettings = UtilityOptions.reduce((settings, option) => {
        const utilityType = option.utilityType.replace(/\s+/g, ''); // Remove spaces
        const camelCaseType = utilityType.charAt(0).toLowerCase()
                 + utilityType.slice(1); // Lowercase first letter

        settings[`include${utilityType}`] = false;
        settings[`${camelCaseType}Use`] = 0;
        settings[`${camelCaseType}Unit`] = option.energyDefaultUnit.value;
        settings[`${camelCaseType}Price`] = 0;
        settings[`${camelCaseType}HHV`] = 0;
        settings[`${camelCaseType}EnergyUnit`] = 'MMBtu';
        return settings;
    }, {} as UnitSettings);
    // set defaults to include electricity and natural gas
    settings.includeElectricity = true;
    settings.includeNaturalGas = true;
    return settings;
}