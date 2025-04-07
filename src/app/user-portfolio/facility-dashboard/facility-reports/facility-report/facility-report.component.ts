import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faFilePen, faPrint, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbReport } from 'src/app/models/report';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-facility-report',
  standalone: false,

  templateUrl: './facility-report.component.html',
  styleUrl: './facility-report.component.css'
})
export class FacilityReportComponent {
  faFilePen: IconDefinition = faFilePen;
  faPrint: IconDefinition = faPrint;
  report: IdbReport;
  print: boolean;
  printSub: Subscription;
  constructor(private activatedRoute: ActivatedRoute,
    private reportIdbService: ReportIdbService,
    private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let guid: string = params['id'];
      this.report = this.reportIdbService.getByGuid(guid);
      this.reportIdbService.selectedReport.next(this.report);
    });

    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
    })
  }

  ngOnDestroy(){
    this.printSub.unsubscribe();
  }
}
