import { Pipe, PipeTransform } from '@angular/core';
import { EquipmentType, EquipmentTypeOptions } from '../constants/equipmentTypes';
import { AssessmentOptions, AssessmentType } from '../constants/assessmentTypes';
import { UtilityOption, UtilityType } from '../constants/utilityTypes';

@Pipe({
    name: 'linkedUtilityOptions',
    standalone: false
})
export class LinkedUtilityOptionsPipe implements PipeTransform {

  transform(type: EquipmentType | AssessmentType, category: string): Array<UtilityType> {
    if (category === 'assessment') {
      return AssessmentOptions.find(assessmentType => assessmentType.assessmentType === type)?.utilityTypes || [];
    } else if (category === 'equipment') {
      return EquipmentTypeOptions.find(equipmentType => equipmentType.equipmentType === type)?.utilityTypes || [];
    } else {
      return [];
    }
  }
}
