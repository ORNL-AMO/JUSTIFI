import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbReport } from 'src/app/models/report';

@Component({
  selector: 'app-custom-report-options',
  standalone: false,
  
  templateUrl: './custom-report-options.component.html',
  styleUrl: './custom-report-options.component.css'
})
export class CustomReportOptionsComponent {

  report: IdbReport;
  reportSub: Subscription;
  isFormChange: boolean = false;
  constructor(private reportIdbService: ReportIdbService){

  }

  ngOnInit(){
    this.reportSub = this.reportIdbService.selectedReport.subscribe(report => {
      if (!this.isFormChange) {
        this.report = report;
      } else {
        this.isFormChange = false;
      }
    });
  }

  ngOnDestroy(){
    this.reportSub.unsubscribe();
  }


  async saveChanges() {
    this.isFormChange = true;
    await this.reportIdbService.asyncUpdate(this.report);
  }
}
