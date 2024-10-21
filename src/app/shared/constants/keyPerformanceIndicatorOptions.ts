export type PrimaryKPI = 'Strategic Relationship Impact' | 'Operations' | 'Sustainability (Environmental Impact)' | 'Employee and Workplace Environment' | 'Other';
export const PrimaryKPIs: Array<PrimaryKPI> = ['Strategic Relationship Impact', 'Operations', 'Sustainability (Environmental Impact)', 'Employee and Workplace Environment', 'Other']
export type KeyPerformanceIndicatorValue =
    'strategicRelationshipImpact' |
    'productivity' |
    'machineUtilization' |
    'quality' |
    'materialUtilization' |
    'safety' |
    'reduceRefrigerantGasEmissions' |
    'chemicalEmissions' |
    'dustEmissions' |
    'sewageVolume' |
    'waterConsumption' |
    'reduceNonconformingProductWaste' |
    'wasteReductionNonHazardous' |
    'wasteReductionHazardous' |
    'reduceExpenseCost' |
    'improveSpaceUtilization' |
    'employeeEngagementWorkforceDevelopment' |
    'employeeEngagementWorkingEnvironment' | 
    'other';

export interface KeyPerformanceIndicatorOption {
    primaryKPI: PrimaryKPI,
    label: string,
    htmlLabel: string,
    optionValue: KeyPerformanceIndicatorValue
};

export const KeyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = [
    {
        primaryKPI: 'Strategic Relationship Impact',
        label: 'Strategic Relationship Impact',
        htmlLabel: 'Strategic Relationship Impact',
        optionValue: 'strategicRelationshipImpact'
    },
    {
        primaryKPI: 'Operations',
        label: 'Productivity',
        htmlLabel: 'Productivity',
        optionValue: 'productivity'
    },
    {
        primaryKPI: 'Operations',
        label: 'Machine Utilization',
        htmlLabel: 'Machine Utilization',
        optionValue: 'machineUtilization'
    },
    {
        primaryKPI: 'Operations',
        label: 'Quality',
        htmlLabel: 'Quality',
        optionValue: 'quality'
    },
    {
        primaryKPI: 'Operations',
        label: 'Material Utilization',
        htmlLabel: 'Material Utilization',
        optionValue: 'materialUtilization'
    },
    {
        primaryKPI: 'Operations',
        label: 'Improve Space Utilization',
        htmlLabel: 'Improve Space Utilization',
        optionValue: 'improveSpaceUtilization'
    },
    {
        primaryKPI: 'Operations',
        label: 'Reduce Expense Cost',
        htmlLabel: 'Reduce Expense Cost',
        optionValue: 'reduceExpenseCost'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Waste Reduction: Hazardous',
        htmlLabel: 'Waste Reduction: Hazardous',
        optionValue: 'wasteReductionHazardous'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Waste Reduction: Non-Hazardous',
        htmlLabel: 'Waste Reduction: Non-Hazardous',
        optionValue: 'wasteReductionNonHazardous'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Reduce Nonconforming and Product Waste',
        htmlLabel: 'Reduce Nonconforming &amp; Product Waste',
        optionValue: 'reduceNonconformingProductWaste'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Water Consumption',
        htmlLabel: 'Water Consumption',
        optionValue: 'waterConsumption'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Sewage Volume',
        htmlLabel: 'Sewage Volume',
        optionValue: 'sewageVolume'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Dust Emissions',
        htmlLabel: 'Dust Emissions',
        optionValue: 'dustEmissions'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'CO, CO2, NOx, SOx emissions',
        htmlLabel: 'CO, CO<sub>2</sub>, NO<sub>x</sub>, SO<sub>x</sub> emissions',
        optionValue: 'chemicalEmissions'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Reduce Refrigerant Gas Emissions',
        htmlLabel: 'Reduce Refrigerant Gas Emissions',
        optionValue: 'reduceRefrigerantGasEmissions'
    },
    {
        primaryKPI: 'Employee and Workplace Environment',
        label: 'Safety',
        htmlLabel: 'Safety',
        optionValue: 'safety'
    },
    {
        primaryKPI: 'Employee and Workplace Environment',
        label: 'Employee Engagement - Working Environment',
        htmlLabel: 'Employee Engagement - Working Environment',
        optionValue: 'employeeEngagementWorkingEnvironment'
    },
    {
        primaryKPI: 'Employee and Workplace Environment',
        label: 'Employee Engagement - Workforce Development',
        htmlLabel: 'Employee Engagement - Workforce Development',
        optionValue: 'employeeEngagementWorkforceDevelopment'
    },
]