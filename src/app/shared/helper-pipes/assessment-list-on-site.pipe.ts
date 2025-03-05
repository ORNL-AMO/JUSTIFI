import { Pipe, PipeTransform } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';

@Pipe({
    name: 'assessmentListOnSite',
    standalone: false
})
export class AssessmentListOnSitePipe implements PipeTransform {

  transform(assessmentIds: Array<string>, allAssessments: Array<IdbAssessment>): Array<IdbAssessment> {
    return allAssessments.filter(assessment => { return assessmentIds.includes(assessment.guid) });
  }

}
