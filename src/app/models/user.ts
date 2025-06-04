import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbUser extends IdbEntry {
    skipSplashScreen: boolean,
    kpiFacilityMigrationDoneV2: boolean,
    locale: string,
}

export function getNewIdbUser(): IdbUser {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        kpiFacilityMigrationDoneV2: true,
        skipSplashScreen: false,
        locale: 'en-US',
    }
}