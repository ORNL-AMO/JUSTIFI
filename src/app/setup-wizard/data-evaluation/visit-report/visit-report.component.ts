import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChartColumn, faChevronLeft, faChevronRight, faFileExcel, faFilePdf, faFilePowerpoint, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { DataEvaluationExcelWriterService } from 'src/app/shared/shared-services/data-evaluation-excel-writer.service';
import { PowerpointReportGeneratorService } from 'src/app/shared/shared-services/powerpoint-report-generator.service';
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
  faFilePowerpoint: IconDefinition = faFilePowerpoint;
  faFileExcel: IconDefinition = faFileExcel;

  faChartColumn: IconDefinition = faChartColumn;

  onSiteVisit: IdbOnSiteVisit;
  assessments: Array<IdbAssessment>;
  print: boolean;
  printSub: Subscription;
  constructor(private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private sharedDataService: SharedDataService,
    private powerpointReportGeneratorService: PowerpointReportGeneratorService,
    private dataEvaluationExcelWriterService: DataEvaluationExcelWriterService
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

  ngOnDestroy() {
    this.printSub.unsubscribe();
  }

  goNext() {
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/stakeholder-report');
  }

  goBack() {
    if (this.onSiteVisit.assessmentIds.length === 0) {
      this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/executive-summary');
    } else {
      this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/assessment-report/' + this.onSiteVisit.assessmentIds[this.onSiteVisit.assessmentIds.length - 1]);
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
    this.powerpointReportGeneratorService.createRollupPPT(this.onSiteVisit);
  }

  exportToExcel() {
    this.sharedDataService.exportReportToExcel.next('on_site_visit');
    this.dataEvaluationExcelWriterService.exportSiteVisitToExcel(this.onSiteVisit);
    this.sharedDataService.exportReportToExcel.next(undefined);
  }
}
