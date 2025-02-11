import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbUser extends IdbEntry {
    skipSplashScreen: boolean,
    kpiFacilityMigrationDone: boolean,
    locale: string,
}

export function getNewIdbUser(): IdbUser {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        kpiFacilityMigrationDone: true,
        skipSplashScreen: false,
        locale: 'en-US',
    }
}