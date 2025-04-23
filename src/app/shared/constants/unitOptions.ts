export interface UnitOption {
    display: string,
    value: string, // Identifier to match the key in unit definitions.
    unitsOfMeasure: string,
    isStandard?: boolean // 
}

export const Energy2PowerUnitMap: { [key: string]: string } = {
    'kWh': 'kW',
    'Wh': 'W',
    'MWh': 'MW',
    'kJ': 'kJhr',
    'GJ': 'GJhr',
    'MJ': 'MJhr',
    'MMBtu': 'MMBtuhr',
}

export const EnergyUnitOptions: Array<UnitOption> = [
    {
        display: 'Kilowatt-hour (kWh)',
        value: 'kWh',
        unitsOfMeasure: 'Metric'
    },
    {   display: 'Watt-hour (Wh)',
        value: 'Wh',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Megawatt-hour (MWh)',
        value: 'MWh',
        unitsOfMeasure: 'Imperial'
    },
    // {
    //     display: 'Horsepower-hour (HP-hr)',
    //     value: 'HP-hr',
    //     unitsOfMeasure: 'Imperial'
    // },
    {
        display: 'Kilojoules (kJ)',
        value: 'kJ',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Gigajoules (GJ)',
        value: 'GJ',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Megajoules (MJ)',
        value: 'MJ',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Therms',
        value: 'Therms',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Dekatherms (DTherms)',
        value: 'Dtherms',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Million British Thermal Units (MMBtu)',
        value: 'MMBtu',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Kilocalorie (kcal)',
        value: 'kcal',
        unitsOfMeasure: 'Imperial'
    }
];


export const PowerUnitOptions: Array<UnitOption> = [
    {
        display: 'Kilowatt (kW)',
        value: 'kW',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Watt (W)',
        value: 'W',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Megawatt (MW)',
        value: 'MW',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Horsepower (hp)',
        value: 'hp',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Kilojoules per hour (kJ/hr)',
        value: 'kJhr',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Gigajoules per hour (GJ/hr)',
        value: 'GJhr',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Megajoules per hour (MJ/hr)',
        value: 'MJhr',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Million British Thermal Units per hour (MMBtu/hr)',
        value: 'MMBtuhr',
        unitsOfMeasure: 'Metric'
    }
]


export const VolumeLiquidOptions: Array<UnitOption> = [
    {
        display: 'Feet Cubed (ft&#x00B3;)',
        value: 'ft3',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Gallon (gal)',
        value: 'gal',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Thousand Gallons (kGal)',
        value: 'kgal',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Million Gallons (Mgal)',
        value: 'Mgal',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Cubic Meters (m&#x00B3;)',
        value: 'm3',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Liters (L)',
        value: 'L',
        unitsOfMeasure: 'Metric'
    }
]

export const VolumeGasOptions: Array<UnitOption> = [
    {
        display: 'Standard Cubic Feet (SCF)',
        value: 'SCF',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Normal Meters Cubed (Nm&#x00B3;)',
        value: 'm3',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Hundred Cubic Feet (CCF)',
        value: 'CCF',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Million Cubic Feet (MMCF)',
        value: 'MMCF',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Million Cubic Meters (MCM)',
        value: 'MCM',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Thousand Standard Cubic Feet (kSCF)',
        value: 'kSCF',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Thousand Cubic Meters (kCM)',
        value: 'kCM',
        unitsOfMeasure: 'Metric'
    },
]

export const EnergySteamMixedUnitOptions: Array<UnitOption> = [
    {
        display: 'Pounds (lb)',
        value: 'lb',
        unitsOfMeasure: 'Imperial',
        isStandard: false
    },
    {
        display: 'Kilograms (kg)',
        value: 'kg',
        unitsOfMeasure: 'Metric',
        isStandard: false
    },
    {
        display: 'Tons',
        value: 'ton',
        unitsOfMeasure: 'Imperial',
        isStandard: false
    },
    {
        display: 'Metric Tonnes (tonnes)',
        value: 'tonne',
        unitsOfMeasure: 'Metric',
        isStandard: false
    },
    {
        display: 'Thousand pounds (klb)',
        value: 'klb',
        unitsOfMeasure: 'Imperial',
        isStandard: false
    },
    {
        display: 'Kilowatt-hour (kWh)',
        value: 'kWh',
        unitsOfMeasure: 'Metric',
        isStandard: true
    },
    {   display: 'Watt-hour (Wh)',
        value: 'Wh',
        unitsOfMeasure: 'Metric',
        isStandard: true
    },
    {
        display: 'Megawatt-hour (MWh)',
        value: 'MWh',
        unitsOfMeasure: 'Imperial',
        isStandard: true
    },
    {
        display: 'Kilojoules (kJ)',
        value: 'kJ',
        unitsOfMeasure: 'Imperial',
        isStandard: true
    },
    {
        display: 'Gigajoules (GJ)',
        value: 'GJ',
        unitsOfMeasure: 'Imperial',
        isStandard: true
    },
    {
        display: 'Megajoules (MJ)',
        value: 'MJ',
        unitsOfMeasure: 'Imperial',
        isStandard: true
    },
    {
        display: 'Therms',
        value: 'Therms',
        unitsOfMeasure: 'Metric',
        isStandard: true
    },
    {
        display: 'Dekatherms (DTherms)',
        value: 'Dtherms',
        unitsOfMeasure: 'Metric',
        isStandard: true
    },
    {
        display: 'Million British Thermal Units (MMBtu)',
        value: 'MMBtu',
        unitsOfMeasure: 'Metric',
        isStandard: true
    },
    {
        display: 'Kilocalorie (kcal)',
        value: 'kcal',
        unitsOfMeasure: 'Imperial',
        isStandard: true
    }
]

export const SizeUnitOptions: Array<UnitOption> = [
    {
        display: 'Feet (ft)',
        value: 'ft',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Meter (m)',
        value: 'm',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Kilometer (km)',
        value: 'km',
        unitsOfMeasure: 'Metric'
    }
]


export const MassUnitOptions: Array<UnitOption> = [
    {
        display: 'Pounds (lb)',
        value: 'lb',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Kilograms (kg)',
        value: 'kg',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Tons',
        value: 'ton',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Metric Tonnes (tonnes)',
        value: 'tonne',
        unitsOfMeasure: 'Metric'
    },
    {
        display: 'Thousand pounds (klb)',
        value: 'klb',
        unitsOfMeasure: 'Imperial'
    }
]


export const ChilledWaterUnitOptions: Array<UnitOption> = [
    {
        display: 'Ton-Hour (ton-Hr)',
        value: 'tonHr',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Gallons-Fahrenheit (gal-&#x2109;)',
        value: 'galF',
        unitsOfMeasure: 'Imperial'
    },

]

// export const HeatingValueUnitOptions: Array<UnitOption> = [
//     {
//         display: 'BTU per Cubic Foot (BTU/ft&#x00B3;)',
//         value: 'btuft3',
//         unitsOfMeasure: 'Imperial'
//     },
//     {
//         display: 'BTU per Standard Cubic Foot (BTU/SCF)',
//         value: 'btuSCF',
//         unitsOfMeasure: 'Imperial'
//     },
//     {
//         display: 'BTU per Gallon (BTU/gal)',
//         value: 'btugal',
//         unitsOfMeasure: 'Imperial'
//     },
//     {
//         display: 'BTU per Cubic Meter (BTU/m&#x00B3;)',
//         value: 'btum3',
//         unitsOfMeasure: 'Metric'
//     },
//     {
//         display: 'BTU per Liter (BTU/L)',
//         value: 'btuL',
//         unitsOfMeasure: 'Metric'
//     },
//     {
//         display: 'KJ per Cubic Meter (KJ/m&#x00B3;)',
//         value: 'KJm3',
//         unitsOfMeasure: 'Metric'
//     },
//     {
//         display: 'KJ per Liter (KJ/L)',
//         value: 'KJL',
//         unitsOfMeasure: 'Metric'
//     },
//     {
//         display: 'KJ per Gallon (KJ/gal)',
//         value: 'KJgal',
//         unitsOfMeasure: 'Imperial'
//     }

// ]

export const ProcessCoolingUnitOptions: Array<UnitOption> = [
    {
        display: 'Tons of Refrigeration (TR)',
        value: 'TR',
        unitsOfMeasure: 'Imperial'
    },
    {
        display: 'Kilowatt (kW)',
        value: 'kW',
        unitsOfMeasure: 'Metric'
    },

]