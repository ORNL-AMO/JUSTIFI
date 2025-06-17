import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faChartPie, faFilePdf, faFilePowerpoint } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { PowerpointReportGeneratorService } from 'src/app/shared/shared-services/powerpoint-report-generator.service';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessment-evaluation',
  templateUrl: './assessment-evaluation.component.html',
  styleUrl: './assessment-evaluation.component.css',
  standalone: false
})
export class AssessmentEvaluationComponent {
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faFilePdf: IconDefinition = faFilePdf;
  faChartPie: IconDefinition = faChartPie;

  faFilePowerpoint: IconDefinition = faFilePowerpoint;

  assessmentIndex: number;
  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;
  assessment: IdbAssessment;
  assessmentSub: Subscription;
  print: boolean;
  printSub: Subscription;
  isLastAssessment: boolean;
  isFirstAssessment: boolean;
  constructor(private activatedRoute: ActivatedRoute, private assessmentIdbService: AssessmentIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private powerpointReportGeneratorService: PowerpointReportGeneratorService
  ) {

  }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(_visit => {
      this.onSiteVisit = _visit;
    });

    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    });

    this.activatedRoute.params.subscribe(params => {
      let assessmentGUID: string = params['id'];
      this.assessmentIndex = this.onSiteVisit.assessmentIds.findIndex(_assessmentGuid => { return _assessmentGuid == assessmentGUID });
      if (this.assessmentIndex == this.onSiteVisit.assessmentIds.length - 1) 
        this.isLastAssessment = true;
      else
        this.isLastAssessment = false;
      if(this.assessmentIndex == 0)
        this.isFirstAssessment = true;
      else
      this.isFirstAssessment = false;
      if (this.assessmentIndex != -1) {
        this.assessmentIdbService.setSelectedFromGUID(this.onSiteVisit.assessmentIds[this.assessmentIndex]);
      } else if (this.assessmentIndex == -1 && this.onSiteVisit.assessmentIds.length > 0) {
        this.navigateToAssessmentReport(this.onSiteVisit.assessmentIds[0]);
      } else if (!this.assessment) {
        this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/manage-assessments');
      }
    });

    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
      if (this.print) {
        this.printReport();
      }
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.printSub.unsubscribe();
  }

  goToNextAssessment() {
    this.navigateToAssessmentReport(this.onSiteVisit.assessmentIds[this.assessmentIndex + 1]);
  }

  goBack() {
    if (this.assessmentIndex != 0) {
      this.isFirstAssessment = false;
      this.navigateToAssessmentReport(this.onSiteVisit.assessmentIds[this.assessmentIndex - 1]);
    } else {
      this.isFirstAssessment = true;
      this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/executive-summary');
    }
  }

  navigateToAssessmentReport(guid: string) {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/assessment-report/' + guid);
  }

  goToNext() {
    if (this.assessmentIndex != this.onSiteVisit.assessmentIds.length - 1) {
      this.isLastAssessment = false;
      this.goToNextAssessment();
    } else {
      this.isLastAssessment = true;
      this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/visit-report');
    }
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

  generatePowerPoint() {
    this.sharedDataService.createPowerPoint.next(true);
    this.sharedDataService.createPowerPoint.next(false);
  }
}
