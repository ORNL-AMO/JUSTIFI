import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faFileExcel, faFilePdf, faFilePen, faFolderOpen, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbReport } from 'src/app/models/report';
import { DataEvaluationExcelWriterService } from 'src/app/shared/shared-services/data-evaluation-excel-writer.service';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

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
  faFolderOpen: IconDefinition = faFolderOpen;
  faFileExcel: IconDefinition = faFileExcel;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  // reports: Array<IdbReport>;
  reportSub: Subscription;
  report: IdbReport;
  print: boolean;
  printSub: Subscription;

  isLastReport: boolean;
  isFirstReport: boolean;

  assessments: Array<IdbAssessment>;
  constructor(private router: Router, private reportIdbService: ReportIdbService,
    private activatedRoute: ActivatedRoute,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private sharedDataService: SharedDataService,
    private dataEvaluationExcelWriterService: DataEvaluationExcelWriterService,
    private assessmentIdbService: AssessmentIdbService
  ) { }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(_visit => {
      this.onSiteVisit = _visit;
    });
    this.reportSub = this.reportIdbService.selectedReport.subscribe(_report => {
      this.report = _report;
      if (this.report) {
        this.setIsLastReport();
      }
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

    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
      if (this.print) {
        this.printReport();
      }
    });

    this.assessments = this.assessmentIdbService.assessments.getValue();
  }

  ngOnDestroy() {
    this.onSiteVisitSub.unsubscribe();
    this.reportSub.unsubscribe();
  }

  goBack() {
    let onSiteVisitReports: Array<IdbReport> = this.reportIdbService.getReportsByOnSiteVisitId(this.onSiteVisit.guid);
    let reportIndex: number = onSiteVisitReports.findIndex(report => { return report.guid == this.report.guid });
    if (reportIndex != 0) {
      this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/custom-report/' + onSiteVisitReports[reportIndex - 1].guid);
    } else {
      this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/custom-report');
    }
  }

  goToNext() {
    let onSiteVisitReports: Array<IdbReport> = this.reportIdbService.getReportsByOnSiteVisitId(this.onSiteVisit.guid);
    let reportIndex: number = onSiteVisitReports.findIndex(report => { return report.guid == this.report.guid });
    this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/custom-report/' + onSiteVisitReports[reportIndex + 1].guid);
  }

  setIsLastReport() {
    let onSiteVisitReports: Array<IdbReport> = this.reportIdbService.getReportsByOnSiteVisitId(this.onSiteVisit.guid);
    let reportIndex: number = onSiteVisitReports.findIndex(report => { return report.guid == this.report.guid });
    this.isLastReport = (onSiteVisitReports.length - 1) == reportIndex;
    this.isFirstReport = (reportIndex == 0) ? true : false;
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

  goToPortfolio() {
    this.router.navigateByUrl('/portfolio/facility/' + this.onSiteVisit.facilityId);
  }

  exportToExcel() {
    this.sharedDataService.exportReportToExcel.next('custom_report');
    this.dataEvaluationExcelWriterService.exportCustomReportToExcel(this.report, this.onSiteVisit, this.assessments);
    this.sharedDataService.exportReportToExcel.next(undefined);
  }
}
