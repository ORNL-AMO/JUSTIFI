import { Injectable } from '@angular/core';
import pptxgen from 'pptxgenjs';
import { AssessmentReport } from '../reports/calculations/assessmentReport';

@Injectable({
  providedIn: 'root'
})
export class PowerpointReportGeneratorService {

  constructor() { }

  createPPT(assessmentReport: AssessmentReport) {
    let pptx = new pptxgen();
    //TODO: create powerpoint

    pptx.writeFile({ fileName: 'Assessment_Report.pptx' });
  }
}
