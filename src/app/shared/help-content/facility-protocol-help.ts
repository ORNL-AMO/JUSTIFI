import { KeyPerformanceIndicatorValue } from "../constants/keyPerformanceIndicatorOptions"

export const FacilityProtocolHelp = {
    sectionHelp: `The questions in this section aim
            to help you understand how the facility might react to the suggestion of large expenditures, how projects
            are approved and what might be needed to help encourage approval.`,

    doesFacilityTrackGHG: `Energy efficiency projects usually reduce Scope 1 and Scope 2 energy-based emissions.
            Understanding their baseline, tracking, emission factors, and any costs associated with emissions
            (internal or external) will help quantify NEBs for energy efficiency measures (EEMs).<br>
            Questions relating to other sustainability-related Key Performance Metrics (KPMs) that may be
            impacted by
            energy efficiency measures (water use, water pollution, air pollution, waste - hazardous, non-hazardous,
            recycling) are handled elsewhere in the app.`,

    equipmentAcquisition: `Understand how assets are valued and expected to perform - typical techniques include the capital asset pricing model, lifecycle assessment models. Also, understand what factors, other than cost, does the facility use to determine what equipment to purchase (long term costs or performance, energy consumption, needs of plant personnel, brands).`,
    howCostsTracked: `KPMs could include metrics regarding operational costs, productivity, safety, and quality. All of these will be covered in more detail in later stages of the Discovery Protocol. This can help assessors begin to understand potential NEBs to investigate. This is just for keeping broad notes: there will be places to enter this specific data further into the tool.`,

    financialCriteria: `Identify metrics like return on investment (ROI), Simple Payback Period and the facility's criteria.`,

    outsidePressures: `Understand outside pressures which could influence financial decisions. The assessor can understand if external pressures which influence decision making which need to be considered for making energy assessment recommendations (such as regulatory pressures, shareholders, investors, competitors).`,

    financialMetricsUsed: `Tools or resources could include simple spreadsheets or larger software platforms. This can help assessors begin to identify what and how much data will be available for calculating NEBs and who to contact. This is just for keeping broad notes: there will be places to enter this specific data further into the tool.`,
    efficiencyIncentives: `Check out the NREL Knowledge Library for Non-energy Benefits Funding Resources for potential funding sources. <a class="click-link" href="https://www.nrel.gov/manufacturing/non-energy-benefits" target="_blank">NEBs Knowledge Library</a>`,
    dependentFunding: `Understand where the facility's funding for energy projects comes from. Does the site have an energy / sustainability project budget? Is there an operations budget to fund smaller projects? Can teams co-fund projects with each other? Are they aware and can utilize external funding opportunities? Have they ever used Energy as a Service (EaaS), PACE loans, or other external avenues?`

}

export const AssociatedKPIs = {
    // TODO: the chemicalEmissions KPI is removed, putting airEnvironmentalQuality here for now
    doesFacilityTrackGHG: ['airEnvironmentalQuality'] as Array<KeyPerformanceIndicatorValue>
}