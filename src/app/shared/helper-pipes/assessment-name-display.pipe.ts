import { Pipe, PipeTransform } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';

@Pipe({
    name: 'assessmentNameDisplay',
    standalone: false
})
export class AssessmentNameDisplayPipe implements PipeTransform {

  transform(assessmentGUID: string, assessments: Array<IdbAssessment>): string {
    let assessment: IdbAssessment = assessments.find(assessment => {
      return assessment.guid == assessmentGUID;
    });
    if (assessment) {
      return assessment.name;
    }
    return null;
  }

}
