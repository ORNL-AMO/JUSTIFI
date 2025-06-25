import { EquipmentType } from "../shared/constants/equipmentTypes"
import { UtilityType } from "../shared/constants/utilityTypes"
import { getNewIdbEntry, IdbEntry } from "./idbEntry"

export interface IdbProcessEquipment extends IdbEntry {
    userId: string,
    facilityId: string,
    companyId: string,
    equipmentName: string,
    // size: number,
    // operatingHours: number,
    // loadFactor: number,
    notes: string,
    energyOpportunityIds: Array<string>,
    energyEquipmentIds: Array<string>,
    processEquipmentIds: Array<string>
    // equipmentType: EquipmentType,
    // utilityType: UtilityType


    //Discovery Questions
    //takeStock
    whatIsTheOutput: string,
    howDoesTheProcessWork: string,
    financialStatusOfEquipment: string,
    financialMetricsUsed: string,
    //operations
    describeOutputRate: string,
    describeOutputQualityMeasurement: string,
    describeMaintenanceNeeds: string,
    describeLaborRequirements: string,
    describeRequiredMaterials: string
    //sustainability
    describeRefrigerantProcessDustEmissions: string,
    describeWasteStreams: string,
    describeWaterInputDischarge: string,
    describeRegulations: string
    //employeeEngagement
    describeSafetyConcerns: string,
    describeWorkplaceEnvironment: string,
    assessmentIds: Array<string>
}

export function getNewIdbProcessEquipment(userId: string, companyId: string, facilityId: string): IdbProcessEquipment {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        equipmentName: 'New End Use',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        // size: undefined,
        // operatingHours: undefined,
        // loadFactor: undefined,
        notes: undefined,
        // equipmentType: undefined,
        // utilityType: undefined,
        energyOpportunityIds: new Array(),
        energyEquipmentIds: new Array(),
        processEquipmentIds: new Array(),
        whatIsTheOutput: '',
        howDoesTheProcessWork: '',
        financialStatusOfEquipment: '',
        financialMetricsUsed: '',
        describeOutputRate: '',
        describeOutputQualityMeasurement: '',
        describeMaintenanceNeeds: '',
        describeLaborRequirements: '',
        describeRequiredMaterials: '',
        describeRefrigerantProcessDustEmissions: '',
        describeWasteStreams: '',
        describeWaterInputDischarge: '',
        describeRegulations: '',
        describeSafetyConcerns: '',
        describeWorkplaceEnvironment: '',
        assessmentIds: new Array()
    }
}