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
import { AssessmentReport, getAssessmentReport } from "./assessmentReport";
import { KeyPerformanceMetric } from "../../constants/keyPerformanceMetrics";
import { EnergyOpportunityReport, getEnergyOpportunityReport } from "./energyOpportunityReport";
import { NebReport, getNebReport } from "./nebReport";

export function getStakeholderReport(
    contact: IdbContact,
    assessmentIds: Array<string>,
    allAssessments: Array<IdbAssessment>,
    allEnergyOpportunities: Array<IdbEnergyOpportunity>,
    allNonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    facilityPerformanceMetrics: Array<KeyPerformanceMetric>,
    allKPIs: Array<IdbKeyPerformanceIndicator>,
    allEnergyEquipment: Array<IdbEnergyEquipment>,
    allProcessEquipment: Array<IdbProcessEquipment>,
    allKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = [],
    report?: IdbReport
): StakeholderReport {
    // Filter assessments, energy opportunities, and nebs based on report settings
    let includedAssessments: Array<IdbAssessment> = allAssessments.filter(a => assessmentIds.includes(a.guid));
    if (report) {
        const includedAssessmentIds = report.assessmentOptions
            ?.filter(opt => opt.include)
            .map(opt => opt.assessmentId) || [];
        includedAssessments = includedAssessments.filter(a => includedAssessmentIds.includes(a.guid));
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

    // Involvement scoring
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

    // Assessment Financial Impact
    const assessmentReports: Array<AssessmentReport> = allConnectedAssessments.map(assessment => 
        getAssessmentReport(
            assessment,
            includedEnergyOpportunities,
            includedNonEnergyBenefits,
            facilityPerformanceMetrics,
            allKPIs,
            allKpmImpacts,
            report
        )
    );
    const connectedAssessmentGuids = new Set(allConnectedAssessments.map(a => a.guid));
    const directAssessmentGuids = new Set(directAssessments.map(a => a.guid));
    const directAssessmentReports = assessmentReports.filter(r => directAssessmentGuids.has(r.assessment.guid));
    const indirectAssessmentGuids = new Set(indirectAssessmentsViaEquipment.map(a => a.guid));
    const indirectAssessmentReports = assessmentReports.filter(r => indirectAssessmentGuids.has(r.assessment.guid));
    const overlapAssessmentsGuids = new Set(overlapAssessments.map(a => a.guid));
    const overlapAssessmentReports = assessmentReports.filter(r => overlapAssessmentsGuids.has(r.assessment.guid));

    let assessmentLevelFinancialImpact = _.sumBy(assessmentReports, r => r.totalFinancialImpact);
    let assessmentLevelImplementationCost = _.sumBy(assessmentReports, r => r.totalImplementationCost);
    let assessmentLevelEnergySavings = _.sumBy(assessmentReports, r => r.totalEnergySavings);
    let assessmentLevelNonNebCostSavings = _.sumBy(assessmentReports, r => r.totalNonNebCostSavings);
    let assessmentLevelNebFinancialImpact = _.sumBy(assessmentReports, r => r.totalNebFinancialImpact);
    let assessmentLevelRebates = _.sumBy(assessmentReports, r => r.totalRebates);
    
    // EEM-level Financial Impact
    const connectedEnergyOppoGuids = new Set(indirectEnergyOpposViaEquipment.map(e => e.guid));
    const connectedEnergyOppoReports: Array<EnergyOpportunityReport> = indirectEnergyOpposViaEquipment.map(eem => {
        const eemAssessment = includedAssessments.find(a => a.guid === eem.assessmentId);
        return getEnergyOpportunityReport(
            eem,
            includedNonEnergyBenefits,
            facilityPerformanceMetrics,
            allKPIs,
            allKpmImpacts,
            eemAssessment,
            report
        );
    });
    const standaloneEnergyOppos: Array<IdbEnergyOpportunity> = indirectEnergyOpposViaEquipment.filter(
        e => !connectedAssessmentGuids.has(e.assessmentId)
    );
    const standaloneEnergyOppoGuids = new Set(standaloneEnergyOppos.map(e => e.guid));
    const standaloneEnergyOppoReports: Array<EnergyOpportunityReport> = connectedEnergyOppoReports.filter(r => standaloneEnergyOppoGuids.has(r.energyOpportunity.guid));
    let energyOpportunityLevelFinancialImpact = _.sumBy(standaloneEnergyOppoReports, r => r.totalFinancialImpact);
    let energyOpportunityLevelImplementationCost = _.sumBy(standaloneEnergyOppoReports, r => r.totalImplementationCost);
    let energyOpportunityLevelEnergySavings = _.sumBy(standaloneEnergyOppoReports, r => r.totalEnergyCostSavings);
    let energyOpportunityLevelNonNebCostSavings = _.sumBy(standaloneEnergyOppoReports, r => r.totalNonNebCostSavings);
    let energyOpportunityLevelNebFinancialImpact = _.sumBy(standaloneEnergyOppoReports, r => r.totalNebFinancialImpact);
    let energyOpportunityLevelRebates = _.sumBy(standaloneEnergyOppoReports, r => r.totalRebates);
    
    // NEB-level Financial Impact
    const connectedNebGuids = new Set(allConnectedNEBs.map(neb => neb.guid));
    const connectedNebReports: Array<NebReport> = allConnectedNEBs.map(neb =>
        getNebReport(neb, facilityPerformanceMetrics, allKPIs, allKpmImpacts, report)
    );
    const directNEBGuids = new Set(directNEBs.map(neb => neb.guid));
    const directNEBsReports = connectedNebReports.filter(r => directNEBGuids.has(r.nonEnergyBenefit.guid));
    const indirectNEBGuids = new Set(indirectNEBsViaKpmImpacts.map(neb => neb.guid));
    const indirectNEBsReports = connectedNebReports.filter(r => indirectNEBGuids.has(r.nonEnergyBenefit.guid));
    const overlapNEBGuids = new Set(overlapNEBs.map(neb => neb.guid));
    const overlapNEBsReports = connectedNebReports.filter(r => overlapNEBGuids.has(r.nonEnergyBenefit.guid));

    const standaloneNEBs: Array<IdbNonEnergyBenefit> = allConnectedNEBs.filter(neb =>
        !connectedAssessmentGuids.has(neb.assessmentId) && 
        !connectedEnergyOppoGuids.has(neb.energyOpportunityId)
    );
    const standaloneNebGuids = new Set(standaloneNEBs.map(neb => neb.guid));
    const standaloneNEBReports: Array<NebReport> = connectedNebReports.filter(r => standaloneNebGuids.has(r.nonEnergyBenefit.guid));
    let nebLevelFinancialImpact = _.sumBy(standaloneNEBReports, r => r.totalFinancialImpact);
    let nebLevelRebates = _.sumBy(standaloneNEBReports, r => r.totalRebates);
    
    // Aggregate all levels
    let totalFinancialImpact = assessmentLevelFinancialImpact + energyOpportunityLevelFinancialImpact + nebLevelFinancialImpact;
    let totalImplementationCost = assessmentLevelImplementationCost + energyOpportunityLevelImplementationCost;
    let totalEnergySavings = assessmentLevelEnergySavings + energyOpportunityLevelEnergySavings;
    let totalWaterSavings = 0; // Water savings if needed later
    let totalRebates = assessmentLevelRebates + energyOpportunityLevelRebates + nebLevelRebates;
    let finalImplementationCost = totalImplementationCost - totalRebates;
    let totalNonNebCostSavings = assessmentLevelNonNebCostSavings + energyOpportunityLevelNonNebCostSavings;
    let totalNebFinancialImpact = assessmentLevelNebFinancialImpact + energyOpportunityLevelNebFinancialImpact + nebLevelFinancialImpact;
    
    // Direct vs Indirect breakdown
    const directStandaloneNEBsGuids = directNEBs
        .filter(neb => !directAssessmentGuids.has(neb.assessmentId))
        .map(neb => neb.guid);
    const directStandaloneNebReports = directNEBsReports.filter(r =>
        directStandaloneNEBsGuids.includes(r.nonEnergyBenefit.guid)
    );
    let directFinancialImpact = _.sumBy(directAssessmentReports, r => r.totalFinancialImpact) +
        _.sumBy(directStandaloneNebReports, r => r.totalFinancialImpact);
    let directImplementationCost = _.sumBy(directAssessmentReports, r => r.totalImplementationCost);
    let directEnergySavings = _.sumBy(directAssessmentReports, r => r.totalEnergySavings);

    const indirectStandaloneEnergyOpposGuids = indirectEnergyOpposViaEquipment
        .filter(eem => !indirectAssessmentGuids.has(eem.assessmentId))
        .map(eem => eem.guid);
    const indirectStandaloneEnergyOpposReports = connectedEnergyOppoReports.filter(r =>
        indirectStandaloneEnergyOpposGuids.includes(r.energyOpportunity.guid)
    );
    
    const indirectStandaloneNEBs = indirectNEBsViaKpmImpacts.filter(neb =>
        !indirectAssessmentGuids.has(neb.assessmentId) &&
        (!neb.energyOpportunityId || !connectedEnergyOppoGuids.has(neb.energyOpportunityId))
    );
    const indirectStandaloneNEBsGuids = new Set(indirectStandaloneNEBs.map(neb => neb.guid));
    const indirectStandaloneNEBsReports = indirectNEBsReports.filter(r =>
        indirectStandaloneNEBsGuids.has(r.nonEnergyBenefit.guid)
    );

    let indirectFinancialImpact = _.sumBy(indirectAssessmentReports, r => r.totalFinancialImpact) +
        _.sumBy(indirectStandaloneEnergyOpposReports, r => r.totalFinancialImpact) +
        _.sumBy(indirectStandaloneNEBsReports, r => r.totalFinancialImpact);
    let indirectImplementationCost = _.sumBy(indirectAssessmentReports, r => r.totalImplementationCost) +
        _.sumBy(indirectStandaloneEnergyOpposReports, r => r.totalImplementationCost);
    let indirectEnergySavings = _.sumBy(indirectAssessmentReports, r => r.totalEnergySavings) +
        _.sumBy(indirectStandaloneEnergyOpposReports, r => r.totalEnergySavings);
    
    // Calculate payback periods
    let totalPaybackWithNebs = totalFinancialImpact > 0 ? finalImplementationCost / totalFinancialImpact : 0;
    let totalPaybackWithoutNebs = totalNonNebCostSavings > 0 ? totalImplementationCost / totalNonNebCostSavings : 0;
    
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
        // Summary counts
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
        // Aggregated financial metrics
        totalEnergySavings: totalEnergySavings,
        totalWaterSavings: totalWaterSavings,
        totalFinancialImpact: totalFinancialImpact,
        totalNonNebCostSavings: totalNonNebCostSavings,
        totalNebFinancialImpact: totalNebFinancialImpact,
        totalImplementationCost: totalImplementationCost,
        totalRebates: totalRebates,
        finalImplementationCost: finalImplementationCost,
        totalPaybackWithNebs: totalPaybackWithNebs,
        totalPaybackWithoutNebs: totalPaybackWithoutNebs,
        // Assessment-level breakdown
        assessmentLevelFinancialImpact: assessmentLevelFinancialImpact,
        assessmentLevelImplementationCost: assessmentLevelImplementationCost,
        assessmentLevelEnergySavings: assessmentLevelEnergySavings,
        assessmentLevelNonNebCostSavings: assessmentLevelNonNebCostSavings,
        assessmentLevelNebFinancialImpact: assessmentLevelNebFinancialImpact,
        // Energy Opportunity-level breakdown
        energyOpportunityLevelFinancialImpact: energyOpportunityLevelFinancialImpact,
        energyOpportunityLevelImplementationCost: energyOpportunityLevelImplementationCost,
        energyOpportunityLevelEnergySavings: energyOpportunityLevelEnergySavings,
        energyOpportunityLevelNonNebCostSavings: energyOpportunityLevelNonNebCostSavings,
        energyOpportunityLevelNebFinancialImpact: energyOpportunityLevelNebFinancialImpact,
        standaloneEnergyOpportunityCount: standaloneEnergyOppos.length,
        // NEB-level breakdown
        nebLevelFinancialImpact: nebLevelFinancialImpact,
        standaloneNEBCount: standaloneNEBs.length,
        // Direct vs Indirect breakdown
        directFinancialImpact: directFinancialImpact,
        directImplementationCost: directImplementationCost,
        directEnergySavings: directEnergySavings,
        indirectFinancialImpact: indirectFinancialImpact,
        indirectImplementationCost: indirectImplementationCost,
        indirectEnergySavings: indirectEnergySavings,
        involvementScore: involvementScore,
        engagementLevel: engagementLevel
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
    
    // Summary counts
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
    
    // Aggregated financial metrics
    totalEnergySavings: number;
    totalWaterSavings: number;
    totalFinancialImpact: number;
    totalNonNebCostSavings: number;
    totalNebFinancialImpact: number;
    totalImplementationCost: number;
    totalRebates: number;
    finalImplementationCost: number;
    totalPaybackWithNebs: number;
    totalPaybackWithoutNebs: number;
    
    // Assessment-level breakdown
    assessmentLevelFinancialImpact: number;
    assessmentLevelImplementationCost: number;
    assessmentLevelEnergySavings: number;
    assessmentLevelNonNebCostSavings: number;
    assessmentLevelNebFinancialImpact: number;
    
    // Energy Opportunity-level breakdown
    energyOpportunityLevelFinancialImpact: number;
    energyOpportunityLevelImplementationCost: number;
    energyOpportunityLevelEnergySavings: number;
    energyOpportunityLevelNonNebCostSavings: number;
    energyOpportunityLevelNebFinancialImpact: number;
    standaloneEnergyOpportunityCount: number;
    
    // NEB-level breakdown
    nebLevelFinancialImpact: number;
    standaloneNEBCount: number;
    
    // Direct vs Indirect breakdown
    directFinancialImpact: number;
    directImplementationCost: number;
    directEnergySavings: number;
    indirectFinancialImpact: number;
    indirectImplementationCost: number;
    indirectEnergySavings: number;
    
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