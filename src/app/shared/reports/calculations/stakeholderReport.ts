import { IdbAssessment } from "src/app/models/assessment";
import { IdbContact } from "src/app/models/contact";
import { IdbEnergyEquipment } from "src/app/models/energyEquipment";
import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { IdbProcessEquipment } from "src/app/models/processEquipment";
import { IdbReport } from "src/app/models/report";
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
    // Direct assessments (champion, main contact)
    let directAssessments: Array<IdbAssessment> = allAssessments.filter(a => contact.assessmentIds?.includes(a.guid));

    // Apply report filtering if provided (only keep included assessments)
    if (report) {
        const includedAssessmentIds = report.assessmentOptions
            ?.filter(opt => opt.include)
            .map(opt => opt.assessmentId) || [];
        directAssessments = directAssessments.filter(a => includedAssessmentIds.includes(a.guid));
    }

    // NEBs directly associated with contact
    let directNEBs: Array<IdbNonEnergyBenefit> = allNonEnergyBenefits.filter(neb => contact.nonEnergyBenefitIds?.includes(neb.guid));
    if (report) {
        const nebIdsIncluded = report.nonEnergyBenefitOptions?.filter(o => o.include).map(o => o.nonEnergyBenefitId) || [];
        directNEBs = directNEBs.filter(n => nebIdsIncluded.includes(n.guid));
    }

    // Energy & Process equipment directly associated with contact
    let directEnergyEquipment: Array<IdbEnergyEquipment> = allEnergyEquipment.filter(eq => contact.energyEquipmentIds?.includes(eq.guid));
    let directProcessEquipment: Array<IdbProcessEquipment> = allProcessEquipment.filter(pe => contact.processEquipmentIds?.includes(pe.guid));

    // KPIs directly linked
    let directKPIs: Array<IdbKeyPerformanceIndicator> = allKPIs.filter(kpi => contact.kpiIds?.includes(kpi.guid));

    // Indirect associations:
    // 1. EEMs (Energy Opportunities) - ALL are indirect, linked via equipment/process equipment
    const equipmentLinkedEemGuids = new Set<string>();
    directEnergyEquipment.forEach(eq => eq.energyOpportunityIds?.forEach(id => equipmentLinkedEemGuids.add(id)));
    directProcessEquipment.forEach(pe => pe.energyOpportunityIds?.forEach(id => equipmentLinkedEemGuids.add(id)));
    let indirectEEMsViaEquipment: Array<IdbEnergyOpportunity> = allEnergyOpportunities.filter(e => equipmentLinkedEemGuids.has(e.guid));
    if (report) {
        const eemIdsIncluded = report.energyOpportunityOptions?.filter(o => o.include).map(o => o.energyOpportunityId) || [];
        indirectEEMsViaEquipment = indirectEEMsViaEquipment.filter(e => eemIdsIncluded.includes(e.guid));
    }

    // 2. Indirect via KPI impacts (NEB -> KPM Impact -> KPI) where contact has KPI
    const contactKpiSet = new Set(contact.kpiIds || []);
    let indirectKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = allKpmImpacts.filter(impact => contactKpiSet.has(impact.kpiGuid));
    let indirectNEBsViaKpmImpacts: Array<IdbNonEnergyBenefit> = indirectKpmImpacts
        .map(imp => allNonEnergyBenefits.find(neb => neb.guid === imp.nebId))
        .filter((neb): neb is IdbNonEnergyBenefit => !!neb && !directNEBs.some(dn => dn.guid === neb.guid));
    let indirectAssessmentsViaKpmImpacts: Array<IdbAssessment> = indirectKpmImpacts
        .map(imp => allAssessments.find(a => a.guid === imp.assessmentId))
        .filter((a): a is IdbAssessment => !!a && !directAssessments.some(da => da.guid === a.guid));

    // 3. Indirect via equipment link to assessments (equipment/process equipment referencing assessmentIds)
    const equipmentAssessmentIds = new Set<string>();
    directEnergyEquipment.forEach(eq => eq.assessmentIds?.forEach(id => equipmentAssessmentIds.add(id)));
    directProcessEquipment.forEach(pe => pe.assessmentIds?.forEach(id => equipmentAssessmentIds.add(id)));
    let indirectAssessmentsViaEquipment: Array<IdbAssessment> = allAssessments.filter(a => equipmentAssessmentIds.has(a.guid) && !directAssessments.some(da => da.guid === a.guid));

    // Consolidated assessment list (direct + indirect unique)
    const allRelatedAssessments: Array<IdbAssessment> = _.uniqBy([
        ...directAssessments,
        ...indirectAssessmentsViaEquipment,
        ...indirectAssessmentsViaKpmImpacts
    ], 'guid');

    // Involvement scoring (simple heuristic weights)
    const weights = {
        directAssessment: 5,
        directSubEntity: 3,
        indirectEem: 2,
        indirectKpmImpact: 2,
        indirectEquipmentAssessment: 1
    };
    let involvementScore = 0;
    involvementScore += directAssessments.length * weights.directAssessment;
    involvementScore += (directNEBs.length + directEnergyEquipment.length + directProcessEquipment.length) * weights.directSubEntity;
    involvementScore += indirectEEMsViaEquipment.length * weights.indirectEem;
    involvementScore += indirectKpmImpacts.length * weights.indirectKpmImpact;
    involvementScore += indirectAssessmentsViaEquipment.length * weights.indirectEquipmentAssessment;

    let engagementLevel: 'High' | 'Medium' | 'Low';
    if (involvementScore >= 25) {
        engagementLevel = 'High';
    } else if (involvementScore >= 12) {
        engagementLevel = 'Medium';
    } else {
        engagementLevel = 'Low';
    }

    // Calculate savings based on all indirect EEMs (via equipment)
    const allEemsForSavings = [...indirectEEMsViaEquipment];
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
        indirectAssessmentsViaKpmImpacts: indirectAssessmentsViaKpmImpacts,
        energyOpportunitiesIndirectViaEquipment: indirectEEMsViaEquipment,
        nonEnergyBenefitsDirect: directNEBs,
        nonEnergyBenefitsIndirectViaKpmImpacts: indirectNEBsViaKpmImpacts,
        keyPerformanceIndicatorsDirect: directKPIs,
        energyEquipmentDirect: directEnergyEquipment,
        processEquipmentDirect: directProcessEquipment,
        kpmImpactsIndirect: indirectKpmImpacts,
        allRelatedAssessments: allRelatedAssessments,
        summary: {
            totalDirectAssessments: directAssessments.length,
            totalIndirectAssessments: indirectAssessmentsViaEquipment.length + indirectAssessmentsViaKpmImpacts.length,
            totalIndirectEEMs: indirectEEMsViaEquipment.length,
            totalDirectNEBs: directNEBs.length,
            totalIndirectNEBs: indirectNEBsViaKpmImpacts.length,
            totalDirectKPIs: directKPIs.length,
            totalIndirectKpmImpacts: indirectKpmImpacts.length,
            totalDirectEnergyEquipment: directEnergyEquipment.length,
            totalDirectProcessEquipment: directProcessEquipment.length,
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
    indirectAssessmentsViaKpmImpacts: Array<IdbAssessment>;
    allRelatedAssessments: Array<IdbAssessment>;
    energyOpportunitiesIndirectViaEquipment: Array<IdbEnergyOpportunity>;
    nonEnergyBenefitsDirect: Array<IdbNonEnergyBenefit>;
    nonEnergyBenefitsIndirectViaKpmImpacts: Array<IdbNonEnergyBenefit>;
    keyPerformanceIndicatorsDirect: Array<IdbKeyPerformanceIndicator>;
    energyEquipmentDirect: Array<IdbEnergyEquipment>;
    processEquipmentDirect: Array<IdbProcessEquipment>;
    kpmImpactsIndirect: Array<IdbKeyPerformanceMetricImpact>;
    summary: StakeholderSummary;
}

export interface StakeholderSummary {
    totalDirectAssessments: number;
    totalIndirectAssessments: number;
    totalIndirectEEMs: number;
    totalDirectNEBs: number;
    totalIndirectNEBs: number;
    totalDirectKPIs: number;
    totalIndirectKpmImpacts: number;
    totalDirectEnergyEquipment: number;
    totalDirectProcessEquipment: number;
    totalEnergySavings: number;
    totalWaterSavings: number;
    totalCostSavings: number;
    totalImplementationCost: number;
    simplePayback: number;
    involvementScore: number;
    engagementLevel: 'High' | 'Medium' | 'Low';
}