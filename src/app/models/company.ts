import { GeneralInformation, getGeneralInformation } from "./generalInformation";
import { IdbEntry, getNewIdbEntry } from "./idbEntry";
import { UnitSettings, getDefaultUnitSettings } from "./unitSettings";

export interface IdbCompany extends IdbEntry {
    userId: string,
    generalInformation: GeneralInformation,
    displayFacilities: boolean,
    companyEnergyUnit: string,
}

export function getNewIdbCompany(userId: string): IdbCompany {
    let idbEntry: IdbEntry = getNewIdbEntry();
    let generalInformation: GeneralInformation = getGeneralInformation('');
    return {
        ...idbEntry,
        userId: userId,
        generalInformation: generalInformation,
        displayFacilities: true,
        companyEnergyUnit: 'MMBtu',
    }
}

