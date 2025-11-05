import { IdbAssessment } from "src/app/models/assessment";
import { IdbContact } from "src/app/models/contact";
import { IdbEnergyEquipment } from "src/app/models/energyEquipment";
import { IdbEnergyOpportunity } from "src/app/models/energyOpportunity";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";
import { IdbNonEnergyBenefit } from "src/app/models/nonEnergyBenefit";
import { IdbProcessEquipment } from "src/app/models/processEquipment";
import { IdbReport } from "src/app/models/report";
import * as _ from 'lodash';

export function getStakeholderReport(
    contact: IdbContact,
    allAssessments: Array<IdbAssessment>,
    allEnergyOpportunities: Array<IdbEnergyOpportunity>,
    allNonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    allKPIs: Array<IdbKeyPerformanceIndicator>,
    allEnergyEquipment: Array<IdbEnergyEquipment>,
    allProcessEquipment: Array<IdbProcessEquipment>,
    report?: IdbReport
): StakeholderReport {
    // Filter assessments linked to this contact
    let contactAssessments: Array<IdbAssessment> = allAssessments.filter(assessment => 
        contact.assessmentIds.includes(assessment.guid)
    );

    // Apply report filtering if provided
    if (report) {
        // Filter assessments based on report options
        let reportAssessmentIds = report.assessmentOptions
            .filter(option => option.include)
            .map(option => option.assessmentId);
        contactAssessments = contactAssessments.filter(assessment => 
            reportAssessmentIds.includes(assessment.guid)
        );
    }

    // Filter EEMs (Energy Efficiency Measures) linked to this contact's assessments
    let contactEEMs: Array<IdbEnergyOpportunity> = allEnergyOpportunities.filter(eem => 
        contact.assessmentIds.includes(eem.assessmentId) ||
        contact.nonEnergyBenefitIds.some(nebId => {
            let neb = allNonEnergyBenefits.find(n => n.guid === nebId);
            return neb && neb.energyOpportunityId === eem.guid;
        })
    );

    // Apply report filtering for EEMs if provided
    if (report) {
        let reportEemIds = report.energyOpportunityOptions
            .filter(option => option.include)
            .map(option => option.energyOpportunityId);
        contactEEMs = contactEEMs.filter(eem => reportEemIds.includes(eem.guid));
    }

    // Filter NEBs linked to this contact
    let contactNEBs: Array<IdbNonEnergyBenefit> = allNonEnergyBenefits.filter(neb => 
        contact.nonEnergyBenefitIds.includes(neb.guid)
    );

    // Apply report filtering for NEBs if provided
    if (report) {
        let reportNebIds = report.nonEnergyBenefitOptions
            .filter(option => option.include)
            .map(option => option.nonEnergyBenefitId);
        contactNEBs = contactNEBs.filter(neb => reportNebIds.includes(neb.guid));
    }

    // Filter KPIs linked to this contact
    let contactKPIs: Array<IdbKeyPerformanceIndicator> = allKPIs.filter(kpi => 
        contact.kpiIds.includes(kpi.guid)
    );

    // Filter energy equipment linked to this contact
    let contactEnergyEquipment: Array<IdbEnergyEquipment> = allEnergyEquipment.filter(equipment => 
        contact.energyEquipmentIds.includes(equipment.guid)
    );

    // Filter process equipment linked to this contact
    let contactProcessEquipment: Array<IdbProcessEquipment> = allProcessEquipment.filter(equipment => 
        contact.processEquipmentIds.includes(equipment.guid)
    );

    // Calculate summary statistics
    let totalEnergySavings: number = _.sumBy(contactEEMs, eem => eem.energySavings || 0);
    let totalWaterSavings: number = _.sumBy(contactEEMs, eem => eem.waterSavings || 0);
    let totalCostSavings: number = _.sumBy(contactEEMs, eem => eem.costSavings || 0);
    let totalImplementationCost: number = _.sumBy(contactEEMs, eem => eem.implementationCost || 0);
    
    // Calculate payback period
    let simplePayback: number = totalCostSavings > 0 ? totalImplementationCost / totalCostSavings : 0;
    if (simplePayback === Infinity || isNaN(simplePayback)) {
        simplePayback = 0;
    }

    return {
        contact: contact,
        assessments: contactAssessments,
        energyOpportunities: contactEEMs,
        nonEnergyBenefits: contactNEBs,
        keyPerformanceIndicators: contactKPIs,
        energyEquipment: contactEnergyEquipment,
        processEquipment: contactProcessEquipment,
        summary: {
            totalAssessments: contactAssessments.length,
            totalEEMs: contactEEMs.length,
            totalNEBs: contactNEBs.length,
            totalKPIs: contactKPIs.length,
            totalEnergyEquipment: contactEnergyEquipment.length,
            totalProcessEquipment: contactProcessEquipment.length,
            totalEnergySavings: totalEnergySavings,
            totalWaterSavings: totalWaterSavings,
            totalCostSavings: totalCostSavings,
            totalImplementationCost: totalImplementationCost,
            simplePayback: simplePayback
        }
    };
}

export interface StakeholderReport {
    contact: IdbContact;
    assessments: Array<IdbAssessment>;
    energyOpportunities: Array<IdbEnergyOpportunity>;
    nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
    keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
    energyEquipment: Array<IdbEnergyEquipment>;
    processEquipment: Array<IdbProcessEquipment>;
    summary: StakeholderSummary;
}

export interface StakeholderSummary {
    totalAssessments: number;
    totalEEMs: number;
    totalNEBs: number;
    totalKPIs: number;
    totalEnergyEquipment: number;
    totalProcessEquipment: number;
    totalEnergySavings: number;
    totalWaterSavings: number;
    totalCostSavings: number;
    totalImplementationCost: number;
    simplePayback: number;
}