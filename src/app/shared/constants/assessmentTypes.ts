import { UtilityType, UtilityTypes } from "./utilityTypes";

// export type AssessmentType = "Pump" | "Fan" | "Process heating" | "Steam" | "Compressed Air" | "Water" | "Treasure Hunt" | "Other";
// export const AssessmentTypes: Array<AssessmentType> = ["Pump",  "Fan", "Process heating", "Steam", "Compressed Air", "Water", "Treasure Hunt", "Other"];

export type AssessmentType = "Pump" | "Fan" | "Process heating" | "Steam" | "Compressed Air" | "Treasure Hunt" | "Motor" | "Lighting" | "Building Envelope" | "Water" | "Other";
export const AssessmentTypes: Array<AssessmentType> = ["Pump", "Fan", "Process heating", "Steam", "Compressed Air", "Treasure Hunt", "Motor", "Lighting", "Building Envelope", "Water", "Other"];

// Define the ONE - MANY relationship between Assessment Type and Utility Type
export interface AssessmentOption {
    assessmentType: AssessmentType,
    utilityTypes: Array<UtilityType>
}

export const AssessmentOptions: Array<AssessmentOption> = [
    { assessmentType: "Pump", utilityTypes: ['Electricity', 'Water', 'Waste Water'] },
    { assessmentType: "Fan", utilityTypes: ['Electricity'] },
    { assessmentType: "Process heating", utilityTypes: ['Natural Gas', 'Other Fuels', 'Electricity', 'Water', 'Waste Water'] },
    { assessmentType: "Steam", utilityTypes: ['Natural Gas', "Other Fuels", 'Electricity', 'Steam', 'Water', 'Waste Water'] },
    { assessmentType: "Compressed Air", utilityTypes: ['Electricity', 'Compressed Air'] },
    // {assessmentType: "Water", utilityTypes: ['Water']},
    { assessmentType: "Treasure Hunt", utilityTypes: UtilityTypes },
    { assessmentType: "Motor", utilityTypes: ['Electricity'] },
    { assessmentType: "Lighting", utilityTypes: ['Electricity'] },
    { assessmentType: "Building Envelope", utilityTypes: UtilityTypes },
    { assessmentType: "Water", utilityTypes: UtilityTypes },
    { assessmentType: "Other", utilityTypes: UtilityTypes }
];