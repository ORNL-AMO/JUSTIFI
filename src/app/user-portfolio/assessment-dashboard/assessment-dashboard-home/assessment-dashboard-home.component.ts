import { Component } from '@angular/core';
import { faFileLines, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';

@Component({
  selector: 'app-assessment-dashboard-home',
  templateUrl: './assessment-dashboard-home.component.html',
  styleUrl: './assessment-dashboard-home.component.css'
})
export class AssessmentDashboardHomeComponent {

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
