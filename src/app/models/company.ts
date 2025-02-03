import { GeneralInformation, getGeneralInformation } from "./generalInformation";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { UnitSettings, getDefaultUnitSettings } from "./unitSettings";

export interface IdbCompany extends IdbEntry {
    userId: string,
    generalInformation: GeneralInformation,
    displayFacilities: boolean,
    companyEnergyUnit: string,
    sidebarOpen: boolean,
    sidebarContactsOpen: boolean
}

export function getNewIdbCompany(userId: string): IdbCompany {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let generalInformation: GeneralInformation = getGeneralInformation('New Company');
    return {
        ...idbEntry,
        userId: userId,
        generalInformation: generalInformation,
        displayFacilities: true,
        companyEnergyUnit: 'MMBtu',
        sidebarOpen: true,
        sidebarContactsOpen: false
    }
}

