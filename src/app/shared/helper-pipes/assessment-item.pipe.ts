import { Pipe, PipeTransform } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';

@Pipe({
  name: 'assessmentItem'
})
export class AssessmentItemPipe implements PipeTransform {

  transform(assessmentGuid: string, assessments: Array<IdbAssessment>): IdbAssessment {
    return assessments.find(a => {return a.guid == assessmentGuid});
  }

}
