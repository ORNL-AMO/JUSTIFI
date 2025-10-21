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
import { updateAssessmentUtilityUseCostSavings, updateFacilityUtilityUseCost } from '../shared/reports/calculations/utilityCalculation';
import { AssessmentIdbService } from './assessment-idb.service';
import { IdbAssessment } from '../models/assessment';
import { EnergyOpportunityIdbService } from './energy-opportunity-idb.service';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue, PrimaryKPI, PrimaryKpiRename, PrimaryKpiRenames } from '../shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetric, KeyPerformanceMetricOption, KeyPerformanceMetricOptions } from '../shared/constants/keyPerformanceMetrics';
import { AssessmentOptions } from '../shared/constants/assessmentTypes';
import { UtilityEnergyUse } from '../models/utilityEnergyUses';
import { NonEnergyBenefitsIdbService } from './non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit } from '../models/nonEnergyBenefit';
import { NebOptions } from '../shared/constants/nonEnergyBenefitOptions';

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
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService
  ) { }

  async updateDbEntries(user: IdbUser): Promise<IdbUser> {
    let userNeedsUpdate: boolean = false;
    if (!user.kpiFacilityMigrationDoneV2) {
      await this.updateToFacilityKPI();
      await this.updateKpiKpmNames();
      user.kpiFacilityMigrationDoneV2 = true;
      userNeedsUpdate = true;
    }

    if (!user.locale) {
      this.updateUserLocale(user);
      userNeedsUpdate = true;
    }
    this.localeService.setCurrencyCode(user.locale);

    await this.updateMetricImpactCalculationMethods();
    await this.updateProcessEquipment();
    await this.updateEnergyEquipment();
    await this.updateCompanies();
    await this.updateFacilities();
    await this.updateAssessments();
    await this.updateEnergyOpportunities();
    await this.updateNonEnergyBenefits();

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

  async updateKpiKpmNames() {
    // update KPIs
    // 1. update primaryKPI/category
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = await firstValueFrom(this.keyPerformanceIndicatorsIdbService.getAll());
    let primaryKpiRenames: Array<PrimaryKpiRename> = PrimaryKpiRenames;
    for (let i = 0; i < primaryKpiRenames.length; i++) {
      let original: string = primaryKpiRenames[i].original;
      let current: PrimaryKPI = primaryKpiRenames[i].current;
      let kpisForCategoryChanges: Array<IdbKeyPerformanceIndicator> = keyPerformanceIndicators.filter(kpi => { return kpi.primaryKPI == original });
      for (let j = 0; j < kpisForCategoryChanges.length; j++) {
        let kpi: IdbKeyPerformanceIndicator = kpisForCategoryChanges[j];
        kpi.primaryKPI = current;
        await firstValueFrom(this.keyPerformanceIndicatorsIdbService.updateWithObservable(kpi));
      }
    }
    // 2. update KPM to custom
    keyPerformanceIndicators = await firstValueFrom(this.keyPerformanceIndicatorsIdbService.getAll());
    for (let i = 0; i < keyPerformanceIndicators.length; i++) {
      let kpi: IdbKeyPerformanceIndicator = keyPerformanceIndicators[i];
      let associatedKPMs: Array<KeyPerformanceMetric> = kpi.performanceMetrics;
      let keyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = KeyPerformanceIndicatorOptions;
      let keyPerformanceMetricOptions: Array<KeyPerformanceMetricOption> = KeyPerformanceMetricOptions;
      let kpiIdx, kpmIdx;
      kpiIdx = keyPerformanceIndicatorOptions.findIndex(option => { return option.optionValue == kpi.optionValue });
      if (kpiIdx == -1) {
        kpi.isCustom = true;
        kpi.optionValue = 'other';
        for (let j = 0; j < associatedKPMs.length; j++) {
          let kpm: KeyPerformanceMetric = associatedKPMs[j];
          kpm.kpiValue = 'other';
        }
      }
      for (let j = 0; j < associatedKPMs.length; j++) {
        let kpm: KeyPerformanceMetric = associatedKPMs[j];
        kpmIdx = keyPerformanceMetricOptions.findIndex(option => { return option.value == kpm.value && option.label == kpm.label });
        if (kpmIdx == -1) {
          kpm.isCustom = true;
          kpm.value = 'custom';
          let kpmImpacts = await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.getAll());
          let associatedKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = kpmImpacts.filter(impact => { return impact.kpmGuid == kpm.guid });
          for (let j = 0; j < associatedKpmImpacts.length; j++) {
            let impact: IdbKeyPerformanceMetricImpact = associatedKpmImpacts[j];
            impact.kpmValue = 'custom';
            await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.updateWithObservable(impact));
          }
        }
      }
      if (kpiIdx == -1 || kpmIdx == -1) {
        await firstValueFrom(this.keyPerformanceIndicatorsIdbService.updateWithObservable(kpi));
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

  async updateCompanies() {
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

  async updateFacilities() {
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

  async updateAssessments() {
    let assessments: Array<IdbAssessment> = await firstValueFrom(this.assessmentIdbService.getAll());
    let facilities: Array<IdbFacility> = await firstValueFrom(this.facilityIdbService.getAll());
    let companies: Array<IdbCompany> = await firstValueFrom(this.companyIdbService.getAll());
    // back-compatibility for water use and costs
    for (let i = 0; i < assessments.length; i++) {
      let assessment: IdbAssessment = assessments[i];
      if (assessment.isUtilityCostUpdated == undefined || !assessment.isUtilityCostUpdated) {
        // need recalculate uses and costs
        let facility: IdbFacility = facilities.find(_facility => { return _facility.guid == assessment.facilityId });
        let company: IdbCompany = companies.find(_company => { return _company.guid == facility.companyId });
        // legacy assessment is limited to one utility type
        // 1. update utility types
        assessment.utilityTypes = AssessmentOptions.find(_option => { return _option.assessmentType == assessment.assessmentType })?.utilityTypes || [];
        // 2. move the savings to the according utility type
        if (assessment.utilityType) {
          // update all energy saving to 0
          assessment.utilityEnergyUses.forEach(_energyUse => {
            _energyUse.utilitySaving = 0;
          });
          // transfer the energy savings to the according utility type
          let utilityEnergyUse: UtilityEnergyUse = assessment.utilityEnergyUses.find(_energyUse => { return _energyUse.utilityType == assessment.utilityType });
          utilityEnergyUse.utilitySaving = assessment.energySavings;
          if (assessment.utilityType == 'Water' || assessment.utilityType == 'Waste Water') {
            assessment.utilityCategory = 'water';
          } else {
            assessment.utilityCategory = 'energy';
          }
          assessment.utilityType = undefined;
        } else {
          // update the utility category if none is set
          if (assessment.utilityCategory == undefined) {
            assessment.utilityCategory = 'energy';
            for (const utilityType of assessment.utilityTypes) {
              if (utilityType == 'Water' || utilityType == 'Waste Water') {
                let use = assessment.utilityEnergyUses.find(_energyUse => { return _energyUse.utilityType == utilityType });
                if (use && use.include) {
                  assessment.utilityCategory = 'water';
                  break;
                }
              }
            }
          }
        }
        // update the use, cost, and savings
        assessment = updateAssessmentUtilityUseCostSavings(assessment, facility.unitSettings, company.companyEnergyUnit);
        if (assessment.energyCostSavings == undefined) {
          assessment.energyCostSavings = 0;
        }
        assessment.isUtilityCostUpdated = true; // migration done
        await firstValueFrom(this.assessmentIdbService.updateWithObservable(assessment));
      }
    }
  }

  async updateEnergyOpportunities() {
    let energyOpportunities = await firstValueFrom(this.energyOpportunityIdbService.getAll());
    // back-compatibility for utilityCategory
    for (let i = 0; i < energyOpportunities.length; i++) {
      let energyOpportunity = energyOpportunities[i];
      if (energyOpportunity.utilityCategory == undefined) {
        // need update the utilityCategory to energy or water
        if (energyOpportunity.utilityType === 'Water' || energyOpportunity.utilityType === 'Waste Water') {
          energyOpportunity.utilityCategory = 'water';
        } else {
          energyOpportunity.utilityCategory = 'energy';
        }
        await firstValueFrom(this.energyOpportunityIdbService.updateWithObservable(energyOpportunity));
      }
    }
  }

  async updateNonEnergyBenefits() {
    let nonEnergyBenefits: Array<IdbNonEnergyBenefit> = await firstValueFrom(this.nonEnergyBenefitsIdbService.getAll());
    // back-compatibility for financial impact type
    let needUpdate = false;
    for (let i = 0; i < nonEnergyBenefits.length; i++) {
      let nonEnergyBenefit: IdbNonEnergyBenefit = nonEnergyBenefits[i];
      if (nonEnergyBenefit.costImpactType == undefined) {
        nonEnergyBenefit.costImpactType = 'annual';
        needUpdate = true;
      }
      if (nonEnergyBenefit.nebOptionValue) {
        let isValidOption: boolean = NebOptions.some(option => option.optionValue === nonEnergyBenefit.nebOptionValue);
        if (!isValidOption) { // Old nebOptionValue mark as custom NEB
          nonEnergyBenefit.nebOptionValue = undefined;
          nonEnergyBenefit.isCustom = true;
        }
        needUpdate = true;
      }
      if (needUpdate) {
        await firstValueFrom(this.nonEnergyBenefitsIdbService.updateWithObservable(nonEnergyBenefit));
        needUpdate = false;
      }
    }
  }

  async updateMetricImpactCalculationMethods() {
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.getAll());
    let keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = await firstValueFrom(this.keyPerformanceIndicatorsIdbService.getAll());
    let keyPerformanceMetrics: Array<KeyPerformanceMetric> = keyPerformanceIndicators.flatMap(kpi => { return kpi.performanceMetrics });
    let needUpdate = false;
    for (let i = 0; i < keyPerformanceMetricImpacts.length; i++) {
      let impact: IdbKeyPerformanceMetricImpact = keyPerformanceMetricImpacts[i];
      if (impact.calculationMethod == undefined) {
        let kpm: KeyPerformanceMetric = keyPerformanceMetrics.find(metric => { return metric.guid == impact.kpmGuid });
        if (kpm) {
          impact.calculationMethod = kpm.calculationMethod;
          needUpdate = true;
        }
      }
      if (needUpdate) {
        await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.updateWithObservable(impact));
        needUpdate = false;
      }
    }

  }
}
