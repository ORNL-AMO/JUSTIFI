import { ReportType } from "../shared/constants/reportTypes";
import { IdbEnergyOpportunity } from "./energyOpportunity";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { IdbKeyPerformanceMetricImpact } from "./keyPerformanceMetricImpact";
import { IdbNonEnergyBenefit } from "./nonEnergyBenefit";
import { IdbOnSiteVisit } from "./onSiteVisit";

export interface IdbReport extends IdbEntry {
    name: string
    userId: string,
    facilityId: string,
    companyId: string,
    onSiteVisitId: string,
    reportType: ReportType,
    assessmentOptions: Array<ReportOption>,
    energyOpportunityOptions: Array<ReportOption>,
    nonEnergyBenefitOptions: Array<ReportOption>,
    kpmImpactOptions: Array<ReportOption>,
    assessmentReportOptions: {
        includeIndividualAssessments: boolean,
        includeRollupReport: boolean
    },
    notes: string
}

export function getNewIdbReport(onSiteVisit: IdbOnSiteVisit, nonEnergyBenefits: Array<IdbNonEnergyBenefit>, energyOpportunities: Array<IdbEnergyOpportunity>, kpmImpacts: Array<IdbKeyPerformanceMetricImpact>): IdbReport {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let assessmentOptions: Array<ReportOption> = onSiteVisit.assessmentIds.map(assessmentGuid => {
        return {
            assessmentId: assessmentGuid,
            reportOptionType: 'assessment',
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
            reportOptionType: 'energyOpportunity',
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
            energyOpportunityId: neb.energyOpportunityId,
            reportOptionType: 'nonEnergyBenefit'
        }
    })
    let visitImpacts: Array<IdbKeyPerformanceMetricImpact> = kpmImpacts.filter(kpmImpact => {
        return onSiteVisit.assessmentIds.includes(kpmImpact.assessmentId)
    });
    let kpmImpactOptions: Array<ReportOption> = visitImpacts.map(impact => {
        return {
            include: true,
            nonEnergyBenefitId: impact.nebId,
            assessmentId: impact.assessmentId,
            energyOpportunityId: impact.energyOpportunityId,
            kpmImpactId: impact.guid,
            reportOptionType: 'kpmImpact'
        }
    })

    return {
        ...idbEntry,
        name: 'New Report',
        reportType: 'assessment',
        userId: onSiteVisit.userId,
        companyId: onSiteVisit.companyId,
        facilityId: onSiteVisit.facilityId,
        onSiteVisitId: onSiteVisit.guid,
        notes: '',
        assessmentOptions: assessmentOptions,
        energyOpportunityOptions: energyOpportunityOptions,
        nonEnergyBenefitOptions: nonEnergyBenefitOptions,
        kpmImpactOptions: kpmImpactOptions,
        assessmentReportOptions: {
            includeIndividualAssessments: true,
            includeRollupReport: true
        }
    }
}


export interface ReportOption {
    include: boolean,
    reportOptionType: ReportOptionType
    assessmentId: string,
    energyOpportunityId?: string,
    nonEnergyBenefitId?: string,
    kpmImpactId?: string
}

export type ReportOptionType = 'assessment' | 'energyOpportunity' | 'nonEnergyBenefit' | 'kpmImpact'