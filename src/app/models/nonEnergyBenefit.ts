import { NebOption, NebOptionValue } from "../shared/constants/nonEnergyBenefitOptions";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbNonEnergyBenefit extends IdbEntry {
    name: string
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentId: string,
    includeNote: boolean,
    notes: string,
    energyOpportunityId: string,
    nebOptionValue: NebOptionValue,
    isCustom: boolean,
    costImpact: number,
    costImpactType: 'annual' | 'oneTime'
}

export function getNewIdbNonEnergyBenefit(userId: string, companyId: string, facilityId: string, assessmentId: string, energyOpportunityId: string, nebOption: NebOption, isCustom: boolean): IdbNonEnergyBenefit {
    let nebOptionValue: NebOptionValue;
    let name: string = 'New MB';
    if (nebOption) {
        nebOptionValue = nebOption.optionValue;
        name = nebOption.label;
    }
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: name,
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentId: assessmentId,
        notes: undefined,
        energyOpportunityId: energyOpportunityId,
        includeNote: false,
        nebOptionValue: nebOptionValue,
        isCustom: isCustom,
        costImpact: 0,
        costImpactType: 'annual'
    }
}