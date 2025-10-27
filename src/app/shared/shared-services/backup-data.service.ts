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
import { ExportTreeNode, getSelectedExportGuids, SelectedExportGuids } from 'src/app/core-components/backup-modal/export-backup-modal/exportTree';

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

  backupData(exportFileName: string, exportTree: ExportTreeNode[]): void {
    let backupFile: BackupFile = this.getBackupFile(exportTree);
    let backupFileName: string = exportFileName || 'JUSTIFI_backup';
    this.downloadBackup(backupFile, backupFileName);
  }

  downloadBackup(backupFile: BackupFile, backupFileName: string) {
    let jsonData = JSON.stringify(backupFile);
    let dlLink = window.document.createElement("a");
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
    dlLink.setAttribute("href", dataStr);
    dlLink.setAttribute('download', backupFileName + '.json');
    dlLink.click();
  }

  getBackupFile(exportTree: ExportTreeNode[]): BackupFile {
    // Traverse the export tree and collect the guids
    const selectedExportGuids: SelectedExportGuids = getSelectedExportGuids(exportTree);
    // filter the data to be exported
    const selectedUser: IdbUser = this.userIdbService.user.getValue();
    const companies: Array<IdbCompany> = this.companyIdbService.companies.getValue();
    const selectedCompanies: Array<IdbCompany> = companies.filter(company =>
      selectedExportGuids.companyGuids.includes(company.guid));
    const facilities: Array<IdbFacility> = this.facilityIdbService.facilities.getValue();
    const selectedFacilities: Array<IdbFacility> = facilities.filter(facility =>
      selectedExportGuids.facilityGuids.includes(facility.guid));
    const onSiteVisits: Array<IdbOnSiteVisit> = this.onSiteVisitIdbService.onSiteVisits.getValue();
    const selectedOnSiteVisits: Array<IdbOnSiteVisit> = onSiteVisits.filter(visit =>
      selectedExportGuids.visitGuids.includes(visit.guid));
    const assessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    const selectedAssessments: Array<IdbAssessment> = assessments.filter(assessment =>
      selectedExportGuids.assessmentGuids.includes(assessment.guid));
    // 1. related to company
    const selectedContacts: Array<IdbContact> = this.contactIdbService.contacts.getValue()
      .filter(contact => contact.companyId && selectedExportGuids.companyGuids.includes(contact.companyId));
    // 2. related to facility
    const selectedEnergyEquipment: Array<IdbEnergyEquipment> = this.energyEquipmentIdbService.energyEquipments.getValue()
      .filter(equipment => equipment.facilityId && selectedExportGuids.facilityGuids.includes(equipment.facilityId));
    const selectedProcessEquipment: Array<IdbProcessEquipment> = this.processEquipmentIdbService.processEquipments.getValue()
      .filter(equipment => equipment.facilityId && selectedExportGuids.facilityGuids.includes(equipment.facilityId));
    const selectedKeyPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorsIdbService.keyPerformanceIndicators.getValue()
      .filter(kpi => kpi.facilityId && selectedExportGuids.facilityGuids.includes(kpi.facilityId));
    // 3. related to assessment
    selectedOnSiteVisits.forEach(visit => {
      visit.assessmentIds = visit.assessmentIds.filter(assessmentId => selectedExportGuids.assessmentGuids.includes(assessmentId));
    });
    const selectedEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue()
      .filter(energyOpportunity => energyOpportunity.assessmentId && selectedExportGuids.assessmentGuids.includes(energyOpportunity.assessmentId));
    const selectedNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue()
      .filter(nonEnergyBenefit => nonEnergyBenefit.assessmentId && selectedExportGuids.assessmentGuids.includes(nonEnergyBenefit.assessmentId));
    const selectedKeyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactIdbService.keyPerformanceMetricImpacts.getValue()
      .filter(kpmImpact => kpmImpact.assessmentId && selectedExportGuids.assessmentGuids.includes(kpmImpact.assessmentId));

    let backupFile: BackupFile = {
      user: selectedUser,
      companies: selectedCompanies,
      facilities: selectedFacilities,
      contacts: selectedContacts,
      energyOpportunities: selectedEnergyOpportunities,
      assessments: selectedAssessments,
      keyPerformanceIndicators: selectedKeyPerformanceIndicators,
      nonEnergyBenefits: selectedNonEnergyBenefits,
      onSiteVisits: selectedOnSiteVisits,
      energyEquipment: selectedEnergyEquipment,
      processEquipment: selectedProcessEquipment,
      keyPerformanceMetricImpacts: selectedKeyPerformanceMetricImpacts,
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
    //only error on alpha versions
    return (parsedFileVersion && !parsedFileVersion.prerelease.includes('alpha'));
  }

  async createFacilityArchive(facilityGuid: string, archiveName?: string): Promise<IdbFacility> {
    this.loadingService.setLoadingMessage('Creating facility archive...');
    this.loadingService.setLoadingStatus(true);

    const facility: IdbFacility = this.facilityIdbService.getByGUID(facilityGuid);
    const userGuid = this.userIdbService.user.getValue().guid;
    const companyGuid = facility.companyId;
    
    // Create new facility copy
    this.loadingService.setLoadingMessage('Copying facility...');
    const archiveDate = new Date();
    const timestamp = archiveDate.toISOString().split('T')[0]; // YYYY-MM-DD
    const newName = archiveName || `${facility.generalInformation.name} (Archived ${timestamp})`;
    const newFacility: IdbFacility = {
      ...facility,
      guid: getGUID(),
      generalInformation: {
        ...facility.generalInformation,
        name: newName
      },
      isArchived: true,
      archivedDate: archiveDate,
      originalFacilityId: facilityGuid
    };

    delete newFacility.id;
    await firstValueFrom(this.facilityIdbService.addWithObservable(newFacility));
    const newFacilityGuid = newFacility.guid;

    // Copy KPIs with KPMs
    this.loadingService.setLoadingMessage('Copying KPIs...');
    const kpis = this.keyPerformanceIndicatorsIdbService.keyPerformanceIndicators.getValue()
      .filter(kpi => kpi.facilityId === facilityGuid);
    const kpiGuidMap: Array<{ oldId: string, newId: string }> = [];
    const kpmGuidMap: Array<{ oldId: string, newId: string }> = [];
    
    for (const kpi of kpis) {
      const newKpiGuid = getGUID();
      kpiGuidMap.push({ oldId: kpi.guid, newId: newKpiGuid });
      
      const newKpi: IdbKeyPerformanceIndicator = {
        ...kpi,
        guid: newKpiGuid,
        facilityId: newFacilityGuid,
        performanceMetrics: kpi.performanceMetrics.map(kpm => {
          const newKpmGuid = getGUID();
          kpmGuidMap.push({ oldId: kpm.guid, newId: newKpmGuid });
          return {
            ...kpm,
            guid: newKpmGuid,
            kpiGuid: newKpiGuid
          };
        })
      };
      delete newKpi.id;
      await firstValueFrom(this.keyPerformanceIndicatorsIdbService.addWithObservable(newKpi));
    }

    // Copy Industrial Systems (Energy Equipment)
    this.loadingService.setLoadingMessage('Copying industrial system...');
    const energyEquipments = this.energyEquipmentIdbService.energyEquipments.getValue()
      .filter(eq => eq.facilityId === facilityGuid);
    const energyEquipmentGuidMap: Array<{ oldId: string, newId: string }> = [];
    
    for (const equipment of energyEquipments) {
      const newEquipmentGuid = getGUID();
      energyEquipmentGuidMap.push({ oldId: equipment.guid, newId: newEquipmentGuid });
      
      const newEquipment: IdbEnergyEquipment = {
        ...equipment,
        guid: newEquipmentGuid,
        facilityId: newFacilityGuid
      };
      delete newEquipment.id;
      await firstValueFrom(this.energyEquipmentIdbService.addWithObservable(newEquipment));
    }

    // Copy End Uses (Process Equipment)
    this.loadingService.setLoadingMessage('Copying end uses...');
    const processEquipments = this.processEquipmentIdbService.processEquipments.getValue()
      .filter(eq => eq.facilityId === facilityGuid);
    const processEquipmentGuidMap: Array<{ oldId: string, newId: string }> = [];
    
    for (const equipment of processEquipments) {
      const newEquipmentGuid = getGUID();
      processEquipmentGuidMap.push({ oldId: equipment.guid, newId: newEquipmentGuid });
      
      const newEquipment: IdbProcessEquipment = {
        ...equipment,
        guid: newEquipmentGuid,
        facilityId: newFacilityGuid
      };
      delete newEquipment.id;
      await firstValueFrom(this.processEquipmentIdbService.addWithObservable(newEquipment));
    }

    // Copy Assessments
    this.loadingService.setLoadingMessage('Copying assessments...');
    const assessments = this.assessmentIdbService.assessments.getValue()
      .filter(a => a.facilityId === facilityGuid);
    const assessmentGuidMap: Array<{ oldId: string, newId: string }> = [];
    
    for (const assessment of assessments) {
      const newAssessmentGuid = getGUID();
      assessmentGuidMap.push({ oldId: assessment.guid, newId: newAssessmentGuid });
      
      const newAssessment: IdbAssessment = {
        ...assessment,
        guid: newAssessmentGuid,
        facilityId: newFacilityGuid,
        equipmentId: getNewId(assessment.equipmentId, energyEquipmentGuidMap)
      };
      delete newAssessment.id;
      await firstValueFrom(this.assessmentIdbService.addWithObservable(newAssessment));
    }

    // Copy Energy Efficiency Metrics (Energy Opportunities)
    this.loadingService.setLoadingMessage('Copying energy efficiency metrics...');
    const energyOpportunities = this.energyOpportunityIdbService.energyOpportunities.getValue()
      .filter(eo => eo.facilityId === facilityGuid);
    const energyOpportunityGuidMap: Array<{ oldId: string, newId: string }> = [];
    
    for (const opportunity of energyOpportunities) {
      const newOpportunityGuid = getGUID();
      energyOpportunityGuidMap.push({ oldId: opportunity.guid, newId: newOpportunityGuid });
      
      const newOpportunity: IdbEnergyOpportunity = {
        ...opportunity,
        guid: newOpportunityGuid,
        facilityId: newFacilityGuid,
        assessmentId: getNewId(opportunity.assessmentId, assessmentGuidMap)
      };
      delete newOpportunity.id;
      await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(newOpportunity));
    }

    // Copy NEBs
    this.loadingService.setLoadingMessage('Copying NEBs...');
    const nebs = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.getValue()
      .filter(neb => neb.facilityId === facilityGuid);
    const nebGuidMap: Array<{ oldId: string, newId: string }> = [];
    
    for (const neb of nebs) {
      const newNebGuid = getGUID();
      nebGuidMap.push({ oldId: neb.guid, newId: newNebGuid });
      
      const newNeb: IdbNonEnergyBenefit = {
        ...neb,
        guid: newNebGuid,
        facilityId: newFacilityGuid,
        assessmentId: getNewId(neb.assessmentId, assessmentGuidMap),
        energyOpportunityId: getNewId(neb.energyOpportunityId, energyOpportunityGuidMap)
      };
      delete newNeb.id;
      await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNeb));
    }

    // Copy KPM Impacts
    this.loadingService.setLoadingMessage('Copying KPM impacts...');
    const kpmImpacts = this.keyPerformanceMetricImpactIdbService.keyPerformanceMetricImpacts.getValue()
      .filter(impact => impact.facilityId === facilityGuid);
    
    for (const impact of kpmImpacts) {
      const newImpact: IdbKeyPerformanceMetricImpact = {
        ...impact,
        guid: getGUID(),
        facilityId: newFacilityGuid,
        kpiGuid: getNewId(impact.kpiGuid, kpiGuidMap),
        kpmGuid: getNewId(impact.kpmGuid, kpmGuidMap),
        assessmentId: getNewId(impact.assessmentId, assessmentGuidMap),
        nebId: getNewId(impact.nebId, nebGuidMap),
        energyOpportunityId: getNewId(impact.energyOpportunityId, energyOpportunityGuidMap)
      };
      delete newImpact.id;
      await firstValueFrom(this.keyPerformanceMetricImpactIdbService.addWithObservable(newImpact));
    }

    // Copy OnSite Visits
    this.loadingService.setLoadingMessage('Copying onsite visits...');
    const visits = this.onSiteVisitIdbService.onSiteVisits.getValue()
      .filter(v => v.facilityId === facilityGuid);
    
    for (const visit of visits) {
      const newVisit: IdbOnSiteVisit = {
        ...visit,
        guid: getGUID(),
        facilityId: newFacilityGuid,
        assessmentIds: visit.assessmentIds.map(id => getNewId(id, assessmentGuidMap))
      };
      delete newVisit.id;
      await firstValueFrom(this.onSiteVisitIdbService.addWithObservable(newVisit));
    }

    // Copy Contacts
    this.loadingService.setLoadingMessage('Copying contacts...');
    const allContacts = this.contactIdbService.contacts.getValue()
      .filter(c => c.companyId === companyGuid);
    
    // Find associated contacts
    const facilityEntityIds = new Set([
      ...assessmentGuidMap.map(m => m.oldId),
      ...energyEquipmentGuidMap.map(m => m.oldId),
      ...processEquipmentGuidMap.map(m => m.oldId),
      ...kpiGuidMap.map(m => m.oldId),
      ...nebGuidMap.map(m => m.oldId)
    ]);
    
    const contacts = allContacts.filter(contact => {
      return contact.assessmentIds.some(id => facilityEntityIds.has(id)) ||
             contact.energyEquipmentIds.some(id => facilityEntityIds.has(id)) ||
             contact.processEquipmentIds.some(id => facilityEntityIds.has(id)) ||
             contact.kpiIds.some(id => facilityEntityIds.has(id)) ||
             contact.nonEnergyBenefitIds.some(id => facilityEntityIds.has(id));
    });

    for (const contact of contacts) {
      // Add archive note to preserve historical context
      const archiveNote = `[Archived from facility: ${facility.generalInformation.name} on ${timestamp}]`;
      const existingNotes = contact.notes ? contact.notes.trim() : '';
      const updatedNotes = existingNotes 
        ? `${archiveNote}\n\n${existingNotes}`
        : archiveNote;

      const newContact: IdbContact = {
        ...contact,
        guid: getGUID(),
        facilityIds: [],
        assessmentIds: contact.assessmentIds.map(id => getNewId(id, assessmentGuidMap)),
        energyEquipmentIds: contact.energyEquipmentIds.map(id => getNewId(id, energyEquipmentGuidMap)),
        processEquipmentIds: contact.processEquipmentIds.map(id => getNewId(id, processEquipmentGuidMap)),
        kpiIds: contact.kpiIds.map(id => getNewId(id, kpiGuidMap)),
        nonEnergyBenefitIds: contact.nonEnergyBenefitIds.map(id => getNewId(id, nebGuidMap)),
        notes: updatedNotes,
        archivedFacilityId: newFacilityGuid
      };
      delete newContact.id;
      await firstValueFrom(this.contactIdbService.addWithObservable(newContact));
    }

    // Update all service observables to reflect new data
    this.loadingService.setLoadingMessage('Finalizing...');
    await this.facilityIdbService.setFacilities();
    await this.keyPerformanceIndicatorsIdbService.setKeyPerformanceIndicators();
    await this.energyEquipmentIdbService.setEnergyEquipments();
    await this.processEquipmentIdbService.setProcessEquipments();
    await this.assessmentIdbService.setAssessments();
    await this.energyOpportunityIdbService.setEnergyOpportunities();
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
    await this.keyPerformanceMetricImpactIdbService.setKeyPerformanceMetricImpacts();
    await this.onSiteVisitIdbService.setOnSiteVisits();
    await this.contactIdbService.setContacts();

    this.loadingService.setLoadingStatus(false);
    return newFacility;
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
  keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact>,
  //TODO: Backup Reports..
  origin: "JUSTIFI",
  version: string,
  backupFileType: "User" | "Company" | "Facility",
  timeStamp: Date,
  dataBackupId: string
}