import { Injectable, Version } from '@angular/core';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { getGUID, getNewId } from '../helpFunctions';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { Observable, first, firstValueFrom } from 'rxjs';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { environment } from 'src/environments/environment';
import * as semver from 'semver';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';

@Injectable({
  providedIn: 'root'
})
export class BackupDataService {

  constructor(
    private userIdbService: UserIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private contactIdbService: ContactIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private keyPerformanceIndicatorsIdbService: KeyPerformanceIndicatorsIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private loadingService: LoadingService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService
  ) { }

  backupData() {
    let backupFile: BackupFile = this.getBackupFile();
    let backupFileName: string = 'JUSTIFI_' + backupFile.companies[0]?.generalInformation.name + '_backup_';
    this.downloadBackup(backupFile, backupFileName);
  }

  downloadBackup(backupFile: BackupFile, backupFileName: string) {
    let jsonData = JSON.stringify(backupFile);
    let dlLink = window.document.createElement("a");
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
    dlLink.setAttribute("href", dataStr);
    const date = backupFile.timeStamp;
    const filename = backupFileName + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') + '-' + date.getFullYear() + '_'
      + date.getHours().toString().padStart(2, '0') + '-' + date.getMinutes().toString().padStart(2, '0') + '-' + date.getSeconds().toString().padStart(2, '0');
    dlLink.setAttribute('download', filename + '.json');
    dlLink.click();
  }

  getBackupFile(): BackupFile {
    let backupFile: BackupFile = {
      user: this.userIdbService.user.getValue(),
      companies: this.companyIdbService.companies.getValue(),
      facilities: this.facilityIdbService.facilities.getValue(),
      contacts: this.contactIdbService.contacts.getValue(),
      energyOpportunities: this.energyOpportunityIdbService.energyOpportunities.getValue(),
      assessments: this.assessmentIdbService.assessments.getValue(),
      keyPerformanceIndicators: this.keyPerformanceIndicatorsIdbService.keyPerformanceIndicators.getValue(),
      nonEnergyBenefits: this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue(),
      onSiteVisits: this.onSiteVisitIdbService.onSiteVisits.getValue(),
      energyEquipment: this.energyEquipmentIdbService.energyEquipments.getValue(),
      processEquipment: this.processEquipmentIdbService.processEquipments.getValue(),
      keyPerformanceMetricImpacts: this.keyPerformanceMetricImpactIdbService.keyPerformanceMetricImpacts.getValue(),
      origin: "JUSTIFI",
      version: environment.version,
      backupFileType: "User",
      timeStamp: new Date(),
      dataBackupId: getGUID()
    }
    return backupFile;
  }

  // Add backup file data to the userGuid
  async importUserBackupFile(backupFile: BackupFile, userGuid: string): Promise<BackupFile> {
    // Overwrite backup user guid with input guid
    this.loadingService.setLoadingMessage('Adding Backup Data to User: ' + userGuid + '...');
    let userGUIDs: { oldId: string, newId: string } = {
      oldId: backupFile.user.guid,
      newId: userGuid
    }
    delete backupFile.user.id;
    backupFile.user.guid = userGUIDs.newId;

    // Adding companies
    this.loadingService.setLoadingMessage('Adding Companies...');
    let companyGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.companies.length; i++) {
      let company: IdbCompany = backupFile.companies[i];
      let newGUID: string = getGUID();
      companyGUIDs.push({
        newId: newGUID,
        oldId: company.guid
      });
      company.guid = newGUID;
      delete company.id;
      company.userId = userGUIDs.newId;
      await firstValueFrom(this.companyIdbService.addWithObservable(company));
    }

    // Adding Facility
    this.loadingService.setLoadingMessage('Adding Facilities...');
    let facilityGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.facilities.length; i++) {
      let facility: IdbFacility = backupFile.facilities[i];
      let newGUID: string = getGUID();
      facilityGUIDs.push({
        oldId: facility.guid,
        newId: newGUID
      });
      facility.guid = newGUID;
      delete facility.id;
      facility.userId = userGUIDs.newId;
      facility.companyId = getNewId(facility.companyId, companyGUIDs);
      await firstValueFrom(this.facilityIdbService.addWithObservable(facility));
    }

    //Adding Energy Equipment
    this.loadingService.setLoadingMessage('Adding energy equipments...');
    let energyEquipmentGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.energyEquipment.length; i++) {
      let energyEquipment: IdbEnergyEquipment = backupFile.energyEquipment[i];
      let newGUID: string = getGUID();
      energyEquipmentGUIDs.push({
        newId: newGUID,
        oldId: energyEquipment.guid
      });
      energyEquipment.guid = newGUID;
      delete energyEquipment.id;
      energyEquipment.userId = userGUIDs.newId;
      energyEquipment.companyId = getNewId(energyEquipment.companyId, companyGUIDs);
      energyEquipment.facilityId = getNewId(energyEquipment.facilityId, facilityGUIDs);
      await firstValueFrom(this.energyEquipmentIdbService.addWithObservable(energyEquipment));
    }

    //Adding Process Equipment
    this.loadingService.setLoadingMessage('Adding process equipments...');
    let processEquipmentGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.processEquipment.length; i++) {
      let processEquipment: IdbProcessEquipment = backupFile.processEquipment[i];
      let newGUID: string = getGUID();
      processEquipmentGUIDs.push({
        newId: newGUID,
        oldId: processEquipment.guid
      });
      processEquipment.guid = newGUID;
      delete processEquipment.id;
      processEquipment.userId = userGUIDs.newId;
      processEquipment.companyId = getNewId(processEquipment.companyId, companyGUIDs);
      processEquipment.facilityId = getNewId(processEquipment.facilityId, facilityGUIDs);
      await firstValueFrom(this.processEquipmentIdbService.addWithObservable(processEquipment));
    }

    // adding assessments
    this.loadingService.setLoadingMessage('Adding Assessments...');
    let assessmentGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.assessments.length; i++) {
      let assessment: IdbAssessment = backupFile.assessments[i];
      let newGUID: string = getGUID();
      assessmentGUIDs.push({
        newId: newGUID,
        oldId: assessment.guid
      });
      assessment.guid = newGUID;
      delete assessment.id;
      assessment.userId = userGUIDs.newId;
      assessment.companyId = getNewId(assessment.companyId, companyGUIDs);
      assessment.facilityId = getNewId(assessment.facilityId, facilityGUIDs);
      assessment.equipmentId = getNewId(assessment.equipmentId, energyEquipmentGUIDs);
      await firstValueFrom(this.assessmentIdbService.addWithObservable(assessment));
    }

    // adding energy opportunities
    // energyOpportunities: Array<IdbEnergyOpportunity>,
    this.loadingService.setLoadingMessage('Adding Energy Efficiency Measures...');
    let energyOpportunityGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.energyOpportunities.length; i++) {
      let energyOpportunity: IdbEnergyOpportunity = backupFile.energyOpportunities[i];
      let newGUID: string = getGUID();
      energyOpportunityGUIDs.push({
        newId: newGUID,
        oldId: energyOpportunity.guid
      });
      energyOpportunity.guid = newGUID;
      delete energyOpportunity.id;
      energyOpportunity.userId = userGUIDs.newId;
      energyOpportunity.companyId = getNewId(energyOpportunity.companyId, companyGUIDs);
      energyOpportunity.facilityId = getNewId(energyOpportunity.facilityId, facilityGUIDs);
      energyOpportunity.assessmentId = getNewId(energyOpportunity.assessmentId, assessmentGUIDs);
      await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(energyOpportunity));
    }

    // Adding KPIs
    this.loadingService.setLoadingMessage('Adding KPIs...');
    let keyPerformanceIndicatorGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    let kpmGuids: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.keyPerformanceIndicators.length; i++) {
      let keyPerformanceIndicator: IdbKeyPerformanceIndicator = backupFile.keyPerformanceIndicators[i];
      let newGUID: string = getGUID();
      keyPerformanceIndicatorGUIDs.push({
        newId: newGUID,
        oldId: keyPerformanceIndicator.guid
      });
      keyPerformanceIndicator.guid = newGUID;
      for (let m = 0; m < keyPerformanceIndicator.performanceMetrics.length; m++) {
        keyPerformanceIndicator.performanceMetrics[m].kpiGuid = newGUID;
        let newKpmGuid: string = getGUID();
        kpmGuids.push({ oldId: keyPerformanceIndicator.performanceMetrics[m].guid, newId: newKpmGuid });
        keyPerformanceIndicator.performanceMetrics[m].guid = newKpmGuid;
      }
      delete keyPerformanceIndicator.id;
      keyPerformanceIndicator.userId = userGUIDs.newId;
      keyPerformanceIndicator.companyId = getNewId(keyPerformanceIndicator.companyId, companyGUIDs);
      keyPerformanceIndicator.facilityId = getNewId(keyPerformanceIndicator.facilityId, facilityGUIDs);
      await firstValueFrom(this.keyPerformanceIndicatorsIdbService.addWithObservable(keyPerformanceIndicator));
    }

    // Adding NEBs
    // nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    this.loadingService.setLoadingMessage('Adding NEBs...');
    let nonEnergyBenefitGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.nonEnergyBenefits.length; i++) {
      let nonEnergyBenefit: IdbNonEnergyBenefit = backupFile.nonEnergyBenefits[i];
      let newGUID: string = getGUID();
      nonEnergyBenefitGUIDs.push({
        newId: newGUID,
        oldId: nonEnergyBenefit.guid
      });
      nonEnergyBenefit.guid = newGUID;
      delete nonEnergyBenefit.id;
      nonEnergyBenefit.userId = userGUIDs.newId;
      nonEnergyBenefit.companyId = getNewId(nonEnergyBenefit.companyId, companyGUIDs);
      nonEnergyBenefit.facilityId = getNewId(nonEnergyBenefit.facilityId, facilityGUIDs);
      nonEnergyBenefit.assessmentId = getNewId(nonEnergyBenefit.assessmentId, assessmentGUIDs);
      nonEnergyBenefit.energyOpportunityId = getNewId(nonEnergyBenefit.energyOpportunityId, energyOpportunityGUIDs);
      await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(nonEnergyBenefit));
    }

    //update energy equipment
    this.loadingService.setLoadingMessage("Updating item connections...");
    let allEnergyEquipments: Array<IdbEnergyEquipment> = await firstValueFrom(this.energyEquipmentIdbService.getAll());
    for (let i = 0; i < energyEquipmentGUIDs.length; i++) {
      let energyEquipment: IdbEnergyEquipment = allEnergyEquipments.find(equipment => {
        return equipment.guid == energyEquipmentGUIDs[i].newId;
      });
      if (energyEquipment.processEquipmentIds) {
        energyEquipment.processEquipmentIds.forEach((processEquipmentId, idx) => {
          energyEquipment.processEquipmentIds[idx] = getNewId(processEquipmentId, processEquipmentGUIDs);
        });
      } else {
        energyEquipment.processEquipmentIds = [];
      }
      if (energyEquipment.energyEquipmentIds) {
        energyEquipment.energyEquipmentIds.forEach((energyEquipmentId, idx) => {
          energyEquipment.energyEquipmentIds[idx] = getNewId(energyEquipmentId, energyEquipmentGUIDs);
        });
      } else {
        energyEquipment.energyEquipmentIds = [];
      }
      if (energyEquipment.assessmentIds) {
        energyEquipment.assessmentIds.forEach((assessmentId, idx) => {
          energyEquipment.assessmentIds[idx] = getNewId(assessmentId, assessmentGUIDs);
        });
      } else {
        energyEquipment.assessmentIds = [];
      }
      if (energyEquipment.energyOpportunityIds) {
        energyEquipment.energyOpportunityIds.forEach((energyOpportunityId, idx) => {
          energyEquipment.energyOpportunityIds[idx] = getNewId(energyOpportunityId, energyOpportunityGUIDs);
        });
      } else {
        energyEquipment.energyEquipmentIds = [];
      }
      await firstValueFrom(this.energyEquipmentIdbService.updateWithObservable(energyEquipment));
    }


    //update process equipment
    let allProcessEquipments: Array<IdbProcessEquipment> = await firstValueFrom(this.processEquipmentIdbService.getAll());
    for (let i = 0; i < processEquipmentGUIDs.length; i++) {
      let processEquipment: IdbProcessEquipment = allProcessEquipments.find(equipment => {
        return equipment.guid == processEquipmentGUIDs[i].newId;
      });
      if (processEquipment.processEquipmentIds) {
        processEquipment.processEquipmentIds.forEach((processEquipmentId, idx) => {
          processEquipment.processEquipmentIds[idx] = getNewId(processEquipmentId, processEquipmentGUIDs);
        });
      } else {
        processEquipment.processEquipmentIds = [];
      }
      if (processEquipment.energyEquipmentIds) {
        processEquipment.energyEquipmentIds.forEach((energyEquipmentId, idx) => {
          processEquipment.energyEquipmentIds[idx] = getNewId(energyEquipmentId, energyEquipmentGUIDs);
        });
      } else {
        processEquipment.energyEquipmentIds = [];
      }
      if (processEquipment.assessmentIds) {
        processEquipment.assessmentIds.forEach((assessmentId, idx) => {
          processEquipment.assessmentIds[idx] = getNewId(assessmentId, assessmentGUIDs);
        });
      } else {
        processEquipment.assessmentIds = [];
      }
      if (processEquipment.energyOpportunityIds) {
        processEquipment.energyOpportunityIds.forEach((energyOpportunityId, idx) => {
          processEquipment.energyOpportunityIds[idx] = getNewId(energyOpportunityId, energyOpportunityGUIDs);
        });
      } else {
        processEquipment.energyOpportunityIds = [];
      }
      await firstValueFrom(this.processEquipmentIdbService.updateWithObservable(processEquipment));
    }

    // Adding contacts
    this.loadingService.setLoadingMessage('Adding contacts...');
    let contactGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.contacts.length; i++) {
      let contact: IdbContact = backupFile.contacts[i];
      let newGUID: string = getGUID();
      contactGUIDs.push({
        newId: newGUID,
        oldId: contact.guid
      });
      contact.guid = newGUID;
      delete contact.id;
      contact.userId = userGUIDs.newId;
      contact.companyId = getNewId(contact.companyId, companyGUIDs);
      contact.facilityIds.forEach((facilityId, idx) => {
        contact.facilityIds[idx] = getNewId(facilityId, facilityGUIDs);
      });
      contact.processEquipmentIds.forEach((processEquipmentId, idx) => {
        contact.processEquipmentIds[idx] = getNewId(processEquipmentId, processEquipmentGUIDs);
      });
      contact.energyEquipmentIds.forEach((energyEquipmentId, idx) => {
        contact.energyEquipmentIds[idx] = getNewId(energyEquipmentId, energyEquipmentGUIDs);
      });
      contact.kpiIds.forEach((kpiId, idx) => {
        contact.kpiIds[idx] = getNewId(kpiId, keyPerformanceIndicatorGUIDs);
      });

      contact.assessmentIds.forEach((assessmentId, idx) => {
        contact.assessmentIds[idx] = getNewId(assessmentId, assessmentGUIDs);
      });

      contact.nonEnergyBenefitIds.forEach((nebId, idx) => {
        contact.nonEnergyBenefitIds[idx] = getNewId(nebId, nonEnergyBenefitGUIDs);
      });
      
      await firstValueFrom(this.contactIdbService.addWithObservable(contact));
    }

    // Adding onsitevisit
    // onSiteVisits: Array<IdbOnSiteVisit>,
    this.loadingService.setLoadingMessage('Adding Onsite Visits...');
    let onSiteVisitGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.onSiteVisits.length; i++) {
      let onsitevisit: IdbOnSiteVisit = backupFile.onSiteVisits[i];
      let newGUID: string = getGUID();
      onSiteVisitGUIDs.push({
        newId: newGUID,
        oldId: onsitevisit.guid
      });
      onsitevisit.guid = newGUID;
      delete onsitevisit.id;
      onsitevisit.userId = userGUIDs.newId;
      onsitevisit.companyId = getNewId(onsitevisit.companyId, companyGUIDs);
      onsitevisit.facilityId = getNewId(onsitevisit.facilityId, facilityGUIDs);
      onsitevisit.assessmentIds.forEach((assessmentId, idx) => {
        onsitevisit.assessmentIds[idx] = getNewId(assessmentId, assessmentGUIDs);
      });
      await firstValueFrom(this.onSiteVisitIdbService.addWithObservable(onsitevisit));
    }

    // adding key performance metric impacts
    this.loadingService.setLoadingMessage('Adding KPM Impacts...');
    let kpmImpactGUIDs: Array<{ oldId: string, newId: string }> = new Array();
    for (let i = 0; i < backupFile.keyPerformanceMetricImpacts.length; i++) {
      let keyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact = backupFile.keyPerformanceMetricImpacts[i];
      let newGUID: string = getGUID();
      kpmImpactGUIDs.push({
        newId: newGUID,
        oldId: keyPerformanceMetricImpact.guid
      });
      keyPerformanceMetricImpact.guid = newGUID;
      delete keyPerformanceMetricImpact.id;
      keyPerformanceMetricImpact.userId = userGUIDs.newId;
      keyPerformanceMetricImpact.kpmGuid = getNewId(keyPerformanceMetricImpact.kpmGuid, kpmGuids);
      keyPerformanceMetricImpact.kpiGuid = getNewId(keyPerformanceMetricImpact.kpiGuid, keyPerformanceIndicatorGUIDs);
      keyPerformanceMetricImpact.companyId = getNewId(keyPerformanceMetricImpact.companyId, companyGUIDs);
      keyPerformanceMetricImpact.facilityId = getNewId(keyPerformanceMetricImpact.facilityId, facilityGUIDs);
      keyPerformanceMetricImpact.assessmentId = getNewId(keyPerformanceMetricImpact.assessmentId, assessmentGUIDs);
      keyPerformanceMetricImpact.nebId = getNewId(keyPerformanceMetricImpact.nebId, nonEnergyBenefitGUIDs);
      keyPerformanceMetricImpact.energyOpportunityId = getNewId(keyPerformanceMetricImpact.energyOpportunityId, energyOpportunityGUIDs);

      await firstValueFrom(this.keyPerformanceMetricImpactIdbService.addWithObservable(keyPerformanceMetricImpact));
    }
    return backupFile;
  }

  backupFileVersionCheck(fileVersion: string, appVersion: string): boolean {
    const parsedFileVersion = semver.parse(fileVersion);
    const parsedAppVersion = semver.parse(appVersion);

    if (!parsedFileVersion || !parsedAppVersion) {
      return false;
    }

    // avoid build metadata, for example, 0.0.1-alpha-06c66911e vs. 0.0.1-alpha
    // use the shorter length to match
    const lengthNoBuildMeta = Math.min(parsedFileVersion.prerelease.length, parsedAppVersion.prerelease.length);

    // Compare major, minor, patch, and pre-release parts
    return (
      parsedFileVersion.major === parsedAppVersion.major &&
      parsedFileVersion.minor === parsedAppVersion.minor &&
      parsedFileVersion.patch === parsedAppVersion.patch &&
      parsedFileVersion.prerelease.join('.').slice(0, lengthNoBuildMeta) === parsedAppVersion.prerelease.join('.').slice(0, lengthNoBuildMeta)
    );
  }
}

export interface BackupFile {
  user: IdbUser,
  companies: Array<IdbCompany>,
  facilities: Array<IdbFacility>,
  contacts: Array<IdbContact>,
  energyOpportunities: Array<IdbEnergyOpportunity>,
  assessments: Array<IdbAssessment>,
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>,
  nonEnergyBenefits: Array<IdbNonEnergyBenefit>,
  onSiteVisits: Array<IdbOnSiteVisit>,
  energyEquipment: Array<IdbEnergyEquipment>,
  processEquipment: Array<IdbProcessEquipment>,
  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>
  origin: "JUSTIFI",
  version: string,
  backupFileType: "User" | "Company" | "Facility",
  timeStamp: Date,
  dataBackupId: string
}