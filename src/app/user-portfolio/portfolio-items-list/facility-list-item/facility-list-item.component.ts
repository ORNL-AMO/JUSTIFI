import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight, faScrewdriverWrench, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbFacility } from 'src/app/models/facility';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-facility-list-item',
  templateUrl: './facility-list-item.component.html',
  styleUrl: './facility-list-item.component.css'
})
export class FacilityListItemComponent {
  @Input({ required: true })
  facility: IdbFacility;
  @Input()
  inFacilityDashboard: boolean;


  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faArrowRight: IconDefinition = faArrowRight;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  accordionGuid: string;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private bootstrapService: BootstrapService,
    private router: Router,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(assessments => {
      this.assessments = assessments.filter(assessment => {
        return assessment.facilityId == this.facility.guid;
      })
    });
  }

  ngOnDestroy() {
    this.assessmentsSub.unsubscribe();
  }

  toggleBS(assessmentGuid: string) {
    this.bootstrapService.bsCollapse('#' + assessmentGuid);
    if (this.accordionGuid != assessmentGuid) {
      this.accordionGuid = assessmentGuid;
    } else {
      this.accordionGuid = undefined;
    }
  }

  goToAssessmentDashboard(assessment: IdbAssessment) {
    this.router.navigateByUrl('/portfolio/assessment/' + assessment.guid);
  }

  goToVisit(assessment: IdbAssessment) {
    this.companyIdbService.setSelectedFromGUID(this.facility.companyId);
    this.facilityIdbService.setSelectedFromGUID(this.facility.guid);
    if (assessment) {
      this.onSiteVisitIdbService.setSelectedFromAssessmentGUID(assessment.guid);
    } else {
      this.onSiteVisitIdbService.selectedVisit.next(undefined);
    }
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }

}
