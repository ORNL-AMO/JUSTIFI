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
    private toastnotificationService: ToastNotificationsService,
    private dbChangesService: DbChangesService
  ) { }

  /*
    * calculate assessment savings based on facility utility costs  
  */

  //return facility guid
  async parseWorkbook(workbook: ExcelJS.Workbook, user: IdbUser, company: IdbCompany): Promise<{
    facilityGuid: string,
    visitGuid: string,
  }> {
    this.loadingService.setLoadingMessage('Parsing Excel Template');
    this.loadingService.setLoadingStatus(true);
    let facility: IdbFacility = await this.parseFacility(workbook, user.guid, company.guid);
    if (facility) {
      let industrialSystems = await this.parseIndustrialSystems(workbook, facility);
      let endUses = await this.parseEndUses(workbook, facility);
      let assessmentsAndVisits: {
        assessments: Array<IdbAssessment>,
        onsiteVisits: Array<IdbOnSiteVisit>,
        facility: IdbFacility
      } = await this.parseAssessments(workbook, facility, company.companyEnergyUnit);
      let energyEfficiencyMeasures = await this.parseEnergyEfficiencyMeasures(workbook, assessmentsAndVisits.assessments);
      await this.dbChangesService.selectUser(user, true)
      this.loadingService.setLoadingStatus(false);
      let toastBody = `Parsed ${facility.generalInformation.name} with, ${industrialSystems.length} Industrial Systems, ${endUses.length} End Uses, ${assessmentsAndVisits.assessments.length} Assessments, ${energyEfficiencyMeasures.length} Energy Efficiency Measures`;
      this.toastnotificationService.showToast('Excel Template Parsed Successfully', toastBody, 'bg-success', true, false);
      return {
        facilityGuid: facility.guid,
        visitGuid: assessmentsAndVisits.onsiteVisits[0]?.guid
      };
    } else {
      this.loadingService.setLoadingStatus(false);
      this.toastnotificationService.showToast('Excel Template Parsing Failed', 'No Facilities Found in the Excel Template', 'bg-danger', true, false);
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

  async parseIndustrialSystems(workbook: ExcelJS.Workbook, facility: IdbFacility): Promise<Array<IdbEnergyEquipment>> {
    let newIndustrialSystems: Array<IdbEnergyEquipment> = [];
    //energy equipment
    let worksheet: ExcelJS.Worksheet = workbook.getWorksheet('Industrial_Systems');
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 3 && row.getCell('A').value) { // first two rows are headers. check equipment name in column A
        let newIndustrialSystem: IdbEnergyEquipment = getNewIdbEnergyEquipment(facility.userId, facility.companyId, facility.guid, facility.unitSettings);
        newIndustrialSystem.equipmentName = row.getCell('A').value as string;
        //TODO: add other fields from the excel sheet to the industrial system object
        newIndustrialSystems.push(newIndustrialSystem);

      }
    });
    for (let i = 0; i < newIndustrialSystems.length; i++) {
      await firstValueFrom(this.energyEquipmentIdbService.addWithObservable(newIndustrialSystems[i]));
    }

    return newIndustrialSystems;
  }

  async parseEndUses(workbook: ExcelJS.Workbook, facility: IdbFacility): Promise<Array<IdbProcessEquipment>> {
    let newEndUses: Array<IdbProcessEquipment> = [];
    //process equipment
    let worksheet: ExcelJS.Worksheet = workbook.getWorksheet('Industrial_Systems');
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 3 && row.getCell('A').value) { // first two rows are headers. check equipment name in column A
        let newEndUse: IdbProcessEquipment = getNewIdbProcessEquipment(facility.userId, facility.companyId, facility.guid);
        newEndUse.equipmentName = row.getCell('A').value as string;
        newEndUse.notes = row.getCell('B').value as string || '';
        newEndUses.push(newEndUse);
      }
    });
    for (let i = 0; i < newEndUses.length; i++) {
      await firstValueFrom(this.processEquipmentIdbService.addWithObservable(newEndUses[i]));
    }

    return newEndUses;
  }

  async parseAssessments(workbook: ExcelJS.Workbook, facility: IdbFacility, companyEnergyUnit: string): Promise<{ assessments: Array<IdbAssessment>, onsiteVisits: Array<IdbOnSiteVisit>, facility: IdbFacility }> {
    let addedAssessments: Array<IdbAssessment> = [];
    let addedOnSiteVisits: Array<IdbOnSiteVisit> = [];
    let worksheet: ExcelJS.Worksheet = workbook.getWorksheet('Assessments');
    let facilityNeedsUpdate: boolean = false;
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber >= 3 && row.getCell('A').value) { // first two rows are headers. check assessment name in column A
        let assessmentDate: Date = new Date();
        if (row.getCell('C').value) {
          const cellValue = row.getCell('C').value;
          if (typeof cellValue === 'string' || typeof cellValue === 'number' || cellValue instanceof Date) {
            assessmentDate = new Date(cellValue);
          }
        }

        //get onsite visit
        let isNewVisit: boolean = false;
        let onSiteVisit: IdbOnSiteVisit = addedOnSiteVisits.find(visit => {
          return visit.visitDate.getFullYear() === assessmentDate.getFullYear() &&
            visit.visitDate.getMonth() === assessmentDate.getMonth() &&
            visit.visitDate.getDate() === assessmentDate.getDate()
        });
        if (!onSiteVisit) {
          isNewVisit = true;
          onSiteVisit = getNewIdbOnSiteVisit(facility.userId, facility.companyId, facility.guid);
          onSiteVisit.visitDate = assessmentDate;
          onSiteVisit.sidebarReportsOpen = false;
        }


        let newAssessment: IdbAssessment = getNewIdbAssessment(facility.userId, facility.companyId, facility.guid, facility.unitSettings);
        onSiteVisit.assessmentIds.push(newAssessment.guid);
        newAssessment.name = row.getCell('A').value as string;
        newAssessment.assessmentType = row.getCell('B').value as AssessmentType;
        if (row.getCell('D').value === 'Assessment') {
          newAssessment.implementationCost = row.getCell('E').value as number || 0;
          newAssessment.utilitySavingsByAssessment = true;
        }
        else {
          newAssessment.utilitySavingsByAssessment = false;
        }

        for (let i = 0; i < newAssessment.utilityEnergyUses.length; i++) {
          let utilityEnergyUse: UtilityEnergyUse = newAssessment.utilityEnergyUses[i];
          if (utilityEnergyUse.utilityType === 'Electricity') {
            utilityEnergyUse.include = row.getCell('F').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeElectricity) {
                facility.unitSettings.includeElectricity = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = row.getCell('F').value as number || 0;
              utilityEnergyUse.energyUnit = row.getCell('G').value as string || 'kWh';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = row.getCell('H').value as number || 0;
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Natural Gas') {
            utilityEnergyUse.include = row.getCell('I').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeNaturalGas) {
                facility.unitSettings.includeNaturalGas = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = row.getCell('I').value as number || 0;
              utilityEnergyUse.energyUnit = row.getCell('J').value as string || 'MMBtu';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = row.getCell('K').value as number || 0;
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Other Fuels') {
            utilityEnergyUse.include = row.getCell('L').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeOtherFuels) {
                facility.unitSettings.includeOtherFuels = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = row.getCell('L').value as number || 0;
              utilityEnergyUse.energyUnit = row.getCell('M').value as string || 'MMBtu';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = row.getCell('N').value as number || 0;
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Water') {
            utilityEnergyUse.include = row.getCell('O').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeWater) {
                facility.unitSettings.includeWater = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = row.getCell('O').value as number || 0;
              utilityEnergyUse.energyUnit = row.getCell('P').value as string || 'kgal';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = row.getCell('Q').value as number || 0;
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Waste Water') {
            utilityEnergyUse.include = row.getCell('R').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeWasteWater) {
                facility.unitSettings.includeWasteWater = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = row.getCell('R').value as number || 0;
              utilityEnergyUse.energyUnit = row.getCell('S').value as string || 'kgal';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = row.getCell('T').value as number || 0;
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Compressed Air') {
            utilityEnergyUse.include = row.getCell('U').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeCompressedAir) {
                facility.unitSettings.includeCompressedAir = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = row.getCell('U').value as number || 0;
              utilityEnergyUse.energyUnit = row.getCell('V').value as string || 'kSCF';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = row.getCell('W').value as number || 0;
              }
            }
          }
          else if (utilityEnergyUse.utilityType === 'Steam') {
            utilityEnergyUse.include = row.getCell('X').value ? true : false;
            if (utilityEnergyUse.include) {
              if (!facility.unitSettings.includeSteam) {
                facility.unitSettings.includeSteam = true;
                facilityNeedsUpdate = true;
              }
              utilityEnergyUse.energyUse = row.getCell('X').value as number || 0;
              utilityEnergyUse.energyUnit = row.getCell('Y').value as string || 'klb';
              if (newAssessment.utilitySavingsByAssessment) {
                utilityEnergyUse.utilitySaving = row.getCell('Z').value as number || 0;
              }
            }
          }
        }
        addedAssessments.push(newAssessment);
        if (isNewVisit) {
          addedOnSiteVisits.push(onSiteVisit);
        }
      }
    });

    for (let i = 0; i < addedAssessments.length; i++) {
      addedAssessments[i] = updateAssessmentUtilityUseCostSavings(addedAssessments[i], facility.unitSettings, companyEnergyUnit);
      await firstValueFrom(this.assessmentIdbService.addWithObservable(addedAssessments[i]));
    }
    for (let i = 0; i < addedOnSiteVisits.length; i++) {
      await firstValueFrom(this.onSiteVisitIdbService.addWithObservable(addedOnSiteVisits[i]));
    }
    if (facilityNeedsUpdate) {
      facility = await firstValueFrom(this.facilityIdbService.updateWithObservable(facility));
    }
    return {
      assessments: addedAssessments,
      onsiteVisits: addedOnSiteVisits,
      facility: facility
    };
  }

  async parseEnergyEfficiencyMeasures(workbook: ExcelJS.Workbook, assessments: Array<IdbAssessment>): Promise<Array<IdbEnergyOpportunity>> {
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
              newEnergyEfficiencyMeasure.waterSavings = row.getCell('G').value as number || 0;
            } else {
              newEnergyEfficiencyMeasure.energySavings = row.getCell('G').value as number || 0;
            }
            newEnergyEfficiencyMeasure.energyUnit = row.getCell('H').value as string;
            //TODO: set default if not provided based on utility type
            newEnergyEfficiencyMeasure.implementationCost = row.getCell('F').value as number || 0;
            newEnergyEfficiencyMeasure.costSavings = row.getCell('I').value as number || 0;
          }
          newEnergyEfficiencyMeasures.push(newEnergyEfficiencyMeasure);
        }
      }
    });
    for (let i = 0; i < newEnergyEfficiencyMeasures.length; i++) {
      await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(newEnergyEfficiencyMeasures[i]));
    }
    return newEnergyEfficiencyMeasures;
  }
}
