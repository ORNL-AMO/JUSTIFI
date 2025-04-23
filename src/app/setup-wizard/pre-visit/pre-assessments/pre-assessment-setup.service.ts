import { Injectable } from '@angular/core';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { UnitSettings } from 'src/app/models/unitSettings';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';
import { UtilityOptions } from 'src/app/shared/constants/utilityTypes';
import { ConvertValue } from 'src/app/shared/conversions/convertValue';
import { calculateAssessmentUtilityCostSavings, calculateAssessmentUtilityUseSavings } from 'src/app/shared/reports/calculations/utilityCalculation';

@Injectable({
  providedIn: 'root'
})
export class PreAssessmentSetupService {
  convertValue = new ConvertValue();

  constructor(private assessmentIdbService: AssessmentIdbService) { }

  async updateAssessmentUtilityUseSaving(assessments: Array<IdbAssessment>, companyEnergyUnit: string) {
    for (let assessment of assessments) {
      assessment = calculateAssessmentUtilityUseSavings(assessment, companyEnergyUnit);
      await this.saveChanges(assessment);
    }
  }

  async updateAssessmentUtilityCostSavings(assessments: Array<IdbAssessment>, facilityUnitSettings: UnitSettings) {
    for (let assessment of assessments) {
      assessment = calculateAssessmentUtilityCostSavings(assessment, facilityUnitSettings);
      await this.saveChanges(assessment);
    }
  }

  async saveChanges(assessment: IdbAssessment) {
    await this.assessmentIdbService.asyncUpdate(assessment);
  }
}
