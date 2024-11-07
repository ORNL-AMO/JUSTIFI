import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRight, faExpand, faFileLines, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbFacility } from 'src/app/models/facility';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';

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


  faTrash: IconDefinition = faTrash;
  faFileLines: IconDefinition = faFileLines;
  faArrowRight: IconDefinition = faArrowRight;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  accordionGuid: string;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private bootstrapService: BootstrapService,
    private router: Router
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

  openDeleteFacilityModal() {

  }
}
