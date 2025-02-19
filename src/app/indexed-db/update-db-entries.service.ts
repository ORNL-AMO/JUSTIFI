import { Injectable } from '@angular/core';
import { KeyPerformanceIndicatorsIdbService } from './key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from './key-performance-metric-impacts-idb.service';
import { CompanyIdbService } from './company-idb.service';
import { FacilityIdbService } from './facility-idb.service';
import { IdbCompany } from '../models/company';
import { firstValueFrom } from 'rxjs';
import { IdbFacility } from '../models/facility';
import { IdbKeyPerformanceIndicator } from '../models/keyPerformanceIndicator';
import { IdbUser } from '../models/user';
import { UserIdbService } from './user-idb.service';
import { IdbKeyPerformanceMetricImpact } from '../models/keyPerformanceMetricImpact';
import { getGUID } from '../shared/helpFunctions';
import { ProcessEquipmentIdbService } from './process-equipment-idb.service';
import { IdbProcessEquipment } from '../models/processEquipment';
import { EnergyEquipmentIdbService } from './energy-equipment-idb.service';
import { IdbEnergyEquipment } from '../models/energyEquipment';

@Injectable({
  providedIn: 'root'
})
export class UpdateDbEntriesService {

  constructor(
    private keyPerformanceIndicatorsIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private facilityIdbService: FacilityIdbService,
    private userIdbService: UserIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) { }

  async updateDbEntries(user: IdbUser): Promise<IdbUser> {
    let userNeedsUpdate: boolean = false;
    if (!user.kpiFacilityMigrationDone) {
      await this.updateToFacilityKPI();
      user.kpiFacilityMigrationDone = true;
      userNeedsUpdate = true;
    }
    await this.updateProcessEquipment();
    await this.updateEnergyEquipment();
    if (userNeedsUpdate) {
      user = await firstValueFrom(this.userIdbService.updateWithObservable(user));
      this.userIdbService.user.next(user);
    }
    return user;
  }

  //migration of KPIs to facility level
  async updateToFacilityKPI() {
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = await firstValueFrom(this.keyPerformanceIndicatorsIdbService.getAll());
    //get kpis without facility ids
    let noFacilityKeyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = keyPerformanceIndicators.filter(indicator => {
      return indicator.facilityId == undefined;
    });
    if (noFacilityKeyPerformanceIndicators.length > 0) {
      let facilities: Array<IdbFacility> = await firstValueFrom(this.facilityIdbService.getAll());
      let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.getAll());

      for (let i = 0; i < noFacilityKeyPerformanceIndicators.length; i++) {
        let kpi: IdbKeyPerformanceIndicator = noFacilityKeyPerformanceIndicators[i];
        // move kpi to all facilities in company
        let kpiFacilities: Array<IdbFacility> = facilities.filter(facility => { return facility.companyId == kpi.companyId });
        //if multiple facilities in a company
        //need to create copies of kpis with uniq guids

        for (let f = 0; f < kpiFacilities.length; f++) {
          let facility: IdbFacility = kpiFacilities[f];
          let facilityMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = keyPerformanceMetricImpacts.filter(impact => { return impact.facilityId == facility.guid });
          kpi.facilityId = facility.guid;
          if (f == 0) {
            await firstValueFrom(this.keyPerformanceIndicatorsIdbService.updateWithObservable(kpi));
          } else {
            //create new kpis when multiple facilities;
            let originalKpiGuid: string = kpi.guid;
            let originalKpmGuids: Array<{ originalGuid: string, newGuid: string }> = kpi.performanceMetrics.map(metric => { return { originalGuid: metric.guid, newGuid: undefined } });

            let newKpiGuid: string = getGUID();
            kpi.guid = newKpiGuid;
            let associatedImpacts: Array<IdbKeyPerformanceMetricImpact> = facilityMetricImpacts.filter(impact => { return impact.kpiGuid == originalKpiGuid });
            //add new kpi with updated guids
            for (let m = 0; m < kpi.performanceMetrics.length; m++) {
              let newGuid: string = getGUID();
              let kpmGuidIndex: number = originalKpmGuids.findIndex(kpmGuid => { return kpmGuid.originalGuid == kpi.performanceMetrics[m].guid });
              originalKpmGuids[kpmGuidIndex].newGuid = newGuid;
              kpi.performanceMetrics[m].guid = newGuid;
            };
            delete kpi.id;
            await firstValueFrom(this.keyPerformanceIndicatorsIdbService.addWithObservable(kpi));
            //updates guid for associated impacts
            for (let a = 0; a < associatedImpacts.length; a++) {
              let impact: IdbKeyPerformanceMetricImpact = associatedImpacts[a];
              impact.kpiGuid = newKpiGuid;
              let newKpmGuid: string = originalKpmGuids.find(ogGuid => { return ogGuid.originalGuid == impact.kpmGuid }).newGuid;
              impact.kpmGuid = newKpmGuid;
              await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.updateWithObservable(impact));
            }
          }
        }
      }
    }
  }

  async updateProcessEquipment() {
    let processEquipments: Array<IdbProcessEquipment> = await firstValueFrom(this.processEquipmentIdbService.getAll());
    let missingOpportunityIds: Array<IdbProcessEquipment> = processEquipments.filter(equipment => {
      return equipment.energyOpportunityIds == undefined || equipment.energyEquipmentIds == undefined || equipment.processEquipmentIds == undefined || equipment.assessmentIds == undefined;
    });
    for (let i = 0; i < missingOpportunityIds.length; i++) {
      if (missingOpportunityIds[i].energyOpportunityIds == undefined) {
        missingOpportunityIds[i].energyOpportunityIds = new Array();
      }
      if (missingOpportunityIds[i].energyEquipmentIds == undefined) {
        missingOpportunityIds[i].energyEquipmentIds = new Array();
      }
      if (missingOpportunityIds[i].processEquipmentIds == undefined) {
        missingOpportunityIds[i].processEquipmentIds = new Array();
      }
      if (missingOpportunityIds[i].assessmentIds == undefined) {
        missingOpportunityIds[i].assessmentIds = new Array();
      }
      await firstValueFrom(this.processEquipmentIdbService.updateWithObservable(missingOpportunityIds[i]));
    }
  }

  async updateEnergyEquipment() {
    let energyEquipments: Array<IdbEnergyEquipment> = await firstValueFrom(this.energyEquipmentIdbService.getAll());
    let missingAssessmentIds: Array<IdbEnergyEquipment> = energyEquipments.filter(equipment => {
      return equipment.assessmentIds == undefined || equipment.energyEquipmentIds == undefined || equipment.energyOpportunityIds == undefined || equipment.processEquipmentIds == undefined;
    });
    for (let i = 0; i < missingAssessmentIds.length; i++) {
      if (missingAssessmentIds[i].assessmentIds == undefined) {
        missingAssessmentIds[i].assessmentIds = new Array();
      }
      if (missingAssessmentIds[i].energyEquipmentIds == undefined) {
        missingAssessmentIds[i].energyEquipmentIds = new Array();
      }
      if (missingAssessmentIds[i].energyOpportunityIds == undefined) {
        missingAssessmentIds[i].energyOpportunityIds = new Array();
      }
      if (missingAssessmentIds[i].processEquipmentIds == undefined) {
        missingAssessmentIds[i].processEquipmentIds = new Array();
      }
      await firstValueFrom(this.energyEquipmentIdbService.updateWithObservable(missingAssessmentIds[i]));
    }
  }
}
