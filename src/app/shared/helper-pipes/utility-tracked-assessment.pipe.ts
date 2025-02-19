import { Pipe, PipeTransform } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';
import { UtilityEnergyUse } from 'src/app/models/utilityEnergyUses';

@Pipe({
  name: 'utilityTrackedAssessment',
  standalone: false,
})
export class UtilityTrackedAssessmentPipe implements PipeTransform {

  transform(utilityEnergyUses: Array<UtilityEnergyUse>, utilityCategory: string): boolean {
    if (utilityCategory == 'energy') {
      for (const use of utilityEnergyUses) {
        if (use.include && 
            (use.utilityType !== "Water" && use.utilityType !== "Waste Water")) {
          return true;
        }
      }
    } else if (utilityCategory == 'water') {
      for (const use of utilityEnergyUses) {
        if (use.include && 
            (use.utilityType == "Water" || use.utilityType == "Waste Water")) {
          return true;
        }
      }
    }
    return false;
  }
}
