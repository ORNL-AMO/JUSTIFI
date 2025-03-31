import { KeyPerformanceIndicatorValue } from "../constants/keyPerformanceIndicatorOptions"

export const FacilityProtocolHelp = {
        sectionHelp: `The questions in this section aim
            to help you understand how the facility might react to the suggestion of large expenditures, how projects
            are approved and what might be needed to help encourage approval.`,

        doesFacilityTrackGHG: `Energy efficiency projects usually reduce Scope 1 and Scope 2 energy-based emissions.
            Understanding their baseline, tracking, emission factors, and any costs associated with emissions
            (internal or external) will help quantify NEBs for energy efficiency measures (EEMs).<br>
            Questions relating to other sustainability-related Key Performance Indicators (KPIs) that may be
            impacted by
            energy efficiency measures (water use, water pollution, air pollution, waste - hazardous, non-hazardous,
            recycling) are handled elsewhere in the app.`,

        equipmentAcquisition: `Understand how assets are valued and expected to perform - typical techniques include the capital asset pricing model, lifecycle assessment models. Also, understand what factors, other than cost, does the facility use to determine what equipment to purchase (long term costs or performance, energy consumption, needs of plant personnel, brands).`,
        howCostsTracked: `This can help assessors begin to identify what and how much data will be available for calculating NEBs and
            who to contact. This is just for keeping broad notes: there will be places to enter this specific data
            further into the tool.`,

        financialCriteria: `Identify metrics like return on investment (ROI), Simple Payback Period and the facility's criteria.`,

        outsidePressures: `Understand if there is any outside pressure that could influence the decision-making of the sector of the
            company getting the assessment, e.g., activist investors or private equity firms, highly competitive sector.
            This can help find further metrics and stakeholders for potential NEBs.`,

        financialMetricsUsed: `Understand if the facility utilizes payback, return on investment (ROI), internal rate of return (IRR), or other metrics and how they calculate these values.`,
        associatedCosts: `THIS ONE NEEDS HELP TEXT`,
        efficiencyIncentives: `
            Is the facility aware of any utility, state public service commission, federal energy incentives that it may
            qualify for? The DSIRE database may help find opportunties for incentives <a target="_blank"
                href="https://www.dsireusa.org/">https://www.dsireusa.org/</a>`,
        dependentFunding: `Understand where the facility's funding for energy projects comes from. Does the site have an energy / sustainability project budget? Does the company have an energy / sustainability project budget? Have they ever used Energy as a Service (EaaS), PACE loans, or other external avenues?`

}

export const AssociatedKPIs = {
    // TODO: the chemicalEmissions KPI is removed, putting airEnvironmentalQuality here for now
    doesFacilityTrackGHG: ['airEnvironmentalQuality'] as Array<KeyPerformanceIndicatorValue>
}