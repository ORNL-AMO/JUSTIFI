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
    energyOpportunityIds: Array<string>
    // equipmentType: EquipmentType,
    // utilityType: UtilityType
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
        energyOpportunityIds: new Array()
    }
}