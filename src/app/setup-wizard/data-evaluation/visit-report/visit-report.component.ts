import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChartPie, faChevronLeft, faFolderOpen, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-visit-report',
  templateUrl: './visit-report.component.html',
  styleUrl: './visit-report.component.css'
})
export class VisitReportComponent {

  faChevronLeft: IconDefinition = faChevronLeft;
  faFolderOpen: IconDefinition = faFolderOpen;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faChartPie: IconDefinition = faChartPie;

  onSiteVisit: IdbOnSiteVisit;
  assessments: Array<IdbAssessment>;
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) {

  }

  ngOnInit() {
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.assessments = new Array();
    this.onSiteVisit.assessmentIds.forEach(assessmentId => {
      let assessment: IdbAssessment = this.assessmentIdbService.getByGuid(assessmentId);
      this.assessments.push(assessment);
    })
  }

  goNext() {
    this.router.navigateByUrl('/facility/' + this.onSiteVisit.facilityId);
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/assessment-report/' + this.onSiteVisit.assessmentIds[this.onSiteVisit.assessmentIds.length - 1]);
  }
}
