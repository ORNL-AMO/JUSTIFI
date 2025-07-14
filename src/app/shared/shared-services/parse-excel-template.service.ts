import { Injectable } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { getNewIdbEnergyEquipment, IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { getNewIdbFacility, IdbFacility } from 'src/app/models/facility';
import { getNewIdbProcessEquipment, IdbProcessEquipment } from 'src/app/models/processEquipment';
// import * as XLSX from 'xlsx';
import * as ExcelJS from 'exceljs';
import * as _ from 'lodash'
import { getNewIdbOnSiteVisit, IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { getNewIdbAssessment, IdbAssessment } from 'src/app/models/assessment';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { getNewIdbEnergyOpportunity, IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbUser } from 'src/app/models/user';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { AssessmentType } from '../constants/assessmentTypes';
import { UtilityType } from '../constants/utilityTypes';
import { updateAssessmentUtilityUseCostSavings } from '../reports/calculations/utilityCalculation';
import { IdbCompany } from 'src/app/models/company';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EquipmentType, EquipmentTypes } from '../constants/equipmentTypes';
import { getNewIdbContact, IdbContact } from 'src/app/models/contact';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
@Injectable({
  providedIn: 'root'
})
export class ParseExcelTemplateService {

  constructor(private facilityIdbService: FacilityIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private loadingService: LoadingService,
    private toastNotificationService: ToastNotificationsService,
    private dbChangesService: DbChangesService,
    private userIdbService: UserIdbService,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService
  ) { }

  //Parse the workbook from the wizard
  // This function is used to parse the workbook from the wizard and return the parsed data
  // without adding the data to the database.
  async parseWorkbookFromWizard(workbook: ExcelJS.Workbook, onSiteVisit: IdbOnSiteVisit): Promise<{
    facility: IdbFacility,
    industrialSystems: Array<IdbEnergyEquipment>,
    endUses: Array<IdbProcessEquipment>,
    assessments: Array<IdbAssessment>,
    energyEfficiencyMeasures: Array<IdbEnergyOpportunity>
  }> {
    let user: IdbUser = this.userIdbService.user.getValue();
    let company: IdbCompany = this.companyIdbService.selectedCompany.getValue();
    let facility: IdbFacility = await this.parseFacility(workbook, user.guid, company.guid);

    if (facility) {
      let industrialSystems: Array<IdbEnergyEquipment> = await this.parseIndustrialSystems(workbook, facility, false);
      industrialSystems = this.checkIndustrialSystemsExist(industrialSystems, facility);
      let endUses: Array<IdbProcessEquipment> = await this.parseEndUses(workbook, facility, false);
      endUses = this.checkEndUsesExist(endUses, facility);
      let assessmentsAndVisits: {
        assessments: Array<IdbAssessment>,
        onSiteVisit: IdbOnSiteVisit,
        facility: IdbFacility
      } = await this.parseAssessments(workbook, facility, company.companyEnergyUnit, onSiteVisit, false);
      assessmentsAndVisits.assessments = this.checkAssessmentsExist(assessmentsAndVisits.assessments, onSiteVisit);
      let energyEfficiencyMeasures = await this.parseEnergyEfficiencyMeasures(workbook, assessmentsAndVisits.assessments, false);
      energyEfficiencyMeasures = this.checkAssessmentEnergyEfficiencyMeasuresExist(energyEfficiencyMeasures, assessmentsAndVisits.assessments);
      return {
        facility: facility,
        industrialSystems: industrialSystems,
        endUses: endUses,
        assessments: assessmentsAndVisits.assessments,
        energyEfficiencyMeasures: energyEfficiencyMeasures,
      };
    }
    return undefined;
  }

  //add parsed data to the database
  //from the wizard
  async importData(
    facility: IdbFacility,
    industrialSystems: Array<IdbEnergyEquipment>,
    endUses: Array<IdbProcessEquipment>,
    assessments: Array<IdbAssessment>,
    energyEfficiencyMeasures: Array<IdbEnergyOpportunity>,
    onSiteVisit: IdbOnSiteVisit) {
    let visitCopy: IdbOnSiteVisit = JSON.parse(JSON.stringify(onSiteVisit))
    this.loadingService.setLoadingMessage('Updating Database with Parsed Data');
    this.loadingService.setLoadingStatus(true);
    //update facility utility settings
    //may change on upload
    await this.facilityIdbService.asyncUpdate(facility);

    let numOfIndustrialSystems: number = 0;
    for (let i = 0; i < industrialSystems.length; i++) {
      let industrialSystem: IdbEnergyEquipment = industrialSystems[i];
      if (!industrialSystem.id) {
        numOfIndustrialSystems++;
        industrialSystem = await firstValueFrom(this.energyEquipmentIdbService.addWithObservable(industrialSystem));
      }
    }
    if (numOfIndustrialSystems) {
      await this.energyEquipmentIdbService.setEnergyEquipments();
    }
    let numOfEndUses: number = 0;
    for (let i = 0; i < endUses.length; i++) {
      let endUse: IdbProcessEquipment = endUses[i];
      if (!endUse.id) {
        numOfEndUses++;
        endUse = await firstValueFrom(this.processEquipmentIdbService.addWithObservable(endUse));
      }
    }
    if (numOfEndUses) {
      await this.processEquipmentIdbService.setProcessEquipments();
    }
    let numOfAssessments: number = 0;
    for (let i = 0; i < assessments.length; i++) {
      let assessment: IdbAssessment = assessments[i];
      assessment = updateAssessmentUtilityUseCostSavings(assessment, facility.unitSettings, facility.companyId);
      if (!assessment.id) {
        numOfAssessments++;
        assessment = await firstValueFrom(this.assessmentIdbService.addWithObservable(assessment));
      }
      //add assessment to onSiteVisit
      if (visitCopy && !visitCopy.assessmentIds.includes(assessment.guid)) {
        visitCopy.assessmentIds.push(assessment.guid);
      }
    }
    if (numOfAssessments) {
      await this.assessmentIdbService.setAssessments();
    }
    let numOfEEMs: number = 0;
    for (let i = 0; i < energyEfficiencyMeasures.length; i++) {
      let energyEfficiencyMeasure: IdbEnergyOpportunity = energyEfficiencyMeasures[i];
      if (!energyEfficiencyMeasure.id) {
        numOfEEMs++;
        energyEfficiencyMeasure = await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(energyEfficiencyMeasure));
      }
    }
    if (numOfEEMs) {
      await this.energyOpportunityIdbService.setEnergyOpportunities();
    }

    await this.onSiteVisitIdbService.asyncUpdate(visitCopy);
    let user: IdbUser = this.userIdbService.user.getValue();
    await this.dbChangesService.selectUser(user, true);
    this.loadingService.setLoadingStatus(false);
    let toastBody = `Parsed ${facility.generalInformation.name} with, ${numOfIndustrialSystems} Industrial Systems, ${numOfEndUses} End Uses, ${numOfAssessments} Assessments, ${numOfEEMs} Energy Efficiency Measures`;
    this.toastNotificationService.showToast('Excel Template Parsed Successfully', toastBody, 'bg-success', true, false);
    return;
  }


  //return facility guid and visit guid
  //adds data automatically to the database
  //called from the setup wizard modal
  async parseWorkbook(workbook: ExcelJS.Workbook, user: IdbUser, company: IdbCompany): Promise<{
    facilityGuid: string,
    visitGuid: string,
  }> {
    this.loadingService.setLoadingMessage('Parsing Excel Template');
    this.loadingService.setLoadingStatus(true);
    let facility: IdbFacility = await this.parseFacility(workbook, user.guid, company.guid);
    if (facility) {
      let contacts: Array<IdbContact> = await this.parseContacts(workbook, company);
      let industrialSystems = await this.parseIndustrialSystems(workbook, facility, true);
      let endUses = await this.parseEndUses(workbook, facility, true);
      let assessmentsAndVisits: {
        assessments: Array<IdbAssessment>,
        onSiteVisit: IdbOnSiteVisit,
        facility: IdbFacility
      } = await this.parseAssessments(workbook, facility, company.companyEnergyUnit, undefined, true);
      let energyEfficiencyMeasures = await this.parseEnergyEfficiencyMeasures(workbook, assessmentsAndVisits.assessments, true);
      await this.dbChangesService.selectUser(user, true)
      this.loadingService.setLoadingStatus(false);
      let toastBody = `Parsed ${facility.generalInformation.name} with, ${industrialSystems.length} Industrial Systems, ${endUses.length} End Uses, ${assessmentsAndVisits.assessments.length} Assessments, ${energyEfficiencyMeasures.length} Energy Efficiency Measures, ${contacts.length} Contacts`;
      this.toastNotificationService.showToast('Excel Template Parsed Successfully', toastBody, 'bg-success', true, false);
      return {
        facilityGuid: facility.guid,
        visitGuid: assessmentsAndVisits.onSiteVisit.guid
      };
    } else {
      this.loadingService.setLoadingStatus(false);
      this.toastNotificationService.showToast('Excel Template Parsing Failed', 'No Facilities Found in the Excel Template', 'bg-danger', true, false);
      return undefined;
    }
  }

  async parseFacility(workbook: ExcelJS.Workbook, userGuid: string, companyGuid: string): Promise<IdbFacility> {
    let worksheet: ExcelJS.Worksheet = workbook.getWorksheet('Facility');
    let newFacility: IdbFacility = getNewIdbFacility(userGuid, companyGuid);
    newFacility.generalInformation.name = worksheet.getCell('B2').value as string || 'New Facility'; // Default name if not found
    newFacility.generalInformation.address = worksheet.getCell('B4').value as string;
    newFacility.generalInformation.country = worksheet.getCell('B5').value as string;
    newFacility.generalInformation.state = worksheet.getCell('B6').value as string;
    newFacility.generalInformation.city = worksheet.getCell('B7').value as string;
    newFacility.generalInformation.zip = worksheet.getCell('B8').value as string;
    //TODO: utility information
    newFacility.unitSettings.includeElectricity = worksheet.getCell('B11').value ? true : false;
    newFacility.unitSettings.electricityUse = worksheet.getCell('B11').value as number || 0;
    //TODO: set unit price default base on unit
    newFacility.unitSettings.electricityPrice = worksheet.getCell('D11').value as number || 0.066;
    newFacility.unitSettings.electricityUnit = worksheet.getCell('E11').value as string || 'kWh';

    newFacility.unitSettings.includeNaturalGas = worksheet.getCell('B12').value ? true : false;
    newFacility.unitSettings.naturalGasUse = worksheet.getCell('B12').value as number || 0;
    newFacility.unitSettings.naturalGasPrice = worksheet.getCell('D12').value as number || 0.8;
    newFacility.unitSettings.naturalGasUnit = worksheet.getCell('E12').value as string || 'MMBtu';

    newFacility.unitSettings.includeOtherFuels = worksheet.getCell('B13').value ? true : false;
    newFacility.unitSettings.otherFuelsUse = worksheet.getCell('B13').value as number || 0;
    newFacility.unitSettings.otherFuelsPrice = worksheet.getCell('D13').value as number || 0.8;
    newFacility.unitSettings.otherFuelsUnit = worksheet.getCell('E13').value as string || 'MMBtu';

    newFacility.unitSettings.includeWater = worksheet.getCell('B14').value ? true : false;
    newFacility.unitSettings.waterUse = worksheet.getCell('B14').value as number || 0;
    newFacility.unitSettings.waterPrice = worksheet.getCell('D14').value as number || 0.005;
    newFacility.unitSettings.waterUnit = worksheet.getCell('E14').value as string || 'kgal';

    newFacility.unitSettings.includeWasteWater = worksheet.getCell('B15').value ? true : false;
    newFacility.unitSettings.wasteWaterUse = worksheet.getCell('B15').value as number || 0;
    newFacility.unitSettings.wasteWaterPrice = worksheet.getCell('D15').value as number || 0.005;
    newFacility.unitSettings.wasteWaterUnit = worksheet.getCell('E15').value as string || 'kgal';

    newFacility.unitSettings.includeSteam = worksheet.getCell('B16').value ? true : false;
    newFacility.unitSettings.steamUse = worksheet.getCell('B16').value as number || 0;
    newFacility.unitSettings.steamPrice = worksheet.getCell('D16').value as number || 0.01;
    newFacility.unitSettings.steamUnit = worksheet.getCell('E16').value as string || 'klb';


    newFacility.unitSettings.includeCompressedAir = worksheet.getCell('B17').value ? true : false;
    newFacility.unitSettings.compressedAirUse = worksheet.getCell('B17').value as number || 0;
    newFacility.unitSettings.compressedAirPrice = worksheet.getCell('D17').value as number || 0.01;
    newFacility.unitSettings.compressedAirUnit = worksheet.getCell('E17').value as string || 'kSCF';



    newFacility = await firstValueFrom(this.facilityIdbService.addWithObservable(newFacility));
    return newFacility;
  }

  async parseContacts(workbook: ExcelJS.Workbook, company: IdbCompany): Promise<Array<IdbContact>> {
    let newContacts: Array<IdbContact> = [];
    let worksheet: ExcelJS.Worksheet = workbook.getWorksheet('Stakeholders');
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 3 && row.getCell('A').value) { // first two rows are headers. check contact name in column A
        let newContact: IdbContact = getNewIdbContact(company.userId, company.guid);
        newContact.firstName = row.getCell('A').value as string || 'New';
        newContact.lastName = row.getCell('B').value as string || 'Contact';
        newContact.phone = row.getCell('C').value as string || '';
        newContact.email = row.getCell('D').value as string || '';
        newContact.role = row.getCell('E').value as string || '';
        newContact.team = row.getCell('F').value as string || '';
        newContact.notes = row.getCell('G').value as string || '';
        newContacts.push(newContact);
      }
    });
    if (newContacts.length > 0) {
      for (let i = 0; i < newContacts.length; i++) {
        await firstValueFrom(this.contactIdbService.addWithObservable(newContacts[i]));
      }
    }
    return newContacts;
  }


  async parseIndustrialSystems(workbook: ExcelJS.Workbook, facility: IdbFacility, addItems: boolean): Promise<Array<IdbEnergyEquipment>> {
    let newIndustrialSystems: Array<IdbEnergyEquipment> = [];
    //energy equipment
    let worksheet: ExcelJS.Worksheet = workbook.getWorksheet('Industrial_Systems');
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 3 && row.getCell('A').value) { // first two rows are headers. check equipment name in column A
        let newIndustrialSystem: IdbEnergyEquipment = getNewIdbEnergyEquipment(facility.userId, facility.companyId, facility.guid, facility.unitSettings);
        newIndustrialSystem.equipmentName = row.getCell('A').value as string;
        //TODO: add other fields from the excel sheet to the industrial system object
        //B industrial system type
        newIndustrialSystem.equipmentType = row.getCell('B').value as EquipmentType || undefined;
        //E utility type
        newIndustrialSystem.utilityType = row.getCell('E').value as UtilityType || 'Electricity';
        //F size
        newIndustrialSystem.size = row.getCell('F').value as number || 0;
        //G size units
        newIndustrialSystem.sizeUnit = row.getCell('G').value as string || 'kW';
        //H annual operating hours
        newIndustrialSystem.operatingHours = row.getCell('H').value as number || 0;
        //I load factor
        newIndustrialSystem.loadFactor = row.getCell('I').value as number || 0;
        //J Efficiency
        newIndustrialSystem.efficiency = row.getCell('J').value as number || 0;
        //K number of equipment
        newIndustrialSystem.numberOfEquipment = row.getCell('K').value as number || 0;
        //L notes
        newIndustrialSystem.notes = row.getCell('L').value as string || '';
        newIndustrialSystems.push(newIndustrialSystem);

      }
    });
    if (addItems) {
      for (let i = 0; i < newIndustrialSystems.length; i++) {
        await firstValueFrom(this.energyEquipmentIdbService.addWithObservable(newIndustrialSystems[i]));
      }
    }
    return newIndustrialSystems;
  }

  async parseEndUses(workbook: ExcelJS.Workbook, facility: IdbFacility, addItems: boolean): Promise<Array<IdbProcessEquipment>> {
    let newEndUses: Array<IdbProcessEquipment> = [];
    //process equipment
    let worksheet: ExcelJS.Worksheet = workbook.getWorksheet('End_Use_Inventory');
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 3 && row.getCell('A').value) { // first two rows are headers. check equipment name in column A
        let newEndUse: IdbProcessEquipment = getNewIdbProcessEquipment(facility.userId, facility.companyId, facility.guid);
        newEndUse.equipmentName = row.getCell('A').value as string;
        newEndUse.notes = row.getCell('B').value as string || '';
        newEndUses.push(newEndUse);
      }
    });
    if (addItems) {
      for (let i = 0; i < newEndUses.length; i++) {
        await firstValueFrom(this.processEquipmentIdbService.addWithObservable(newEndUses[i]));
      }
    }

    return newEndUses;
  }

  async parseAssessments(workbook: ExcelJS.Workbook, facility: IdbFacility, companyEnergyUnit: string, _onSiteVisit: IdbOnSiteVisit, addItems: boolean): Promise<{ assessments: Array<IdbAssessment>, onSiteVisit: IdbOnSiteVisit, facility: IdbFacility }> {
    let addedAssessments: Array<IdbAssessment> = [];
    let isNewVisit: boolean = false;
    let onSiteVisit: IdbOnSiteVisit;
    if (_onSiteVisit) {
      isNewVisit = false;
      onSiteVisit = _onSiteVisit;
    } else {
      isNewVisit = true;
      onSiteVisit = getNewIdbOnSiteVisit(facility.userId, facility.companyId, facility.guid)
    }
    let worksheet: ExcelJS.Worksheet = workbook.getWorksheet('Assessments');
    let facilityNeedsUpdate: boolean = false;
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 3 && row.getCell('A').value) { // first two rows are headers. check assessment name in column A
        let newAssessment: IdbAssessment = getNewIdbAssessment(facility.userId, facility.companyId, facility.guid, facility.unitSettings);
        if (addItems) {
          onSiteVisit.assessmentIds.push(newAssessment.guid);
        }
        newAssessment.name = row.getCell('A').value as string;
        newAssessment.assessmentType = row.getCell('B').value as AssessmentType;
        if (row.getCell('C').value === 'Assessment') {
          newAssessment.implementationCost = this.getExcelValueNum(row.getCell('D'));
          newAssessment.utilitySavingsByAssessment = true;
        }
        else {
          newAssessment.utilitySavingsByAssessment = false;
        }

        for (let i = 0; i < newAssessment.utilityEnergyUses.length; i++) {
          let utilityEnergyUse: UtilityEnergyUse = newAssessment.utilityEnergyUses[i];
          if (utilityEnergyUse.utilityType === 'Electricity') {
            utilityEnergyUse.include = row.getCell('E').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeElectricity) {
                facility.unitSettings.includeElectricity = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = this.getExcelValueNum(row.getCell('E'));
              utilityEnergyUse.energyUnit = row.getCell('F').value as string || 'kWh';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = this.getExcelValueNum(row.getCell('G'));
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Natural Gas') {
            utilityEnergyUse.include = row.getCell('H').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeNaturalGas) {
                facility.unitSettings.includeNaturalGas = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = this.getExcelValueNum(row.getCell('H'));
              utilityEnergyUse.energyUnit = row.getCell('I').value as string || 'MMBtu';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = this.getExcelValueNum(row.getCell('J'));
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Other Fuels') {
            utilityEnergyUse.include = row.getCell('K').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeOtherFuels) {
                facility.unitSettings.includeOtherFuels = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = this.getExcelValueNum(row.getCell('K'));
              utilityEnergyUse.energyUnit = row.getCell('L').value as string || 'MMBtu';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = this.getExcelValueNum(row.getCell('M'));
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Water') {
            utilityEnergyUse.include = row.getCell('N').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeWater) {
                facility.unitSettings.includeWater = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = this.getExcelValueNum(row.getCell('N'));
              utilityEnergyUse.energyUnit = row.getCell('O').value as string || 'kgal';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = this.getExcelValueNum(row.getCell('P'));
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Waste Water') {
            utilityEnergyUse.include = row.getCell('Q').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeWasteWater) {
                facility.unitSettings.includeWasteWater = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = this.getExcelValueNum(row.getCell('Q'));
              utilityEnergyUse.energyUnit = row.getCell('R').value as string || 'kgal';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = this.getExcelValueNum(row.getCell('S'));
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Compressed Air') {
            utilityEnergyUse.include = row.getCell('T').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeCompressedAir) {
                facility.unitSettings.includeCompressedAir = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = this.getExcelValueNum(row.getCell('T'));
              utilityEnergyUse.energyUnit = row.getCell('U').value as string || 'kSCF';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = this.getExcelValueNum(row.getCell('V'));
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Steam') {
            utilityEnergyUse.include = row.getCell('W').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeSteam) {
                facility.unitSettings.includeSteam = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = this.getExcelValueNum(row.getCell('W'));
              utilityEnergyUse.energyUnit = row.getCell('X').value as string || 'klb';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = this.getExcelValueNum(row.getCell('Y'));
              }
            }
          }
        }
        addedAssessments.push(newAssessment);
      }
    });

    if (addItems) {
      for (let i = 0; i < addedAssessments.length; i++) {
        addedAssessments[i] = updateAssessmentUtilityUseCostSavings(addedAssessments[i], facility.unitSettings, companyEnergyUnit);
        await firstValueFrom(this.assessmentIdbService.addWithObservable(addedAssessments[i]));
      }
      if (isNewVisit) {
        await firstValueFrom(this.onSiteVisitIdbService.addWithObservable(onSiteVisit));
      }
      if (facilityNeedsUpdate) {
        facility = await firstValueFrom(this.facilityIdbService.updateWithObservable(facility));
      }
    }
    return {
      assessments: addedAssessments,
      onSiteVisit: onSiteVisit,
      facility: facility
    };
  }

  async parseEnergyEfficiencyMeasures(workbook: ExcelJS.Workbook, assessments: Array<IdbAssessment>, addItems: boolean): Promise<Array<IdbEnergyOpportunity>> {
    let newEnergyEfficiencyMeasures: Array<IdbEnergyOpportunity> = [];
    //energy efficiency measures

    let worksheet: ExcelJS.Worksheet = workbook.getWorksheet('Energy_Efficiency_Measures');
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 3 && row.getCell('A').value) { // first two rows are headers. check eem name in column A
        let assessmentName: string = row.getCell('A').value as string;
        let assessment: IdbAssessment = assessments.find(a => a.name === assessmentName);
        if (assessment) {
          let newEnergyEfficiencyMeasure: IdbEnergyOpportunity = getNewIdbEnergyOpportunity(assessment.userId, assessment.companyId, assessment.facilityId, assessment.guid, assessment.utilityEnergyUses);
          newEnergyEfficiencyMeasure.name = row.getCell('D').value as string;
          newEnergyEfficiencyMeasure.utilityType = row.getCell('E').value as UtilityType;
          if (assessment.utilitySavingsByAssessment === false) {
            if (newEnergyEfficiencyMeasure.utilityType === 'Water' || newEnergyEfficiencyMeasure.utilityType === 'Waste Water') {
              newEnergyEfficiencyMeasure.waterSavings = this.getExcelValueNum(row.getCell('G'));
            } else {
              newEnergyEfficiencyMeasure.energySavings = this.getExcelValueNum(row.getCell('G'));
            }
            newEnergyEfficiencyMeasure.energyUnit = row.getCell('H').value as string;
            newEnergyEfficiencyMeasure.implementationCost = this.getExcelValueNum(row.getCell('F'));
            newEnergyEfficiencyMeasure.costSavings = this.getExcelValueNum(row.getCell('I'));
          }
          newEnergyEfficiencyMeasures.push(newEnergyEfficiencyMeasure);
        }
      }
    });
    if (addItems) {
      for (let i = 0; i < newEnergyEfficiencyMeasures.length; i++) {
        await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(newEnergyEfficiencyMeasures[i]));
      }
    }
    return newEnergyEfficiencyMeasures;
  }

  // industrialSystems: Array<IdbEnergyEquipment>
  checkIndustrialSystemsExist(industrialSystems: Array<IdbEnergyEquipment>, facility: IdbFacility): Array<IdbEnergyEquipment> {
    let facilityIndustrialSystems: Array<IdbEnergyEquipment> = this.energyEquipmentIdbService.getByOtherGuid(facility.guid, 'facility');
    for (let i = 0; i < industrialSystems.length; i++) {
      let existingSystem: IdbEnergyEquipment = facilityIndustrialSystems.find(system => system.equipmentName === industrialSystems[i].equipmentName);
      if (existingSystem) {
        industrialSystems[i].guid = existingSystem.guid;
        industrialSystems[i].id = existingSystem.id; // keep the id for updates
      }
    }
    return industrialSystems;
  }
  // endUses: Array<IdbProcessEquipment>,
  checkEndUsesExist(endUses: Array<IdbProcessEquipment>, facility: IdbFacility): Array<IdbProcessEquipment> {
    let facilityEndUses: Array<IdbProcessEquipment> = this.processEquipmentIdbService.getFacilityProcessEquipment(facility.guid);
    for (let i = 0; i < endUses.length; i++) {
      let existingEndUse: IdbProcessEquipment = facilityEndUses.find(endUse => endUse.equipmentName === endUses[i].equipmentName);
      if (existingEndUse) {
        endUses[i].guid = existingEndUse.guid;
        endUses[i].id = existingEndUse.id; // keep the id for updates
      }
    }
    return endUses;
  }
  // assessments: Array<IdbAssessment>,
  checkAssessmentsExist(assessments: Array<IdbAssessment>, onSiteVisit: IdbOnSiteVisit): Array<IdbAssessment> {
    let visitAssessments: Array<IdbAssessment> = [];
    onSiteVisit.assessmentIds.forEach(assessmentGuid => {
      let existingAssessment: IdbAssessment = this.assessmentIdbService.getByGuid(assessmentGuid);
      if (existingAssessment) {
        visitAssessments.push(existingAssessment);
      }
    });
    for (let i = 0; i < assessments.length; i++) {
      let existingAssessment: IdbAssessment = visitAssessments.find(assessment => assessment.name === assessments[i].name);
      if (existingAssessment) {
        assessments[i].guid = existingAssessment.guid;
        assessments[i].id = existingAssessment.id; // keep the id for updates
      }
    }
    return assessments;
  }
  // energyEfficiencyMeasures: Array<IdbEnergyOpportunity>
  checkAssessmentEnergyEfficiencyMeasuresExist(energyEfficiencyMeasures: Array<IdbEnergyOpportunity>, assessments: Array<IdbAssessment>): Array<IdbEnergyOpportunity> {
    for (let i = 0; i < energyEfficiencyMeasures.length; i++) {
      let assessment: IdbAssessment = assessments.find(a => a.guid === energyEfficiencyMeasures[i].assessmentId);
      if (assessment) {
        let assessmentEEMs: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.getByOtherGuid(assessment.guid, 'assessment');
        let existingEEM: IdbEnergyOpportunity = assessmentEEMs.find(eem => eem.name === energyEfficiencyMeasures[i].name);
        if (existingEEM) {
          energyEfficiencyMeasures[i].guid = existingEEM.guid;
          energyEfficiencyMeasures[i].id = existingEEM.id; // keep the id for updates
        } else {
          energyEfficiencyMeasures[i].guid = undefined; // new EEM
        }
      }
    }
    return energyEfficiencyMeasures;
  }

  getExcelValueNum(cell: ExcelJS.Cell): number {
    const value = cell.result !== undefined ? cell.result : cell.value;
    return value as number || 0;
  }

}
