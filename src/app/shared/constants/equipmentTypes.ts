// export enum EnergySystem {
//     Pump = "Pump",
//     Fan = "Fan",
//     ProcessHeating = "Process Heating",
//     CompressedAir = "Compressed Air",
//     Steam = "Steam"
// };

import { UtilityType } from "./utilityTypes";


export type EquipmentType = "Pump" | "Fan" | "Process Heating" | "Compressed Air" | "Steam" | "Process Cooling" | "Motor" | "Lighting" | "HVAC" | "Mobile";
export const EquipmentTypes: Array<EquipmentType> = ["Pump", "Fan", "Process Heating", "Compressed Air", "Steam", "Process Cooling", "Motor", "Lighting", "HVAC", "Mobile"];

export const EquipmentTypeOptions:
    Array<{ equipmentType: EquipmentType, 
        utilityTypes: Array<UtilityType>,
        defaultUnit: string }> = EquipmentTypes.map(type => {
    switch (type) {
        case "Pump":
            return { equipmentType: type, utilityTypes: ['Electricity'], defaultUnit: 'kW' };
        case "Fan":
            return { equipmentType: type, utilityTypes: ['Electricity'], defaultUnit: 'kW' };
        case "Process Heating":
            return { equipmentType: type, utilityTypes: ['Natural Gas', 'Other Fuels', 'Electricity', 'Steam'],
                defaultUnit: 'kW'
             };
        case "Compressed Air":
            return { equipmentType: type, utilityTypes: ['Electricity'],
                defaultUnit: 'kW'
             };
        case "Steam":
            return { equipmentType: type, utilityTypes: ['Natural Gas', 'Other Fuels', 'Electricity'],
                defaultUnit: 'kW'
             };
        case "Process Cooling":
            return { equipmentType: type, utilityTypes: ['Electricity'], defaultUnit: 'kW' };
        case "Motor":
            return { equipmentType: type, utilityTypes: ['Electricity'], defaultUnit: 'kW' };
        case "Lighting":
            return { equipmentType: type, utilityTypes: ['Electricity'], defaultUnit: 'W' };
        case "HVAC":
            return { equipmentType: type, utilityTypes: ['Electricity'], defaultUnit: 'kW' };
        case "Mobile":
            return { equipmentType: type, utilityTypes: ['Electricity', 'Natural Gas', 'Other Fuels'],
                defaultUnit: 'kW'
             };
    }
});
