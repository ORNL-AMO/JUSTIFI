import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbReport extends IdbEntry {
    name: string
    userId: string,
    facilityId: string,
    companyId: string,
    onSiteVisitId: string
}

export function getNewIdbReport(userId: string, companyId: string, facilityId: string, onSiteVisitId: string): IdbReport {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        name: 'New Report',
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        onSiteVisitId: onSiteVisitId
    }
}