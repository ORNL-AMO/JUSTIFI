import { IdbContact } from "src/app/models/contact";
import { IdbKeyPerformanceIndicator } from "src/app/models/keyPerformanceIndicator";
import { IdbOnSiteVisit } from "src/app/models/onSiteVisit";

export function getStakeholderReport(
    contact: IdbContact,
    onSiteVisit: IdbOnSiteVisit,
    facilityKPIs: Array<IdbKeyPerformanceIndicator>
): StakeholderReport {
    // Implementation for generating Stakeholder Report
    return {
        contact: contact,
        onSiteVisit: onSiteVisit,
        facilityKPIs: facilityKPIs
    };
}

export interface StakeholderReport {
    contact: IdbContact;
    onSiteVisit: IdbOnSiteVisit;
    facilityKPIs: Array<IdbKeyPerformanceIndicator>;
}