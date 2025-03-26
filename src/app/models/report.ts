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
    assessmentOptions: Array<ReportOption>,
    energyOpportunityOptions: Array<ReportOption>,
    nonEnergyBenefitOptions: Array<ReportOption>,
    // kpiOptions: Array<{
    //     include: boolean,
    //     guid: string
    // }>
}

export function getNewIdbReport(onSiteVisit: IdbOnSiteVisit, nonEnergyBenefits: Array<IdbNonEnergyBenefit>, energyOpportunities: Array<IdbEnergyOpportunity>, kpis: Array<IdbKeyPerformanceIndicator>): IdbReport {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let assessmentOptions: Array<ReportOption> = onSiteVisit.assessmentIds.map(assessmentGuid => {
        return {
            assessmentId: assessmentGuid,
            include: true
        }
    });
    let visitEnergyOpps: Array<IdbEnergyOpportunity> = energyOpportunities.filter(opp => {
        return onSiteVisit.assessmentIds.includes(opp.assessmentId)
    })
    let energyOpportunityOptions: Array<ReportOption> = visitEnergyOpps.map(opp => {
        return {
            energyOpportunityId: opp.guid,
            assessmentId: opp.assessmentId,
            include: true
        }
    });
    let visitNebs: Array<IdbNonEnergyBenefit> = nonEnergyBenefits.filter(neb => {
        return onSiteVisit.assessmentIds.includes(neb.assessmentId)
    });
    let nonEnergyBenefitOptions: Array<ReportOption> = visitNebs.map(neb => {
        return {
            include: true,
            nonEnergyBenefitId: neb.guid,
            assessmentId: neb.assessmentId,
            energyOpportunityId: neb.energyOpportunityId
        }
    })
    // let kpiOptions: Array<ReportOption> = new Array();

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


export interface ReportOption {
    include: boolean,
    assessmentId?: string,
    energyOpportunityId?: string,
    nonEnergyBenefitId?: string
}