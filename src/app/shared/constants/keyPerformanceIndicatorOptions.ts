export type PrimaryKPI = 'Strategic and Growth' | 'Operations' | 'Energy and Material Efficiency' | 'Employee and Workplace Environment' | 'Other';
export const PrimaryKPIs: Array<PrimaryKPI> = ['Strategic and Growth', 'Operations', 'Energy and Material Efficiency', 'Employee and Workplace Environment', 'Other']
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
    'salesGrowth';

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
    //Energy and Material Efficiency
    {
        primaryKPI: 'Energy and Material Efficiency',
        label: 'Waste',
        htmlLabel: 'Waste',
        optionValue: 'waste'
    },
    {
        primaryKPI: 'Energy and Material Efficiency',
        label: 'Water Use, Disposal, Quality',
        htmlLabel: 'Water Use, Disposal, Quality',
        optionValue: 'waterConsumption'
    },
    {
        primaryKPI: 'Energy and Material Efficiency',
        label: 'Air and environmental quality',
        htmlLabel: 'Air and environmental quality',
        optionValue: 'airEnvironmentalQuality'
    },
    //Strategic and Growth
    {
        primaryKPI: 'Strategic and Growth',
        label: 'Customer Satisfaction',
        htmlLabel: 'Customer Satisfaction',
        optionValue: 'customerSatisfaction'
    },

    {
        primaryKPI: 'Strategic and Growth',
        label: 'Sales Growth',
        htmlLabel: 'Sales Growth',
        optionValue: 'salesGrowth'
    }
]