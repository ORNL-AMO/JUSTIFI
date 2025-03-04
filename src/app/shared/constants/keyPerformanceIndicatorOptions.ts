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
    'waterConsumption' |
    'waste' |
    'reduceExpenseCost' |
    'employeeEngagementWorkforceDevelopment' |
    'employeeEngagementWorkingEnvironment' |
    'maintenanceExpense' |
    'other' |
    'airPollutantEmissions';

export interface KeyPerformanceIndicatorOption {
    primaryKPI: PrimaryKPI,
    label: string,
    htmlLabel: string,
    optionValue: KeyPerformanceIndicatorValue
};

export const KeyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = [
    //operations
    {
        primaryKPI: 'Operations',
        label: 'Productivity',
        htmlLabel: 'Productivity',
        optionValue: 'productivity'
    },
    {
        primaryKPI: 'Operations',
        label: 'Other Costs',
        htmlLabel: 'Other Costs',
        optionValue: 'reduceExpenseCost'
    },
    {
        primaryKPI: 'Operations',
        label: 'Quality',
        htmlLabel: 'Quality',
        optionValue: 'quality'
    },
    {
        primaryKPI: 'Operations',
        label: 'Machine Utilization',
        htmlLabel: 'Machine Utilization',
        optionValue: 'machineUtilization'
    },
    {
        primaryKPI: 'Operations',
        label: 'Material Utilization',
        htmlLabel: 'Material Utilization',
        optionValue: 'materialUtilization'
    },
    {
        primaryKPI: 'Operations',
        label: 'Maintenance Expense',
        htmlLabel: 'Maintenance Expense',
        optionValue: 'maintenanceExpense'
    },
    //Employee and workplace environment
    {
        primaryKPI: 'Employee and Workplace Environment',
        label: 'Safety',
        htmlLabel: 'Safety',
        optionValue: 'safety'
    },
    {
        primaryKPI: 'Employee and Workplace Environment',
        label: 'Workforce Development',
        htmlLabel: 'Workforce Development',
        optionValue: 'employeeEngagementWorkforceDevelopment'
    },
    {
        primaryKPI: 'Employee and Workplace Environment',
        label: 'Working Environment',
        htmlLabel: 'Working Environment',
        optionValue: 'employeeEngagementWorkingEnvironment'
    },
    //Sustainability (Environmental Impact)
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'GHG Emissions',
        htmlLabel: 'GHG Emissions',
        optionValue: 'chemicalEmissions'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Waste',
        htmlLabel: 'Waste',
        optionValue: 'waste'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Water Use, Disposal, Quality',
        htmlLabel: 'Water Use, Disposal, Quality',
        optionValue: 'waterConsumption'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Dust Emissions',
        htmlLabel: 'Dust Emissions',
        optionValue: 'dustEmissions'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Air Pollutant Emissions',
        htmlLabel: 'Air Pollutant Emissions',
        optionValue: 'airPollutantEmissions'
    },
    {
        primaryKPI: 'Sustainability (Environmental Impact)',
        label: 'Reduce Refrigerant Gas Emissions',
        htmlLabel: 'Reduce Refrigerant Gas Emissions',
        optionValue: 'reduceRefrigerantGasEmissions'
    },
    //Strategic relationship impact
    {
        primaryKPI: 'Strategic Relationship Impact',
        label: 'Strategic Relationship Impact',
        htmlLabel: 'Strategic Relationship Impact',
        optionValue: 'strategicRelationshipImpact'
    },
]