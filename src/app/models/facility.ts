import { GeneralInformation, getGeneralInformation } from "./generalInformation";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { UnitSettings, getDefaultUnitSettings } from "./unitSettings";

export interface IdbFacility extends IdbEntry {
    // name: string,
    companyId: string,
    userId: string,
    unitSettings: UnitSettings,
    generalInformation: GeneralInformation,
    energyUse: number,
    energyCost: number,
    waterCost: number,
    cost: number,
    sidebarOpen: boolean,
    sidebarKPIsOpen: boolean,
    sidebarSystemInventoryOpen: boolean,
    sidebarEndUseInventoryOpen: boolean,
    sidebarPreAssessmentOpen: boolean,
    //protocol
    doesFacilityTrackGHG: string,
    equipmentAcquisition: string,
    howCostsTracked: string,
    financialCriteria: string,
    outsidePressures: string,
    financialMetricsUsed: string,
    efficiencyIncentives: string,
    dependentFunding: string,
    isExample?: boolean
}

export function getNewIdbFacility(userId: string, companyId: string): IdbFacility {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let defaultSettings: UnitSettings = getDefaultUnitSettings();
    let generalInformation: GeneralInformation = getGeneralInformation('New Facility');
    return {
        ...idbEntry,
        userId: userId,
        companyId: companyId,
        unitSettings: defaultSettings,
        generalInformation: generalInformation,
        energyUse: 0,
        energyCost: 0,
        waterCost: 0,
        cost: 0,
        sidebarOpen: true,
        sidebarKPIsOpen: false,
        sidebarSystemInventoryOpen: false,
        sidebarEndUseInventoryOpen: false,
        sidebarPreAssessmentOpen: false,
        doesFacilityTrackGHG: '',
        equipmentAcquisition: '',
        howCostsTracked: '',
        financialCriteria: '',
        outsidePressures: '',
        financialMetricsUsed: '',
        efficiencyIncentives: '',
        dependentFunding: ''
    }
}
