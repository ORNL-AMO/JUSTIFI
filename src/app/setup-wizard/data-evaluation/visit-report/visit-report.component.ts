import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChartColumn, faChevronLeft, faChevronRight, faFilePdf, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
    selector: 'app-visit-report',
    templateUrl: './visit-report.component.html',
    styleUrl: './visit-report.component.css',
    standalone: false
})
export class VisitReportComponent {

  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faFilePdf: IconDefinition = faFilePdf;
  
  faChartColumn: IconDefinition = faChartColumn;

  onSiteVisit: IdbOnSiteVisit;
  assessments: Array<IdbAssessment>;
    print: boolean;
    printSub: Subscription;
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService,
        private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    this.onSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.assessments = new Array();
    this.onSiteVisit.assessmentIds.forEach(assessmentId => {
      let assessment: IdbAssessment = this.assessmentIdbService.getByGuid(assessmentId);
      this.assessments.push(assessment);
    });
    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
      if (this.print) {
        this.printReport();
      }
    });
  }

  ngOnDestroy(){
    this.printSub.unsubscribe();
  }

  goNext() {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/executive-summary');
  }

  goBack() {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/assessment-report/' + this.onSiteVisit.assessmentIds[this.onSiteVisit.assessmentIds.length - 1]);
  }

  togglePrint() {
    this.sharedDataService.print.next(true);
  }

  printReport() {
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
      setTimeout(() => {
        window.print();
        this.sharedDataService.print.next(false)
      }, 1000)
    }, 100)
  }
}
