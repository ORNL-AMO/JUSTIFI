import { KeyPerformanceMetricValue } from "../shared/constants/keyPerformanceMetrics";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbKeyPerformanceMetricImpact extends IdbEntry {
    userId: string,
    companyId: string,
    assessmentId: string,
    facilityId: string,
    energyOpportunityId: string,
    nebId: string,
    kpmValue: KeyPerformanceMetricValue,
    kpiGuid: string,
    kpmGuid: string,
    modificationValue: number,
    costAdjustment: number,
    percentSavings?: number,
    modifiedCost?: number
}


export function getNewIdbKeyPerformanceMetricImpact(userId: string, companyId: string, facilityId: string, energyOpportunityId: string, nebId: string, kpmValue: KeyPerformanceMetricValue, assessmentId: string, kpiGuid: string, kpmGuid: string): IdbKeyPerformanceMetricImpact {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        energyOpportunityId: energyOpportunityId,
        assessmentId: assessmentId,
        nebId: nebId,
        kpiGuid: kpiGuid,
        modificationValue: undefined,
        costAdjustment: undefined,
        percentSavings: undefined,
        modifiedCost: undefined,
        kpmValue: kpmValue,
        kpmGuid: kpmGuid
    }
}