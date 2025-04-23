import { EnergyUnitOptions, MassUnitOptions, PowerUnitOptions, EnergySteamMixedUnitOptions, UnitOption, VolumeGasOptions, VolumeLiquidOptions } from "./unitOptions";

export type UtilityType = 'Electricity' | 'Natural Gas' | 'Other Fuels' | 'Water' | 'Waste Water' | 'Steam' | 'Compressed Air';
export const UtilityTypes: Array<UtilityType> = ['Electricity', 'Natural Gas', 'Other Fuels', 'Water', 'Waste Water', 'Steam', 'Compressed Air'];

// Define utility type - unit relationship
export interface UtilityOption {
    utilityType: UtilityType,
    energyUnitOptions: Array<UnitOption>,
    isStandardEnergyUnit: boolean,
    energyDefaultUnit: UnitOption,
    powerUnitOptions: Array<UnitOption>,
    powerDefaultUnit: UnitOption,
    consumptionRateUnit?: Array<UnitOption>,
}

const kWh: UnitOption = EnergyUnitOptions.find(unitOption => unitOption.value === 'kWh')!;
const MMBtu: UnitOption = EnergyUnitOptions.find(unitOption => unitOption.value === 'MMBtu')!;
const kgal: UnitOption = VolumeLiquidOptions.find(unitOption => unitOption.value === 'kgal')!;
const klb: UnitOption = MassUnitOptions.find(unitOption => unitOption.value === 'klb')!;
const kSCF: UnitOption = VolumeGasOptions.find(unitOption => unitOption.value === 'kSCF')!;

const VolumeOptions = [...VolumeLiquidOptions, ...VolumeGasOptions];

export const UtilityOptions: Array<UtilityOption> = [
    {
        utilityType: 'Electricity',
        energyUnitOptions: EnergyUnitOptions,
        powerUnitOptions: PowerUnitOptions,
        isStandardEnergyUnit: true,
        energyDefaultUnit: kWh,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Natural Gas',
        energyUnitOptions: EnergyUnitOptions,
        isStandardEnergyUnit: true,
        powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: MMBtu,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Other Fuels',
        energyUnitOptions: EnergyUnitOptions,
        isStandardEnergyUnit: true,
        powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: MMBtu,
        powerDefaultUnit: undefined,
        consumptionRateUnit: VolumeOptions, // support all volume units
    },
    {
        utilityType: 'Water',
        energyUnitOptions: VolumeLiquidOptions,
        isStandardEnergyUnit: false,
        powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: kgal,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Waste Water', 
        energyUnitOptions: VolumeLiquidOptions,
        isStandardEnergyUnit: false,
        powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: kgal,
        powerDefaultUnit: undefined
    },
    {
        utilityType: 'Steam',
        energyUnitOptions: EnergySteamMixedUnitOptions,
        isStandardEnergyUnit: true,
        powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: klb,
        powerDefaultUnit: undefined,
        // limit to non-standard energy units: klb, ton, tonne, kg, etc.
        consumptionRateUnit: EnergySteamMixedUnitOptions.filter(_option => _option.isStandard === false),
    },
    {
        utilityType: 'Compressed Air',
        energyUnitOptions: VolumeGasOptions,
        isStandardEnergyUnit: false,
        powerUnitOptions: PowerUnitOptions,
        energyDefaultUnit: kSCF,
        powerDefaultUnit: undefined,
        consumptionRateUnit: VolumeGasOptions, // support all gas volume units
    },
];