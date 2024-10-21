import { UtilityType, UtilityTypes } from "./utilityTypes";

// export type AssessmentType = "Pump" | "Fan" | "Process heating" | "Steam" | "Compressed Air" | "Water" | "Treasure Hunt" | "Other";
// export const AssessmentTypes: Array<AssessmentType> = ["Pump",  "Fan", "Process heating", "Steam", "Compressed Air", "Water", "Treasure Hunt", "Other"];

export type AssessmentType = "Pump" | "Fan" | "Process heating" | "Steam" | "Compressed Air" | "Treasure Hunt" | "Other";
export const AssessmentTypes: Array<AssessmentType> = ["Pump",  "Fan", "Process heating", "Steam", "Compressed Air", "Treasure Hunt", "Other"];

// Define the ONE - MANY relationship between Assessment Type and Utility Type
export interface AssessmentOption {
    assessmentType: AssessmentType,
    utilityTypes: Array<UtilityType>
}

export const AssessmentOptions: Array<AssessmentOption> = [
    {assessmentType: "Pump", utilityTypes: ['Electricity']},
    {assessmentType: "Fan", utilityTypes: ['Electricity']},
    {assessmentType: "Process heating", utilityTypes: ['Natural Gas', 'Other Fuels', 'Electricity']},
    {assessmentType: "Steam", utilityTypes: ['Natural Gas', "Other Fuels", 'Electricity', 'Steam']},
    {assessmentType: "Compressed Air", utilityTypes: ['Electricity', 'Compressed Air']},
    // {assessmentType: "Water", utilityTypes: ['Water']},
    {assessmentType: "Treasure Hunt", utilityTypes: UtilityTypes},
    {assessmentType: "Other", utilityTypes: UtilityTypes}
];