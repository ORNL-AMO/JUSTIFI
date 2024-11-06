import { AssessmentOptions, AssessmentType } from "../shared/constants/assessmentTypes";
import { UnitOption } from "../shared/constants/unitOptions";
import { UtilityType } from "../shared/constants/utilityTypes";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { UnitSettings } from "./unitSettings";
import { getDefaultUtilityEnergyUses, UtilityEnergyUse } from "./utilityEnergyUses";

export interface IdbAssessment extends IdbEntry {
    name: string,
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentType: AssessmentType,
    utilityTypes: Array<UtilityType>, // track all utility types associated with assessment type
    utilityEnergyUses: Array<UtilityEnergyUse>, // track all utility energy uses
    equipmentId: string,
    energyUse: number,
    cost: number,
    energySavings: number,
    costSavings: number,
    visitDate: Date,
    notes: string,
    implementationCost: number
}

const defaultAssessmentType: AssessmentType = "Pump";
const defaultUtilityTypes: Array<UtilityType> = AssessmentOptions.find(
    _option => _option.assessmentType === defaultAssessmentType)?.utilityTypes || [];

export function getNewIdbAssessment(userId: string, companyId: string, facilityId: string,
    facilityUnitSettings: UnitSettings): IdbAssessment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Assessment',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentType: defaultAssessmentType,
        utilityTypes: defaultUtilityTypes,
        utilityEnergyUses: getDefaultUtilityEnergyUses(facilityUnitSettings),
        equipmentId: undefined,
        energyUse: 0,
        cost: 0,
        energySavings: 0,
        costSavings: 0,
        notes: undefined,
        visitDate: undefined,
        implementationCost: 0
    }
}