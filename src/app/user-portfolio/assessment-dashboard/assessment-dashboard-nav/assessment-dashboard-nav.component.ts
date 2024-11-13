import { Component } from '@angular/core';
import { faFile, faFileLines, faGears, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';

@Component({
  selector: 'app-assessment-dashboard-nav',
  templateUrl: './assessment-dashboard-nav.component.html',
  styleUrl: './assessment-dashboard-nav.component.css'
})
export class AssessmentDashboardNavComponent {

  faGears: IconDefinition = faGears;
  faFile: IconDefinition = faFile;
  faWeightHanging: IconDefinition = faWeightHanging;
  faFileLines: IconDefinition = faFileLines;
  
  assessment: IdbAssessment;
  assessmentSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessment = assessment;
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
  }
}
