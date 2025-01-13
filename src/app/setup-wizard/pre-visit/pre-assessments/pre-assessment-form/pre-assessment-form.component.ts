import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faScrewdriverWrench, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-pre-assessment-form',
  templateUrl: './pre-assessment-form.component.html',
  styleUrl: './pre-assessment-form.component.css'
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
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private dbChangesService: DbChangesService
  ) {

  }

  ngOnInit() {
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
  }

  setAssessment() {
    if (this.assessments) {
      this.assessment = this.assessments.find(eq => { return eq.guid == this.assessmentGuid });
      if (!this.assessment) {
        let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
        this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/pre-assessment')
      } else {
        this.assessmentIdbService.selectedAssessment.next(this.assessment);
      }
    }
  }

  goToNext() {
    //TODO: implement next
  }

  goBack() {
    //TODO: Implement back

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
