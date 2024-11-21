import { Component } from '@angular/core';
import { faLock, faUnlock, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrl: './assessment-details.component.css'
})
export class AssessmentDetailsComponent {

  faLock: IconDefinition = faLock;
  faUnlock: IconDefinition = faUnlock;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;

  isDisabled: boolean = true;

  displayUnlockModal: boolean = false;

  assessment: IdbAssessment;
  assessmentSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessment = assessment;
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
  }

  goToVisit() {
    this.companyIdbService.setSelectedFromGUID(this.assessment.companyId);
    this.facilityIdbService.setSelectedFromGUID(this.assessment.facilityId);
    this.onSiteVisitIdbService.setSelectedFromAssessmentGUID(this.assessment.guid);
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }

  openUnlockModal() {
    this.displayUnlockModal = true;
  }

  closeUnlockModal() {
    this.displayUnlockModal = false;
  }

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
    this.closeUnlockModal();
  }


}
