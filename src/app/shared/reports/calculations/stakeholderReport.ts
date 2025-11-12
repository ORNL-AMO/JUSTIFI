import { IdbAssessment } from "src/app/models/assessment";
import { IdbContact } from "src/app/models/contact";
import { IdbEnergyEquipment } from "src/app/models/energyEquipment";
import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { IdbProcessEquipment } from "src/app/models/processEquipment";
import { IdbReport, ReportOption } from "src/app/models/report";
import { IdbKeyPerformanceMetricImpact } from "src/app/models/keyPerformanceMetricImpact";
import * as _ from 'lodash';

export function getStakeholderReport(
    contact: IdbContact,
    allAssessments: Array<IdbAssessment>,
    allEnergyOpportunities: Array<IdbEnergyOpportunity>,
    allNonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    allKPIs: Array<IdbKeyPerformanceIndicator>,
    allEnergyEquipment: Array<IdbEnergyEquipment>,
    allProcessEquipment: Array<IdbProcessEquipment>,
    allKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = [],
    report?: IdbReport
): StakeholderReport {
    // Filter assessments, energy opportunities, and nebs based on report settings
    let includedAssessments: Array<IdbAssessment> = allAssessments;
    if (report) {
        const includedAssessmentIds = report.assessmentOptions
            ?.filter(opt => opt.include)
            .map(opt => opt.assessmentId) || [];
        includedAssessments = allAssessments.filter(a => includedAssessmentIds.includes(a.guid));
    }
    let includedEnergyOpportunities: Array<IdbEnergyOpportunity> = filterEnergyOpps(allEnergyOpportunities, includedAssessments, report?.energyOpportunityOptions);
    let includedNonEnergyBenefits: Array<IdbNonEnergyBenefit> = filterNebs(allNonEnergyBenefits, includedAssessments, report?.nonEnergyBenefitOptions);

    // Direct assessments
    let directAssessments: Array<IdbAssessment> = includedAssessments
        .filter(assessment => contact.assessmentIds?.includes(assessment.guid));

    // NEBs directly associated with contact
    let directNEBs: Array<IdbNonEnergyBenefit> = includedNonEnergyBenefits.filter(neb => contact.nonEnergyBenefitIds?.includes(neb.guid));

    // Energy & Process equipment, KPIs directly associated with contact
    let directEnergyEquipment: Array<IdbEnergyEquipment> = allEnergyEquipment.filter(eq => contact.energyEquipmentIds?.includes(eq.guid));
    let directProcessEquipment: Array<IdbProcessEquipment> = allProcessEquipment.filter(pe => contact.processEquipmentIds?.includes(pe.guid));
    let directKPIs: Array<IdbKeyPerformanceIndicator> = allKPIs.filter(kpi => contact.kpiIds?.includes(kpi.guid));

    // Indirect associations:
    // 1. Indirect Energy Opportunities linked via equipment/process equipment
    const contactEnergyOppoGuidsViaEquipment = new Set<string>();
    directEnergyEquipment.forEach(eq => eq.energyOpportunityIds?.forEach(id => contactEnergyOppoGuidsViaEquipment.add(id)));
    directProcessEquipment.forEach(pe => pe.energyOpportunityIds?.forEach(id => contactEnergyOppoGuidsViaEquipment.add(id)));
    let indirectEnergyOpposViaEquipment: Array<IdbEnergyOpportunity> = includedEnergyOpportunities.filter(e => contactEnergyOppoGuidsViaEquipment.has(e.guid));

    // 2. Indirect NEBs via KPM impacts and KPIs (NEB -> KPM Impact -> KPI)
    const contactKpiSet = new Set(contact.kpiIds || []);
    let indirectKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = allKpmImpacts.filter(impact => contactKpiSet.has(impact.kpiGuid));
    let indirectNEBsViaKpmImpacts: Array<IdbNonEnergyBenefit> = includedNonEnergyBenefits
        .filter(neb => indirectKpmImpacts.some(imp => imp.nebId === neb.guid));

    // 3. Indirect assessment via equipment
    const equipmentAssessmentIds = new Set<string>();
    directEnergyEquipment.forEach(eq => eq.assessmentIds?.forEach(id => equipmentAssessmentIds.add(id)));
    directProcessEquipment.forEach(pe => pe.assessmentIds?.forEach(id => equipmentAssessmentIds.add(id)));
    let indirectAssessmentsViaEquipment: Array<IdbAssessment> = includedAssessments
        .filter(a => equipmentAssessmentIds.has(a.guid));

    // Consolidated assessment list
    const allConnectedAssessments: Array<IdbAssessment> = _.uniqBy([
        ...directAssessments,
        ...indirectAssessmentsViaEquipment,
    ], 'guid');
    const overlapAssessments: Array<IdbAssessment> = directAssessments.filter(da =>
        indirectAssessmentsViaEquipment.some(ia => ia.guid === da.guid)
    );

    // Consolidated NEB list
    const allConnectedNEBs: Array<IdbNonEnergyBenefit> = _.uniqBy([
        ...directNEBs,
        ...indirectNEBsViaKpmImpacts
    ], 'guid');
    const overlapNEBs: Array<IdbNonEnergyBenefit> = directNEBs.filter(dneb =>
        indirectNEBsViaKpmImpacts.some(ineb => ineb.guid === dneb.guid)
    );

    // Involvement scoring (simple heuristic weights)
    const weights = {
        directAssessment: 5,
        directNeb: 3,
        indirectEnergyOpp: 2,
        indirectNeb: 2,
        indirectAssessment: 1
    };
    let involvementScore = 0;
    involvementScore += directAssessments.length * weights.directAssessment;
    involvementScore += directNEBs.length * weights.directNeb;
    involvementScore += indirectEnergyOpposViaEquipment.length * weights.indirectEnergyOpp;
    involvementScore += indirectNEBsViaKpmImpacts.length * weights.indirectNeb;
    involvementScore += indirectAssessmentsViaEquipment.length * weights.indirectAssessment;

    let engagementLevel: StakeholderEngagementLevel;
    if (involvementScore >= 25) {
        engagementLevel = 'High';
    } else if (involvementScore >= 12) {
        engagementLevel = 'Medium';
    } else {
        engagementLevel = 'Low';
    }

    // Calculate savings based on all indirect EEMs (via equipment)
    const allEemsForSavings = [...indirectEnergyOpposViaEquipment];
    let totalEnergySavings: number = _.sumBy(allEemsForSavings, eem => eem.energySavings || 0);
    let totalWaterSavings: number = _.sumBy(allEemsForSavings, eem => eem.waterSavings || 0);
    let totalCostSavings: number = _.sumBy(allEemsForSavings, eem => eem.costSavings || 0);
    let totalImplementationCost: number = _.sumBy(allEemsForSavings, eem => eem.implementationCost || 0);
    
    // Calculate payback period
    let simplePayback: number = totalCostSavings > 0 ? totalImplementationCost / totalCostSavings : 0;
    if (simplePayback === Infinity || isNaN(simplePayback)) {
        simplePayback = 0;
    }

    return {
        contact: contact,
        directAssessments: directAssessments,
        indirectAssessmentsViaEquipment: indirectAssessmentsViaEquipment,
        overlapAssessments: overlapAssessments,
        allConnectedAssessments: allConnectedAssessments,
        indirectEnergyOpposViaEquipment: indirectEnergyOpposViaEquipment,
        directNEBs: directNEBs,
        indirectNEBsViaKpmImpacts: indirectNEBsViaKpmImpacts,
        allConnectedNEBs: allConnectedNEBs,
        overlapNEBs: overlapNEBs,
        directKPIs: directKPIs,
        directEnergyEquipment: directEnergyEquipment,
        directProcessEquipment: directProcessEquipment,
        indirectKpmImpacts: indirectKpmImpacts,
        summary: {
            totalDirectAssessments: directAssessments.length,
            totalIndirectAssessments: indirectAssessmentsViaEquipment.length,
            totalIndirectEnergyOppos: indirectEnergyOpposViaEquipment.length,
            totalDirectNEBs: directNEBs.length,
            totalIndirectNEBs: indirectNEBsViaKpmImpacts.length,
            totalKPIs: directKPIs.length,
            totalIndirectKpmImpacts: indirectKpmImpacts.length,
            totalEnergyEquipment: directEnergyEquipment.length,
            totalProcessEquipment: directProcessEquipment.length,
            totalEquipment: directEnergyEquipment.length + directProcessEquipment.length,
            totalEnergySavings: totalEnergySavings,
            totalWaterSavings: totalWaterSavings,
            totalCostSavings: totalCostSavings,
            totalImplementationCost: totalImplementationCost,
            simplePayback: simplePayback,
            involvementScore: involvementScore,
            engagementLevel: engagementLevel
        }
    };
}

export interface StakeholderReport {
    contact: IdbContact;
    directAssessments: Array<IdbAssessment>;
    indirectAssessmentsViaEquipment: Array<IdbAssessment>;
    overlapAssessments: Array<IdbAssessment>;
    allConnectedAssessments: Array<IdbAssessment>;
    indirectEnergyOpposViaEquipment: Array<IdbEnergyOpportunity>;
    directNEBs: Array<IdbNonEnergyBenefit>;
    indirectNEBsViaKpmImpacts: Array<IdbNonEnergyBenefit>;
    allConnectedNEBs: Array<IdbNonEnergyBenefit>;
    overlapNEBs: Array<IdbNonEnergyBenefit>;
    directKPIs: Array<IdbKeyPerformanceIndicator>;
    directEnergyEquipment: Array<IdbEnergyEquipment>;
    directProcessEquipment: Array<IdbProcessEquipment>;
    indirectKpmImpacts: Array<IdbKeyPerformanceMetricImpact>;
    summary: StakeholderSummary;
}

export interface StakeholderSummary {
    totalDirectAssessments: number;
    totalIndirectAssessments: number;
    totalIndirectEnergyOppos: number;
    totalDirectNEBs: number;
    totalIndirectNEBs: number;
    totalKPIs: number;
    totalIndirectKpmImpacts: number;
    totalEnergyEquipment: number;
    totalProcessEquipment: number;
    totalEquipment: number;
    totalEnergySavings: number;
    totalWaterSavings: number;
    totalCostSavings: number;
    totalImplementationCost: number;
    simplePayback: number;
    involvementScore: number;
    engagementLevel: 'High' | 'Medium' | 'Low';
}

export type StakeholderEngagementLevel = 'High' | 'Medium' | 'Low';

function filterEnergyOpps(energyOpportunities: Array<IdbEnergyOpportunity>, includedAssessments: Array<IdbAssessment>, energyOppReportOptions?: Array<ReportOption>): Array<IdbEnergyOpportunity> {
    let includedAssessmentGuids = includedAssessments.map(a => a.guid);
    let filteredEnergyOpportunities: Array<IdbEnergyOpportunity> = energyOpportunities.filter(energyOpportunity => {
        return includedAssessmentGuids.includes(energyOpportunity.assessmentId);
    });
    if (energyOppReportOptions) {
        const energyOppoIdsIncluded = energyOppReportOptions.filter(o => o.include).map(o => o.energyOpportunityId);
        filteredEnergyOpportunities = filteredEnergyOpportunities.filter(e => energyOppoIdsIncluded.includes(e.guid));
    }
    return filteredEnergyOpportunities;
}

function filterNebs(nebs: Array<IdbNonEnergyBenefit>, includedAssessments: Array<IdbAssessment>, nebReportOptions?: Array<ReportOption>): Array<IdbNonEnergyBenefit> {
    let includedAssessmentGuids = includedAssessments.map(a => a.guid);
    let filteredNefs: Array<IdbNonEnergyBenefit> = nebs.filter(neb => {
        return includedAssessmentGuids.includes(neb.assessmentId);
    });
    if (nebReportOptions) {
        const nebIdsIncluded = nebReportOptions.filter(o => o.include).map(o => o.nonEnergyBenefitId);
        filteredNefs = filteredNefs.filter(n => nebIdsIncluded.includes(n.guid));
    }
    return filteredNefs;
}