import { ReportType } from "../shared/constants/reportTypes";
import { IdbEnergyOpportunity } from "./energyOpportunity";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { IdbKeyPerformanceIndicator } from "./keyPerformanceIndicator";
import { IdbNonEnergyBenefit } from "./nonEnergyBenefit";
import { IdbOnSiteVisit } from "./onSiteVisit";

export interface IdbReport extends IdbEntry {
    name: string
    userId: string,
    facilityId: string,
    companyId: string,
    onSiteVisitId: string,
    //todo: define report type
    reportType: ReportType,
    assessmentOptions: Array<{
        include: boolean,
        guid: string
    }>,
    energyOpportunityOptions: Array<{
        include: boolean,
        guid: string,
        assessmentId: string
    }>,
    nonEnergyBenefitOptions: Array<{
        include: boolean,
        guid: string,
        energyOpportunityId: string,
        assessmentId: string
    }>,
    // kpiOptions: Array<{
    //     include: boolean,
    //     guid: string
    // }>
}

export function getNewIdbReport(onSiteVisit: IdbOnSiteVisit, nonEnergyBenefits: Array<IdbNonEnergyBenefit>, energyOpportunities: Array<IdbEnergyOpportunity>, kpis: Array<IdbKeyPerformanceIndicator>): IdbReport {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let assessmentOptions: Array<{
        include: boolean,
        guid: string
    }> = onSiteVisit.assessmentIds.map(assessmentGuid => {
        return {
            guid: assessmentGuid,
            include: true
        }
    });
    let visitEnergyOpps: Array<IdbEnergyOpportunity> = energyOpportunities.filter(opp => {
        return onSiteVisit.assessmentIds.includes(opp.assessmentId)
    })
    let energyOpportunityOptions: Array<{
        include: boolean,
        guid: string,
        assessmentId: string
    }> = visitEnergyOpps.map(opp => {
        return {
            guid: opp.guid,
            assessmentId: opp.assessmentId,
            include: true
        }
    });
    let visitNebs: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
        return onSiteVisit.assessmentIds.includes(neb.assessmentId)
    });
    let nonEnergyBenefitOptions: Array<{
        include: boolean,
        guid: string,
        assessmentId: string,
        energyOpportunityId: string
    }> = visitNebs.map(neb => {
        return {
            include: true,
            guid: neb.guid,
            assessmentId: neb.assessmentId,
            energyOpportunityId: neb.energyOpportunityId
        }
    })
    let kpiOptions: Array<{
        include: boolean,
        guid: string
    }> = new Array();

    return {
        ...idbEntry,
        name: 'New Report',
        reportType: 'assessment',
        userId: onSiteVisit.userId,
        companyId: onSiteVisit.companyId,
        facilityId: onSiteVisit.facilityId,
        onSiteVisitId: onSiteVisit.guid,
        assessmentOptions: assessmentOptions,
        energyOpportunityOptions: energyOpportunityOptions,
        nonEnergyBenefitOptions: nonEnergyBenefitOptions,
        // kpiOptions: kpiOptions
    }
}


