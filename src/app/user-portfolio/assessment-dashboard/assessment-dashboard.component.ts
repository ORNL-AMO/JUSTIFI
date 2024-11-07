import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';

@Component({
  selector: 'app-assessment-dashboard',
  templateUrl: './assessment-dashboard.component.html',
  styleUrl: './assessment-dashboard.component.css'
})
export class AssessmentDashboardComponent {

  constructor(private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService
  ) {

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let guid: string = params['id'];
      let assessment: IdbAssessment = this.assessmentIdbService.getByGuid(guid);
      this.assessmentIdbService.selectedAssessment.next(assessment);
      let facility: IdbFacility = this.facilityIdbService.getByGUID(assessment.facilityId);
      this.facilityIdbService.selectedFacility.next(facility);
      let company: IdbCompany = this.companyIdbService.getByGUID(assessment.companyId);
      this.companyIdbService.selectedCompany.next(company);
    });
  }
}
