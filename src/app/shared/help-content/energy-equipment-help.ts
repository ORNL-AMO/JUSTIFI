export const EnergyEquipmentTakeStockHelp = {
    sectionHelp: `These questions are designed to help you think about how the system is connected to other parts of the plant and how changes here could impact operations. <u>Not all of these questions are relevant to every system and every site.</u> Only topics related to projects needing further justification and have benefits relating to site interests should be pursued further.`,
    howSupportPlant: `Understand how this system interacts with the rest of the facility. Use the End Use button to connect this system to End Uses or the Systems button to connect to other Industrial Systems.`,
    howSupportPlantQs: `Assessors can ask: <br>
                    Does it supply a utility for the whole plant or a flow for a system? <br>
                    Is it critical to another system that is critical to overall plant operations?`,
    adverseEffects: `Use the End Use button to connect this system to <b>End Uses</b> or the <b>Systems</b> button to connect to other Industrial Systems.`,
    equipmentFinancialStatus: `The age and financials of the equipment can impact how willing the site might be to equipment replacement or major overhauls.`,
    equipmentFinancialStatusQs: `Assessors can ask: <br>
                    Has the system been fully expensed? <br>
                    Is the system at end of life or are their existing plans for an upgrade? <br>`,
    financialMetricsUsed: `Understanding financial metrics for system can help quantify operational benefits related to the system (usually as cost per output: /tonsteam, /scm air, $/gpm).`,
    financialMetricsUsedQs: `Assessors can ask: <br>
                    Does the facility use financial metrics to gauge this system's operation? <br>`
}

export const EnergyEquipmentOperationsHelp = {
    sectionHelp: `The questions outlined in this section are to help you think about how this system, the assessment, and possible energy efficiency measures (EEMS) connect with the sites Key Performance Indicators and Metrics (KPIs and KPMs) related to operations (production, quality, operating costs). <u>Not all of these sections are relevant to every system and every site.</u> Only topics related to projects needing further justification and have benefits relating to site interests should be pursued further.`,
    describeOutputOfSystem: `Understand how operators monitor and assess the output of this system (higher pressure fluid, steam, compressed air) and match to downstream needs is necessary for the energy and operational cost savings assessment. Output of these systems is often measured in batch time, or for continuous processes units per hour, gpm, cfm, etc.`,
    describeOutputOfSystemQs: `Assessors can ask:<br>
                    How is the output measured? <br>
                    Does the system output match the needs of the next stage or facility?<br>
                    Are there any misalignments between system output and plant output or needs? <br>
                    How has this discrepancy impacted the plant?<br>
                    How long has this lasted?<br>
                    What tools, instruments, calculations are used to collect data to gauge effective/reliable operation? <br>
                    How is the data analyzed? <br>`,
    describeServicingNeeds: `Understand the maintenance of the system including total downtime (how often and why) and downtime length (operational or supply chain delays). This includes understanding importance of the system to plant operations, the service parts required (availability of backups, expensive, or long lead-time orders).`,
    describeServicingNeedsQs: `Assessors can ask:<br>
                    How critical is this system to plant operations?<br>
                    What metrics are used to gauge equipment effectiveness (non-financial)?<br>
                    What service parts are required for this process?<br>
                    Are replacement parts/equipment in stock or need to be ordered, is labor on hand or third party?<br>
                    Does this system have backup equipment readily available? <br>
                    Does this system require more maintenance than expected?`,
    describeLaborRequirements: `Understand how changes to the system could impact the non-maintenance, day-to-day labor around this process (maintenance costs would be covered within the maintenance question). While many industrial systems do not have non-maintenance labor (productivity-related labor) associated with them, process heating systems and utility-scale systems like compressed air and steam may have dedicated labor.`,
    describeLaborRequirementsQs: `Assessors can ask:<br>
                    How are labor costs determined?<br>
                    What is the cost of labor?`,
    describeSystemMaterials: `Understanding what additional materials go into this system (water, filtration, treatment chemicals or materials), what impacts their use, their costs, and if there are any supply issues, can help quantify operational benefits for the system.`,
    describeSystemMaterialsQs: `Assessors can ask:<br>
                    What raw materials, intermediate goods, treatment chemicals, or other materials are needed for this system?<br>
                    How much do they cost? <br>
                    Are there supply chain difficulties?<br>
                    Are there opportunities to optimize?`
}

export const EnergyEquipmentSustainabilityHelp = {
    sectionHelp: `The questions outlined in this section are to help you think about how this system, the assessment, and possible energy efficiency measures (EEMS) connect with the sites Key Performance Indicators and Metrics (KPIs and KPMs) related to sustainability (waste, water, emissions).  <u>Not all of these sections are relevant to every system and every site.</u> Only topics related to projects needing further justification and have benefits relating to site interests should be pursued further.`,
    describeWasteStreams: `EEMs can reduce waste of industrial energy systems by reducing blowdown, treatment chemical use, or improving the output of process heating systems.<br>
                    When quantifying a waste-related EEM, be sure to not double count as it could impact several different KPIs (expenses, waste, water, regulatory, etc.)`,
    describeWasteStreamsQs: `Assessors can ask:<br>
                    What waste is generated and how it is disposed (sewer, landfill, recycled, special disposal)? <br>
                    Is treatment required on site? <br>
                    How much does disposal cost? <br>
                    Are there regulatory concerns about this waste?<br>
                    Are there opportunities to sell as byproduct?`,
    describeWaterInputDischarge: `EEMs often target the unnecessary consumption, heating, or moving of water to match demand of end uses (pumping, steam generation or blowdown). Water use reductions also often pair with sewage reductions, to the point where many utilities companies only meter one of the two streams - be sure to account for both water use and discharge impacts. Projects reducing water can also reduce treatment needs, both for water and wastewater.<br>
                    When quantifying a waste-related EEM, be sure to not double count as it could impact several different KPIs (expenses, waste, water, regulatory, etc.)`,
    describeWaterInputDischargeQs: `Assessors can ask:<br>
                    Are any water streams utilized in this system?<br>
                    How much does water use and sewage cost?<br>
                    Are there any water pollution concerns in the plant and could those be alleviated?`,
    describeRefrigerantProcessDustEmissions: `EEMs or other opportunities found in an assessment could reduce emissions from the system.`,
    describeRefrigerantProcessDustEmissionsQs: `Assessors can ask:<br>
                    Are there any refrigerant loops in the system?<br>
                    Are there any non-combustion emissions being generated?<br>
                    Is there any dust or particulates generated?<br>
                    Are these measured?<br>
                    Do they have an associated cost?`,
    describeRegulations: `EEMs regarding the operations of an industrial energy system can impact systems being regulated (boiler and burner emissions – CO2, N2O, dust, water quality), impacting potential fees or monitoring expenses. This could be related to air, dust, water, or waste streams/emissions.`,
    describeRegulationsQs: `Assessors can ask:<br>
                    What environmental regulations are impacted by the equipment? <br>
                    Does any waste require regulation or treatment?`
}

export const EnergyEquipmentEmployeeEngagementHelp = {
    sectionHelp: `The questions outlined in this section are to help you think about how this system, the assessment, and possible energy efficiency measures (EEMS) connect with the sites Key Performance Indicators and Metrics (KPIs and KPMs) related to employee and workplace environment (safety, employee satisfaction).  Asking key stakeholders these questions will allow the assessor to better understand the needs of the site and any areas where energy improvement can help. Not all of these sections are relevant to every system and every site. Assessors should get some basic information on the topic areas, gauge site concern about the topic, and triage systems under assessment to focus on systems with projects that need more justification before investing the time for this deep dive. `,
    describeSafetyConcerns: `Many common EEMs can improve safety around the system. Safety incidents can be measured or monitored via OSHA Total recordable incident rate (TRIR), OSHA recordable incidents, non-recordable incidents, near-misses, days away from work, lost time injury rate (LTIFR).`,
    describeSafetyConcernsQs: `Assessors can ask:<br>
                    Have there been any safety concerns or incidents related to the system?<br>
                    How are safety incidents measured?<br>
                    What are the costs of these safety deficiencies?`,
    describeWorkplaceEnvironment: `Many common EEMs can improve the workplace environment around the system. Reduced noise, lower ambient temperature, improved lighting can all improve the happiness of employees, reducing absenteeism, increasing employee retention, and more.`,
    describeWorkplaceEnvironmentQs: `Assessors can ask:<br>
                    Have there been any workplace environment concerns related to the system?<br>
                    How is employee happiness or employee concerns monitored?<br>
                    Are there any quantified costs associated with this?`
}