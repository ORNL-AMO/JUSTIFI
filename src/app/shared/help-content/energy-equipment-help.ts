export const EnergyEquipmentTakeStockHelp = {
    sectionHelp: `These questions are designed to help you think about how the system is connected to other parts of the plant and how changes here could impact operations.`,
    howSupportPlantQs: `Assessors can ask: <br>
                    Does it supply a utility for the whole plant?<br>
                    Provide flow for a system?<br> 
                    Is it critical to another system that is critical to overall plant operations?`,
    adverseEffects: `The assessors should look at the end use applications as part of the system and if they notice an
                    energy efficiency problem like unstable pneumatic pressure at the end use applications they should inquire
                    as to whether the unstable pressure is causing other problems like product quality issues. This would then
                    give them a reason to inquire about how the plant assesses quality and what they try to do about it.<br>
                    Once an assessor finds a non-energy problem that is cause by energy inefficiency in the industrial
                    system they want to know how much it is costing the company so that if they recommend a project that makes
                    the energy inefficient condition go away, they can reasonably estimate the total cost savings for the
                    plant.`,
    equipmentFinancialStatus: `The age and financials of the equipment can impact how willing the site might be to equipment
                    replacement or major overhauls. Understanding financial metrics for system can help quantify non-energy benefits
                    related to the system (usually as cost per output: $/ton steam, $/scm air, $/gpm).`,
    equipmentFinancialStatusQs: `Assessors can ask: <br>
                    Has the system been fully expensed?<br>
                    Is the system at end of life or are their existing plans for an upgrade?<br>
                    Does the facility use financial metrics to gauge this system's operation?<br>`

}

export const EnergyEquipmentOperationsHelp = {
    sectionHelp: `The questions outlined in this section are to help you think about how this system, the assessment,
                and possible energy efficiency measures (EEMS) connect with the sites Key Performance Indicators and
                Metrics (KPIs and KPMs) related to operations (production, quality, operating costs). Asking key
                stakeholders these questions will allow the assessor to better understand the needs of the site and
                any areas where energy improvement can help. Not all of these sections are relevant to every system
                and every site. Assessors should get some basic information on the topic areas, gauge site concern
                about the topic, and triage systems under assessment to focus on systems with projects that need
                more justification before investing the time for this deep dive.`,
    describeOutputOfSystem: `The output of the system should match the needs of downstream processes. The output flowrate,
                    pressure, temperature and other properties can all have a high impact on the operations and quality
                    of downstream operations. If bottlenecked, faster output of industrial energy systems can improve
                    downstream throughput, increasing production. Conversely, overproduction in industrial energy system
                    can create waste and unnecessary costs. A mismatch between output and needs should be corrected.<br>
                    Understanding how operators monitor and assess the output of this system and match to downstream
                    needs is necessary for the energy and NEB assessment. Output of these systems is often measured in
                    batch time, or for continuous processes units per hour, gpm, cfm, etc.`,
    describeOutputOfSystemQs: `Assessors can ask:<br>
                    How is the output measured? <br>
                    Does the system output match the needs of the next stage or facility?<br>
                    Are there any misalignments between system output and plant output or needs? <br>
                    How has this discrepancy impacted the plant?<br>
                    How long has this lasted?<br>
                    What tools, instruments, calculations are used to collect data to gauge effective/reliable operation? <br>
                    How is the data analyzed? <br>`,
    describeServicingNeeds: `It is important to understand how the system is maintained and how often. The need for excessive
                    maintenance might indicate a problem that could be solved with an EEM or the need for replacement
                    (potentially with a more efficient equipment). A lack of maintenance could also have energy
                    efficiency implications, and increase the risk of extended downtime, especially for critical
                    equipment without backup systems. These cost and risk reductions can be captured and included as
                    NEBs.<br>
                    Understanding the metrics used to gauge equipment effectiveness is useful and can include Overall
                    Equipment Effectiveness (OEE), Mean Time Between Failures (MTBF), Mean Time to Fail (MTTF), Work in
                    Progress (WIP), Total Equipment Effective Performance (TEEP)`,
    describeServicingNeedsQs: `Assessors can ask:<br>
                    How critical is this system to plant operations?<br>
                    What metrics are used to gauge equipment effectiveness (non-financial)?<br>
                    What service parts are required for this process?<br>
                    Are replacement parts/equipment in stock or need to be ordered, is labor on hand or third party?<br>
                    Does this system have backup equipment readily available? <br>
                    Does this system require more maintenance than expected?`,
    describeLaborRequirements: `Understanding the non-maintenance, day-to-day labor around this process can help quantify any
                    impacts to labor expenses. While many industrial systems do not have non-maintenance labor
                    associated with them, process heating systems and utility-scale systems like compressed air and
                    steam may have dedicated labor. EEMs that effect the production rate can also reduce the per product
                    labor rate. Labor is often estimated on a per product or per time (shift/hour) basis.`,
    describeLaborRequirementsQs: `Assessors can ask:<br>
                    How are labor costs determined?<br>
                    What is the cost of labor?`,
    describeSystemMaterials: `Industrial energy systems often require additional materials for operation (water, filtration,
                    treatment chemicals or materials) that can be reduced with EEMs. Understanding what additional
                    materials go into this system, what impacts their use, their costs, and if there are any supply
                    issues, can help quantify NEBs for the system.`,
    describeSystemMaterialsQs: `Assessors can ask:<br>
                    What raw materials, intermediate goods, treatment chemicals, or other materials are needed for this system?<br>
                    How much do they cost? <br>
                    Are there supply chain difficulties?<br>
                    Are there opportunities to optimize?`
}