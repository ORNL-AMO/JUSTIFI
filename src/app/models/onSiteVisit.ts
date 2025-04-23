import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbOnSiteVisit extends IdbEntry {
    userId: string,
    facilityId: string,
    companyId: string,
    assessmentIds: Array<string>
    visitDate: Date,
    sidebarReportsOpen: boolean
}


export function getNewIdbOnSiteVisit(userId: string, companyId: string, facilityId: string): IdbOnSiteVisit {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        userId: userId,
        companyId: companyId,
        facilityId: facilityId,
        assessmentIds: [],
        visitDate: new Date(),
        sidebarReportsOpen: false
    }
}