import { Pipe, PipeTransform } from '@angular/core';
import { IdbAssessment } from 'src/app/models/assessment';

@Pipe({
    name: 'assessmentsList',
    standalone: false
})
export class AssessmentsListPipe implements PipeTransform {

  transform(facilityOrCompanyGUID: string, allAssessments: Array<IdbAssessment>, isCompany?: boolean): Array<IdbAssessment> {
    if (!isCompany) {
      return allAssessments.filter(assessment => { return assessment.facilityId == facilityOrCompanyGUID });
    } else {
      return allAssessments.filter(assessment => { return assessment.companyId == facilityOrCompanyGUID });
    }
  }

}
