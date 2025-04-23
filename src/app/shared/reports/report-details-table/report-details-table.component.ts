import { Component, Input } from '@angular/core';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { OnSiteVisitReport } from '../calculations/visitReport';
import { faScrewdriverWrench, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-report-details-table',
    templateUrl: './report-details-table.component.html',
    styleUrl: './report-details-table.component.css',
    standalone: false
})
export class ReportDetailsTableComponent {
  @Input()
  onSiteVisit: IdbOnSiteVisit;
  @Input()
  assessment: IdbAssessment;
  @Input()
  onSiteVisitReport: OnSiteVisitReport;

  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  company: IdbCompany;
  facility: IdbFacility;
  constructor(
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService
  ) {}

  ngOnInit(){
    if(this.onSiteVisit){
      this.company = this.companyIdbService.getByGUID(this.onSiteVisit.companyId);
      this.facility = this.facilityIdbService.getByGUID(this.onSiteVisit.facilityId);
    }else if(this.assessment){
      this.company = this.companyIdbService.getByGUID(this.assessment.companyId);
      this.facility = this.facilityIdbService.getByGUID(this.assessment.facilityId);
    }
  }
}
