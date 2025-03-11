export const ProcessEquipmentTakeStockHelp = {
    sectionHelp: `These questions are designed to help you think about how the system under assessment is connected to other parts of the plant and how changes here could impact operations.`,
    whatIsTheOutput: `What does the process or manufacturing technology do? Does it make an intermediate good within a supply chain, does it make a finished product, is the product critical for accomplishing the company's strategic goals?`,
    howDoesTheProcessWork: `Describe the steps involved in the process to understand how the industrial system under assessment supports it`,
    financialStatusOfEquipment: `The age and financials of the equipment can impact how willing the site might be to equipment replacement or major overhauls. Understanding financial metrics for system can help quantify non-energy benefits related to the system (usually as cost per output: $/ton steam, $/scm air, $/gpm).`,
    financialStatusOfEquipmentQs: `Assessors can ask:<br>
                        Has the system been fully expensed? <br>
                        Is the system at end of life or are their existing plans for an upgrade? <br>
                        Does the facility use financial metrics to gauge this system's operation?`
}

export const ProcessEquipmentOperationsHelp = {
    sectionHelp: `The questions outlined in this section are to help you think about how this system, the assessment, and possible energy efficiency measures (EEMS) connect with the sites Key Performance Indicators and Metrics (KPIs and KPMs) related to operations (production, quality, operating costs).  Asking key stakeholders these questions will allow the assessor to better understand the needs of the site and any areas where energy improvement can help. Not all of these sections are relevant to every process and every site. Assessors should get some basic information on the topic areas, gauge site concern about the topic, and triage systems under assessment, and most relevant end uses, to focus on systems with projects that need more justification before investing the time for this deep dive. When asking these questions, assessors should also keep in mind that it is in relation to EEMs relevant to the system under assessment. Concerns that have no relationship to the system will not be useful to the justification of identified projects.`,
    describeOutputRate: `The needs of this process should be matched by the output of earlier systems and the output should match the needs of downstream processes or the facility’s production goals. If bottlenecked, faster output can improve downstream throughput, increasing facility production. Additionally, these processes can be impacted by underperforming energy systems.<br>
                    Understanding how operators monitor and assess the output of this process and match to downstream needs is necessary. Output of processes are often measured in batch time or for continuous processes units per hour, gpm, cfm, etc. `,
    describeOutputRateQs: `Assessors can ask:<br>
                    How is the output measured?<br>
                    Does the process output (volume) match the needs of the next stage or facility?<br>
                    Are there any misalignments between system output and plant output or needs?<br>
                    How long has this lasted?`,
    describeOutputQualityMeasurement: `The needs of this process should be matched by the output of earlier systems and the output should match the needs of downstream processes or the facility’s production goals. In addition to the volume, the quality of these processes’ output can be impacted by underperforming energy systems (intermittent service, mismatches on delivered temperature or pressure).<br>
                    Understanding how operators monitor and assess the output of this process and match to downstream needs is necessary. Overall product quality can be measured with work in progress rate, the rate of warranty claims, or product recalls. Instruments can gauge the purity of materials and calculations like first pass yield can provide a measure of effectiveness.`,
    describeOutputQualityMeasurementQs: `Assessors can ask:<br>
                    What methods are used to inspect the quality of the output of the process?<br>
                    What metrics are used to describe product quality? <br>
                    What tools/instruments are used to collect data to gauge effective/reliable operation? <br>
                    How is the data analyzed?<br>
                    Does the system output quality match needs of the next stage or facility? <br>
                    How long has any discrepancy lasted?<br>
                    How has this discrepancy impacted the plant?<br>
                    What is the cost of defects?`,
    describeMaintenanceNeeds: `It is important to understand how the equipment is maintained and how often. The need for excessive maintenance might indicate a problem that could be solved with an EEM or the need for replacement (potentially with a more efficient equipment). A lack of maintenance could also have energy efficiency implications, and increase the risk of extended downtime, especially for critical equipment without backup systems. These cost and risk reductions can be captured and included as NEBs.<br>
                    Understanding the metrics used to gauge equipment effectiveness is useful and can include Overall Equipment Effectiveness (OEE), Mean Time Between Failures (MTBF), Mean Time to Fail (MTTF), Work in Progress (WIP), Total Equipment Effective Performance (TEEP).`,
    describeMaintenanceNeedsQs: `Assessors can ask:<br>
                    How critical is this process to plant operations?<br>
                    What metrics are used to gauge equipment effectiveness (non-financial)?<br>
                    What service parts are required for this process? <br>
                    Are replacement parts/equipment in stock or need to be ordered, is labor on hand or third party?<br>
                    Does this process have backup equipment readily available? <br>
                    Does this process require more maintenance than expected?`,
    describeLaborRequirements: `Understanding the non-maintenance, day-to-day labor around this process can help quantify any impacts to labor expenses. EEMs that effect the production rate can also reduce the per product labor rate. Labor is often estimated on a per product or per time (shift/hour) basis.`,
    describeLaborRequirementsQs: `Assessors can ask:<br>
                    How are labor costs determined?<br>
                    What is the cost of labor?`,
    describeRequiredMaterials: `End use processes require materials not typically quantified in an energy assessment for operation (water, raw materials, intermediate materials, treatment chemicals) that can be reduced with EEMs. Understanding what additional materials go into this process, what impacts their use, their costs, and if there are any supply issues, can help quantify NEBs for the system`,
    describeRequiredMaterialsQs: `Assessors can ask:<br>
                    What raw materials, intermediate goods, treatment chemicals, or other materials are needed for this process?<br>
                    How much do they cost? <br>
                    Are there supply chain difficulties?<br>
                    Are there opportunities to optimize?`
}

export const ProcessEquipmentSustainabilityHelp = {
    sectionHelp: `The questions outlined in this section are to help you think about how this system, the assessment, and possible energy efficiency measures (EEMS) connect with the sites Key Performance Indicators and Metrics (KPIs and KPMs) related to sustainability (waste, water, emissions).  Asking key stakeholders these questions will allow the assessor to better understand the needs of the site and any areas where energy improvement can help. Not all of these sections are relevant to every process and every site. Assessors should get some basic information on the topic areas, gauge site concern about the topic, and triage systems under assessment, and most relevant end uses, to focus on systems with projects that need more justification before investing the time for this deep dive. When asking these questions, assessors should also keep in mind that it is in relation to EEMs relevant to the system under assessment. Concerns that have no relationship to the system will not be useful to the justification of identified projects.`,
    describeRefrigerantProcessDustEmissions: `EEMs or other opportunities found in an assessment could reduce emissions from the system. Refrigerant losses from a process cooling loop or dust emissions from bag houses could be reduced and quantified.`,
    describeRefrigerantProcessDustEmissionsQs: `Assessors can ask:<br>
                    Are there any refrigerant loops in the system?<br>
                    Are there any non-combustion emissions being generated?<br>
                    Is there any dust or particulates generated?<br>
                    Are these measured?<br>
                    Do they have an associated cost?`,
    describeWasteStreams: `Material waste and wastewater streams can be expensive to dispose of, especially if they require pretreatment, monitoring, regulation, or special disposal. EEMs can reduce waste of end use processes by reducing scrap, quality-related waste, etc.<br>
                    When quantifying a waste-related EEM, be sure to not double count as it could impact several different KPIs (expenses, quality, waste, regulatory, etc.)`,
    describeWasteStreamsQs: `Assessors can ask:<br>
                    What waste is generated and how it is disposed (sewer, landfill, recycled, special disposal)? <br>
                    Is treatment required on site? <br>
                    How much does disposal cost? <br>
                    Are there regulatory concerns about this waste?<br>
                    Are there opportunities to sell as byproduct? `,
    describeWaterInputDischarge: `EEMs often target the unnecessary consumption, heating, or moving of water to match demand of end uses (pumping, steam generation or blowdown). Water use reductions also often pair with sewage reductions, to the point where many utilities companies only meter one of the two streams.  Reductions in water use and water discharge can impact water procurement and disposal costs, especially if the water must be treated before or after use.<br>
                    When quantifying a waste-related EEM, be sure to not double count as it could impact several different KPIs (expenses, waste, water, regulatory, etc.)`,
    describeWaterInputDischargeQs: `Assessors can ask:<br>
                    Are any water streams utilized in this system?<br>
                    How much does water use and sewage cost?<br>
                    Are there any water pollution concerns in the plant and could those be alleviated?`,
    describeRegulations: `Changes to the operations of an industrial energy system can impact systems being regulated (boiler and burner emissions – CO2, N2O, dust, water quality). Changes to the system that may impact regulated qualities must be considered before implementation and projects could reduce the regulated emission, thus reducing associated fees. This could be related to air, dust, water, or waste streams/emissions.`,
    describeRegulationsQs: `Assessors can ask:<br>
                    What environmental regulations are impacted by the equipment? <br>
                    Are there any dust concerns in the plant?<br>
                    Does any waste require regulation or treatment?`
}

export const ProcessEquipmentEmployeeEngagementHelp = {
    sectionHelp: `The questions outlined in this section are to help you think about how this system, the assessment, and possible energy efficiency measures (EEMS) connect with the sites Key Performance Indicators and Metrics (KPIs and KPMs) related to employee and workplace environment (safety, employee satisfaction).  Asking key stakeholders these questions will allow the assessor to better understand the needs of the site and any areas where energy improvement can help. Not all of these sections are relevant to every process and every site. Assessors should get some basic information on the topic areas, gauge site concern about the topic, and triage systems under assessment, and most relevant end uses, to focus on systems with projects that need more justification before investing the time for this deep dive. When asking these questions, assessors should also keep in mind that it is in relation to EEMs relevant to the system under assessment. Concerns that have no relationship to the system will not be useful to the justification of identified projects.`,
    describeSafetyConcerns: `Many common EEMs can improve safety around the process. Increased insulation, reduced vibration, improved lighting, lower ambient temperature are all EEMs with safety benefits. Understand any safety concerns around the system under assessment. Safety incidents can be measured or monitored via OSHA Total recordable incident rate (TRIR), OSHA recordable incidents, non-recordable incidents, near-misses, days away from work, lost time injury rate (LTIFR).`,
    describeSafetyConcernsQs: `Assessors can ask:<br>
                    Have there been any safety concerns or incidents related to the process?<br>
                    How are safety incidents measured?<br>
                    What are the costs of these safety deficiencies?`,
    describeWorkplaceEnvironment: `Many common EEMs can improve the workplace environment around the process. Reduced noise, lower ambient temperature, improved lighting can all improve the happiness of employees, reducing absenteeism, increasing employee retention, and more.`,
    describeWorkplaceEnvironmentQs: `Assessors can ask:<br>
                    Have there been any workplace environment concerns related to the process?<br>
                    How is employee happiness or employee concerns monitored?<br>
                    Are there any quantified costs associated with this?`

}