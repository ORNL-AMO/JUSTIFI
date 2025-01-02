import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbUser extends IdbEntry {
    skipSplashScreen: boolean,
    needsKpiFacilityMigration: boolean
}

export function getNewIdbUser(): IdbUser {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        needsKpiFacilityMigration: false,
        skipSplashScreen: false
    }
}