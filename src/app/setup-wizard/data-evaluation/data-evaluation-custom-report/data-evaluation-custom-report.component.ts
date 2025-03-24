import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faFilePdf, faFilePen, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbReport } from 'src/app/models/report';

@Component({
  selector: 'app-data-evaluation-custom-report',
  standalone: false,

  templateUrl: './data-evaluation-custom-report.component.html',
  styleUrl: './data-evaluation-custom-report.component.css'
})
export class DataEvaluationCustomReportComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faFilePen: IconDefinition = faFilePen;
  faFilePdf: IconDefinition = faFilePdf;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  // reports: Array<IdbReport>;
  reportSub: Subscription;
  report: IdbReport;
  constructor(private router: Router, private reportIdbService: ReportIdbService,
    private activatedRoute: ActivatedRoute,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) { }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(_visit => {
      this.onSiteVisit = _visit;
    });
    this.reportSub = this.reportIdbService.selectedReport.subscribe(_report => {
      this.report = _report;
    });

    this.activatedRoute.params.subscribe(params => {
      let reportGuid: string = params['id'];
      if (this.onSiteVisit) {
        let reportExists: boolean = this.reportIdbService.setSelectedFromGUID(reportGuid);
        if (!reportExists) {
          this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/manage-assessments');
        }
      } else {
        console.log('visit does not exist. Nav back to getting started..');
        this.router.navigateByUrl('/welcome');
      }
    });
  }

  ngOnDestroy() {
    this.onSiteVisitSub.unsubscribe();
    this.reportSub.unsubscribe();
  }

  goToNextReport() {
    // this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex + 1], 'details');
  }

  goBack() {
    // if (this.router.url.includes('details')) {
    //   if (this.assessmentIndex != 0) {
    //     this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex - 1], 'nebs');
    //   } else {
    //     this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/manage-assessments');
    //   }
    // } else if (this.router.url.includes('energy-opportunities')) {
    //   this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/details');
    // } else if (this.router.url.includes('nebs')) {
    //   this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/energy-opportunities');
    // }
  }

  goToNext() {
    // if (this.router.url.includes('details')) {
    //   this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/energy-opportunities');
    // } else if (this.router.url.includes('energy-opportunities')) {
    //   this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/nebs');
    // } else if (this.router.url.includes('nebs')) {
    //   if (this.assessmentIndex != this.onSiteVisit.assessmentIds.length - 1) {
    //     this.goToNextAssessment();
    //   } else {
    //     //TODO: Issue 226
    //     // this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/review-data-collection');
    //     this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid);
    //   }
    // }
  }

  togglePrint(){
    
  }
}
