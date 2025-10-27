import { IdbEntry, getNewIdbEntry } from "./idbEntry";

export interface IdbContact extends IdbEntry {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    role: string,
    team: string,
    guid: string,
    companyId: string,
    facilityIds: Array<string>,
    assessmentIds: Array<string>,
    processEquipmentIds: Array<string>,
    nonEnergyBenefitIds: Array<string>,
    energyEquipmentIds: Array<string>,
    kpiIds: Array<string>,
    userId: string,
    notes: string,
    archivedFacilityId?: string
}

export function getNewIdbContact(userId: string, companyId: string): IdbContact {
    let idbEntry: IdbEntry = getNewIdbEntry();
    return {
        ...idbEntry,
        firstName: 'New',
        lastName: 'Contact',
        userId: userId,
        companyId: companyId,
        facilityIds: [],
        assessmentIds: [],
        processEquipmentIds: [],
        nonEnergyBenefitIds: [],
        energyEquipmentIds: [],
        phone: undefined,
        email: undefined,
        role: undefined,
        team: undefined,
        notes: undefined,
        kpiIds: [],
    }
}

export type ContactContext = 'processEquipment' | 'assessment' | 'facility' | 'company' | 'KPI' | 'nonEnergyBenefit' | 'energyEquipment';