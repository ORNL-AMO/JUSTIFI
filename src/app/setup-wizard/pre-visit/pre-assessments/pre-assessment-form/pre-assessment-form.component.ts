import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faScrewdriverWrench, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
    selector: 'app-pre-assessment-form',
    templateUrl: './pre-assessment-form.component.html',
    styleUrl: './pre-assessment-form.component.css',
    standalone: false
})
export class PreAssessmentFormComponent {
  faChevronLeft: IconDefinition = faChevronLeft;
  faChevronRight: IconDefinition = faChevronRight;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faTrash: IconDefinition = faTrash;

  assessmentGuid: string;
  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;
  assessment: IdbAssessment;
  routeGuardWarningModal: boolean = false;
  displayDeleteModal: boolean = false;
  assessmentIndex: number;

  onSiteVisitSub: Subscription;
  onSiteVisit: IdbOnSiteVisit;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private dbChangesService: DbChangesService,
    private facilityIdbService: FacilityIdbService
  ) {

  }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(val => {
      this.onSiteVisit = val;
    })
    this.activatedRoute.params.subscribe(params => {
      this.assessmentGuid = params['id'];
      this.setAssessment();
    });
    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(assessments => {
      this.assessments = assessments;
      this.setAssessment();
    });
  }

  ngOnDestroy() {
    this.assessmentsSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
  }

  setAssessment() {
    if (this.assessments) {
      this.assessmentIndex = this.onSiteVisit.assessmentIds.findIndex(id => { return id == this.assessmentGuid });
      this.assessment = this.assessments.find(eq => { return eq.guid == this.assessmentGuid });
      if (!this.assessment) {
        this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-pre-assessment')
      } else {
        this.assessmentIdbService.selectedAssessment.next(this.assessment);
      }
    }
  }

  async goToNext() {
    this.assessmentIndex++;
    if (this.onSiteVisit.assessmentIds[this.assessmentIndex]) {
      this.goToPreAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex]);
    } else {
      let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
      if (facility.sidebarPreAssessmentOpen) {
        facility.sidebarPreAssessmentOpen = false;
        facility.sidebarOpen = false;
        await this.facilityIdbService.asyncUpdate(facility);
      }
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/review-pre-visit')
    }
  }

  goBack() {
    if (this.assessmentIndex == 0) {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-pre-assessment')
    } else {
      this.assessmentIndex--;
      this.goToPreAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex])
    }

  }

  goToPreAssessment(guid: string) {
    this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-pre-assessment/' + guid)

  }

  canDeactivate(): Observable<boolean> {
    if (this.assessment && !this.assessment.name) {
      this.displayWarningModal();
      return of(false);
    }
    return of(true);
  }

  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }

  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async removeAssessment() {
    await this.dbChangesService.deleteAssessment(this.assessment);
    this.closeDeleteModal();
  }
}
