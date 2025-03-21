import { Injectable } from '@angular/core';
import { KeyPerformanceIndicatorsIdbService } from './key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from './key-performance-metric-impacts-idb.service';
import { CompanyIdbService } from './company-idb.service';
import { FacilityIdbService } from './facility-idb.service';
import { IdbCompany } from '../models/company';
import { first, firstValueFrom } from 'rxjs';
import { IdbFacility } from '../models/facility';
import { IdbKeyPerformanceIndicator } from '../models/keyPerformanceIndicator';
import { IdbUser } from '../models/user';
import { UserIdbService } from './user-idb.service';
import { IdbKeyPerformanceMetricImpact } from '../models/keyPerformanceMetricImpact';
import { getGUID } from '../shared/helpFunctions';
import { LocaleService } from '../shared/shared-services/locale.service';
import { localeCurrency } from '../shared/constants/localeCurrency';
import { ProcessEquipmentIdbService } from './process-equipment-idb.service';
import { IdbProcessEquipment } from '../models/processEquipment';
import { EnergyEquipmentIdbService } from './energy-equipment-idb.service';
import { IdbEnergyEquipment } from '../models/energyEquipment';
import { updateAssessmentUtilityUseCost, updateFacilityUtilityUseCost } from '../shared/reports/calculations/utilityCalculation';
import { AssessmentIdbService } from './assessment-idb.service';
import { IdbAssessment } from '../models/assessment';

@Injectable({
  providedIn: 'root'
})
export class UpdateDbEntriesService {

  constructor(
    private keyPerformanceIndicatorsIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private userIdbService: UserIdbService,
    private localeService: LocaleService,
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

    if (!user.locale) {
      this.updateUserLocale(user);
      userNeedsUpdate = true;
    }
    this.localeService.setCurrencyCode(user.locale);

    await this.updateProcessEquipment();
    await this.updateEnergyEquipment();
    await this.updateCompany();
    await this.updateFacility();
    await this.updateAssessment();
    
    if (userNeedsUpdate) {
      user = await firstValueFrom(this.userIdbService.updateWithObservable(user));
      this.userIdbService.user.next(user);
    }
    return user;
  }

  updateUserLocale(user: IdbUser) {
    const browserLang = navigator.language;
    const currencyOption = localeCurrency.find(option => option.locale === browserLang);
    user.locale = currencyOption ? currencyOption.locale : 'en-US';
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

  async updateCompany() {
    let companies: Array<IdbCompany> = await firstValueFrom(this.companyIdbService.getAll());
    // back-compatibility for company energy unit
    for (let i = 0; i < companies.length; i++) {
      let company: IdbCompany = companies[i];
      if (company.companyEnergyUnit == undefined) {
        company.companyEnergyUnit = 'MMBtu';
      }
      await firstValueFrom(this.companyIdbService.updateWithObservable(company));
    }
  }

  async updateFacility() {
    let facilities: Array<IdbFacility> = await firstValueFrom(this.facilityIdbService.getAll());
    // Get company entries
    let companies: Array<IdbCompany> = await firstValueFrom(this.companyIdbService.getAll());
    // back-compatibility for water use and costs
    for (let i = 0; i < facilities.length; i++) {
      let facility: IdbFacility = facilities[i];
      if (facility.waterCost == undefined) {
        // need recalculate uses and costs
        let company: IdbCompany = companies.find(_company => { return _company.guid == facility.companyId });
        facility = updateFacilityUtilityUseCost(facility, company.companyEnergyUnit);
      }
      await firstValueFrom(this.facilityIdbService.updateWithObservable(facility));
    }
  }
  
  async updateAssessment() {
    let assessments: Array<IdbAssessment> = await firstValueFrom(this.assessmentIdbService.getAll());
    let facilities: Array<IdbFacility> = await firstValueFrom(this.facilityIdbService.getAll());
    let companies: Array<IdbCompany> = await firstValueFrom(this.companyIdbService.getAll());
    // back-compatibility for water use and costs
    for (let i = 0; i < assessments.length; i++) {
      let assessment: IdbAssessment = assessments[i];
      if (assessment.waterCost == undefined) {
        // need recalculate uses and costs
        let facility: IdbFacility = facilities.find(_facility => { return _facility.guid == assessment.facilityId });
        let company: IdbCompany = companies.find(_company => { return _company.guid == facility.companyId });
        assessment = updateAssessmentUtilityUseCost(assessment, facility, company.companyEnergyUnit);
        if (assessment.energyCostSavings == undefined) {
          assessment.energyCostSavings = 0;
        }
      }
      await firstValueFrom(this.assessmentIdbService.updateWithObservable(assessment));
    }
  }
}
