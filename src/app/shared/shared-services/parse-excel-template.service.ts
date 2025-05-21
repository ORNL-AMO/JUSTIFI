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
import * as XLSX from 'xlsx';
import * as _ from 'lodash'
import { getNewIdbOnSiteVisit, IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { getNewIdbAssessment, IdbAssessment } from 'src/app/models/assessment';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { getNewIdbEnergyOpportunity, IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { IdbUser } from 'src/app/models/user';
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

  //return facility guid
  async parseWorkbook(workbook: XLSX.WorkBook, user: IdbUser, companyGuid: string): Promise<{
    facilityGuid: string,
    visitGuid: string,
  }> {
    this.loadingService.setLoadingMessage('Parsing Excel Template');
    this.loadingService.setLoadingStatus(true);
    let facilities: Array<IdbFacility> = await this.parseFacilities(workbook, user.guid, companyGuid);
    if (facilities.length > 0) {
      let industrialSystems = await this.parseIndustrialSystems(workbook, facilities);
      let endUses = await this.parseEndUses(workbook, facilities);
      let assessmentsAndVisits: {
        assessments: Array<IdbAssessment>,
        onsiteVisits: Array<IdbOnSiteVisit>
      } = await this.parseAssessments(workbook, facilities);
      let energyEfficiencyMeasures = await this.parseEnergyEfficiencyMeasures(workbook, facilities, assessmentsAndVisits.assessments);
      await this.dbChangesService.selectUser(user, true)
      this.loadingService.setLoadingStatus(false);
      let toastBody = `Parsed ${facilities.length} Facilities, ${industrialSystems.length} Industrial Systems, ${endUses.length} End Uses, ${assessmentsAndVisits.assessments.length} Assessments, ${energyEfficiencyMeasures.length} Energy Efficiency Measures`;
      this.toastnotificationService.showToast('Excel Template Parsed Successfully', toastBody, 'bg-success', true, false);
      return {
        facilityGuid: facilities[0].guid,
        visitGuid: assessmentsAndVisits.onsiteVisits[0]?.guid
      };
    } else {
      this.loadingService.setLoadingStatus(false);
      this.toastnotificationService.showToast('Excel Template Parsing Failed', 'No Facilities Found in the Excel Template', 'bg-danger', true, false);
      return undefined;
    }
  }

  async parseFacilities(workbook: XLSX.WorkBook, userGuid: string, companyGuid: string): Promise<Array<IdbFacility>> {
    let newFacilities: Array<IdbFacility> = [];
    let facilitiesData = XLSX.utils.sheet_to_json(workbook.Sheets['Facilities']);
    for (let i = 0; i < facilitiesData.length; i++) {
      let facilityData = facilitiesData[i];
      let newFacility: IdbFacility = getNewIdbFacility(userGuid, companyGuid);
      newFacility.generalInformation.name = facilityData['Facility Name'];
      //TODO: add other fields from the excel sheet to the facility object

      newFacility = await firstValueFrom(this.facilityIdbService.addWithObservable(newFacility));
      newFacilities.push(newFacility);
    }
    return newFacilities;
  }

  async parseIndustrialSystems(workbook: XLSX.WorkBook, facilities: Array<IdbFacility>): Promise<Array<IdbEnergyEquipment>> {
    let newIndustrialSystems: Array<IdbEnergyEquipment> = [];
    //energy equipment
    let industrialSystemsData = XLSX.utils.sheet_to_json(workbook.Sheets['Industrial_Systems']);
    for (let i = 0; i < industrialSystemsData.length; i++) {
      let industrialSystemData = industrialSystemsData[i];
      let facility: IdbFacility = facilities.find(facility => facility.generalInformation.name == industrialSystemData['Facility Name']);
      if (facility) {
        let newIndustrialSystem: IdbEnergyEquipment = getNewIdbEnergyEquipment(facility.userId, facility.companyId, facility.guid, facility.unitSettings);
        newIndustrialSystem.equipmentName = industrialSystemData['Equipment Name'];
        //TODO: add other fields from the excel sheet to the industrial system object

        newIndustrialSystem = await firstValueFrom(this.energyEquipmentIdbService.addWithObservable(newIndustrialSystem));
        newIndustrialSystems.push(newIndustrialSystem);
      }
    }
    return newIndustrialSystems;
  }

  async parseEndUses(workbook: XLSX.WorkBook, facilities: Array<IdbFacility>): Promise<Array<IdbProcessEquipment>> {
    let newEndUses: Array<IdbProcessEquipment> = [];
    //process equipment
    let endUsesData = XLSX.utils.sheet_to_json(workbook.Sheets['End_Use_Inventory']);
    for (let i = 0; i < endUsesData.length; i++) {
      let endUseData = endUsesData[i];
      let facility: IdbFacility = facilities.find(facility => facility.generalInformation.name == endUseData['Facility Name']);
      if (facility) {
        let newEndUse: IdbProcessEquipment = getNewIdbProcessEquipment(facility.userId, facility.companyId, facility.guid);
        newEndUse.equipmentName = endUseData['End Use Name'];
        //TODO: add other fields from the excel sheet to the industrial system object

        await firstValueFrom(this.processEquipmentIdbService.addWithObservable(newEndUse));
        newEndUses.push(newEndUse);
      }
    }
    return newEndUses;
  }

  async parseAssessments(workbook: XLSX.WorkBook, facilities: Array<IdbFacility>): Promise<{ assessments: Array<IdbAssessment>, onsiteVisits: Array<IdbOnSiteVisit> }> {
    let addedAssessments: Array<IdbAssessment> = [];
    let addedOnSiteVisits: Array<IdbOnSiteVisit> = [];
    //Current assumption is all same visit. Create a new visit for all assessments
    let assessmentsData = XLSX.utils.sheet_to_json(workbook.Sheets['Assessments']);
    let facilityNames: Array<string> = assessmentsData.map(assessment => assessment['Facility Name']);
    facilityNames = _.uniq(facilityNames);
    for (let i = 0; i < facilityNames.length; i++) {
      //create assessments for each facility
      let facilityName = facilityNames[i];
      let facility: IdbFacility = facilities.find(facility => facility.generalInformation.name == facilityName);
      if (facility) {
        //filter assessments for the facility
        let facilityAssessments = assessmentsData.filter(assessment => assessment['Facility Name'] == facilityName);
        let facilityAssessmentDates: Array<Date> = facilityAssessments.map(assessment => new Date(assessment['Assessment Date']));
        facilityAssessmentDates = _.uniq(facilityAssessmentDates);
        //create visit for each unique date
        for (let j = 0; j < facilityAssessmentDates.length; j++) {
          let newOnSiteVisit: IdbOnSiteVisit = getNewIdbOnSiteVisit(facility.userId, facility.companyId, facility.guid);
          newOnSiteVisit.visitDate = facilityAssessmentDates[j];
          console.log('visitDate', newOnSiteVisit.visitDate);
          let visitAssessments = facilityAssessments.filter(assessment => {
            const aDate = new Date(assessment['Assessment Date']);
            const fDate = facilityAssessmentDates[j];
            return (
              aDate.getFullYear() === fDate.getFullYear() &&
              aDate.getMonth() === fDate.getMonth() &&
              aDate.getDate() === fDate.getDate()
            );
          });
          for (let k = 0; k < visitAssessments.length; k++) {
            let visitAssessment = visitAssessments[k];
            let newAssessment: IdbAssessment = getNewIdbAssessment(facility.userId, facility.companyId, facility.guid, facility.unitSettings);
            newAssessment.name = visitAssessment['Assessment Name'];
            //TODO: add other fields from the excel sheet to the assessment object
            newOnSiteVisit.assessmentIds.push(newAssessment.guid);
            newAssessment = await firstValueFrom(this.assessmentIdbService.addWithObservable(newAssessment));
            addedAssessments.push(newAssessment);
          }
          newOnSiteVisit = await firstValueFrom(this.onSiteVisitIdbService.addWithObservable(newOnSiteVisit));
          addedOnSiteVisits.push(newOnSiteVisit);
        }
      }
    }
    return {
      assessments: addedAssessments,
      onsiteVisits: addedOnSiteVisits
    };
  }

  async parseEnergyEfficiencyMeasures(workbook: XLSX.WorkBook, facilities: Array<IdbFacility>, assessments: Array<IdbAssessment>): Promise<Array<IdbEnergyOpportunity>> {
    let newEnergyEfficiencyMeasures: Array<IdbEnergyOpportunity> = [];
    //energy efficiency measures
    let energyEfficiencyMeasuresData = XLSX.utils.sheet_to_json(workbook.Sheets['Energy_Efficiency_Measures']);
    for (let i = 0; i < energyEfficiencyMeasuresData.length; i++) {
      let energyEfficiencyMeasureData = energyEfficiencyMeasuresData[i];
      let assessment: IdbAssessment = assessments.find(assessment => assessment.name == energyEfficiencyMeasureData['Assessment Name'])
      if (assessment) {
        let newEnergyEfficiencyMeasure: IdbEnergyOpportunity = getNewIdbEnergyOpportunity(assessment.userId, assessment.companyId, assessment.guid, assessment.guid, assessment.utilityEnergyUses);
        newEnergyEfficiencyMeasure.name = energyEfficiencyMeasureData['Energy Efficiency Measure Name'];
        //TODO: add other fields from the excel sheet to the energy efficiency measure object

        await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(newEnergyEfficiencyMeasure));
        newEnergyEfficiencyMeasures.push(newEnergyEfficiencyMeasure);
      }
    }

    return newEnergyEfficiencyMeasures;
  }
}
