import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessment-dashboard',
  templateUrl: './assessment-dashboard.component.html',
  styleUrl: './assessment-dashboard.component.css'
})
export class AssessmentDashboardComponent {

  displayAddNebsModal: {
    assessmentId: string,
    energyOpportunityId: string
  };
  displayAddNebsModalSub: Subscription;
  constructor(private activatedRoute: ActivatedRoute,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private sharedDataService: SharedDataService
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

    this.displayAddNebsModalSub = this.sharedDataService.displayAddNebsModal.subscribe(val => {
      this.displayAddNebsModal = val;
    })
  }

  ngOnDestroy() {
    this.displayAddNebsModalSub.unsubscribe();
  }

}
