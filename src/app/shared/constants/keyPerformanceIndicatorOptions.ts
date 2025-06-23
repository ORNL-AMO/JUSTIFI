export type PrimaryKPI = 'Strategic Growth' | 'Operations Impact' | 'Resource Efficiency' | 'Employee Environment' | 'Other' | 'Utility Use and Costs';
export const PrimaryKPIs: Array<PrimaryKPI> = ['Strategic Growth', 'Operations Impact', 'Resource Efficiency', 'Employee Environment', 'Other']
export type KeyPerformanceIndicatorValue =
    'productivity' |
    'machineUtilization' |
    'quality' |
    'materialUtilization' |
    'safety' |
    'waterConsumption' |
    'waste' |
    'reduceExpenseCost' |
    'employeeEngagementWorkforceDevelopment' |
    'employeeEngagementWorkingEnvironment' |
    'maintenanceExpense' |
    'other' |
    'airEnvironmentalQuality' |
    'customerSatisfaction' |
    'salesGrowth' |
    'utilityUse' |
    'energyUse';

export interface KeyPerformanceIndicatorOption {
    primaryKPI: PrimaryKPI,
    label: string,
    htmlLabel: string,
    optionValue: KeyPerformanceIndicatorValue
};

export const KeyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = [
    //operations
    {
        primaryKPI: 'Operations Impact',
        label: 'Productivity',
        htmlLabel: 'Productivity',
        optionValue: 'productivity'
    },
    {
        primaryKPI: 'Operations Impact',
        label: 'Other Costs',
        htmlLabel: 'Other Costs',
        optionValue: 'reduceExpenseCost'
    },
    {
        primaryKPI: 'Operations Impact',
        label: 'Quality',
        htmlLabel: 'Quality',
        optionValue: 'quality'
    },
    {
        primaryKPI: 'Operations Impact',
        label: 'Machine Utilization',
        htmlLabel: 'Machine Utilization',
        optionValue: 'machineUtilization'
    },
    {
        primaryKPI: 'Operations Impact',
        label: 'Maintenance Expense',
        htmlLabel: 'Maintenance Expense',
        optionValue: 'maintenanceExpense'
    },
    //Employee environment
    {
        primaryKPI: 'Employee Environment',
        label: 'Safety',
        htmlLabel: 'Safety',
        optionValue: 'safety'
    },
    {
        primaryKPI: 'Employee Environment',
        label: 'Workforce Development',
        htmlLabel: 'Workforce Development',
        optionValue: 'employeeEngagementWorkforceDevelopment'
    },
    {
        primaryKPI: 'Employee Environment',
        label: 'Working Environment',
        htmlLabel: 'Working Environment',
        optionValue: 'employeeEngagementWorkingEnvironment'
    },
    //Resource Efficiency
    {
        primaryKPI: 'Resource Efficiency',
        label: 'Waste',
        htmlLabel: 'Waste',
        optionValue: 'waste'
    },
    {
        primaryKPI: 'Resource Efficiency',
        label: 'Water Use, Quality, Disposal',
        htmlLabel: 'Water Use, Quality, Disposal',
        optionValue: 'waterConsumption'
    },
    {
        primaryKPI: 'Resource Efficiency',
        label: 'Air and environmental quality',
        htmlLabel: 'Air and environmental quality',
        optionValue: 'airEnvironmentalQuality'
    },
    {
        primaryKPI: 'Resource Efficiency',
        label: 'Material Utilization',
        htmlLabel: 'Material Utilization',
        optionValue: 'materialUtilization'
    },
    //Strategic Growth
    {
        primaryKPI: 'Strategic Growth',
        label: 'Customer Satisfaction',
        htmlLabel: 'Customer Satisfaction',
        optionValue: 'customerSatisfaction'
    },

    {
        primaryKPI: 'Strategic Growth',
        label: 'Sales Growth',
        htmlLabel: 'Sales Growth',
        optionValue: 'salesGrowth'
    },
    //Other
    {
        primaryKPI: 'Other',
        label: 'Other',
        htmlLabel: 'Custom KPI(s)',
        optionValue: 'other'
    }
]

export interface PrimaryKpiRename {
    original: string,
    current: PrimaryKPI
}

// KPI Category/primaryKPI updates
export const PrimaryKpiRenames: Array<PrimaryKpiRename> = [
    {
        original: 'Strategic Relationship Impact',
        current: 'Strategic Growth'
    },
    {
        original: 'Sustainability (Environmental Impact)',
        current: 'Resource Efficiency'
    },
    // Operations --> Operations Impact
    {
        original: 'Operations',
        current: 'Operations Impact'
    },
    // Energy & Material Efficiency --> Resource Efficiency
    {
        original: 'Energy and Material Efficiency',
        current: 'Resource Efficiency'
    },
    // Strategic and Growth --> Strategic Growth
    {
        original: 'Strategic and Growth',
        current: 'Strategic Growth'
    },
    // Employee and Workplace Environment --> Employee Environment
    {
        original: 'Employee and Workplace Environment',
        current: 'Employee Environment'
    },
]

export const UtilityUseKpi: KeyPerformanceIndicatorOption =
{
    primaryKPI: 'Utility Use and Costs',
    label: 'Utility Use and Costs',
    htmlLabel: 'Utility Use and Costs',
    optionValue: 'utilityUse'
}

export const EnergyUseKpi: KeyPerformanceIndicatorOption =
{
    primaryKPI: 'Utility Use and Costs',
    label: 'Energy Use and Costs',
    htmlLabel: 'Energy Use and Costs',
    optionValue: 'energyUse'
}