import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faPlus, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { Subscription } from 'rxjs';
import { ContactContext, IdbContact } from 'src/app/models/contact';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-on-site-assessment',
  templateUrl: './on-site-assessment.component.html',
  styleUrl: './on-site-assessment.component.css'
})
export class OnSiteAssessmentComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faPlus: IconDefinition = faPlus;

  assessment: IdbAssessment;
  assessmentSub: Subscription;
  viewContact: IdbContact;

  assessmentIndex: number;
  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  displayAddNebsModal: { energyOpportunityId: string, assessmentId: string };
  displayAddNebsModalSub: Subscription;

  displayContactModal: { context: ContactContext, viewContact: IdbContact, contextGuid: string };
  displayContactModalSub: Subscription;
  constructor(private router: Router, private assessmentIdbService: AssessmentIdbService,
    private activatedRoute: ActivatedRoute,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(_visit => {
      this.onSiteVisit = _visit;
    });

    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    });

    this.displayAddNebsModalSub = this.sharedDataService.displayAddNebsModal.subscribe(_displayAddNebsModal => {
      this.displayAddNebsModal = _displayAddNebsModal;
    });

    this.displayContactModalSub = this.sharedDataService.displayContactModal.subscribe(_displayContactModal => {
      this.displayContactModal = _displayContactModal;
    });

    this.activatedRoute.params.subscribe(params => {
      let assessmentGUID: string = params['id'];
      if (this.onSiteVisit && this.onSiteVisit.assessmentIds) {
        this.assessmentIndex = this.onSiteVisit.assessmentIds.findIndex(_assessmentGuid => { return _assessmentGuid == assessmentGUID });
        if (this.assessmentIndex != -1) {
          this.assessmentIdbService.setSelectedFromGUID(this.onSiteVisit.assessmentIds[this.assessmentIndex]);
        } else if (this.assessmentIndex == -1 && this.onSiteVisit.assessmentIds.length > 0) {
          this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[0], 'details');
        } else if (!this.assessment) {
          this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/manage-assessments');
        }
      } else {
        console.log('visit does not exist. Nav back to getting started..');
        this.router.navigateByUrl('/welcome');
      }
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.displayAddNebsModalSub.unsubscribe();
    this.displayContactModalSub.unsubscribe();
  }

  goToNextAssessment() {
    this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex + 1], 'details');
  }

  goBack() {
    if (this.router.url.includes('details')) {
      if (this.assessmentIndex != 0) {
        this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex - 1], 'results');
      } else {
        this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/manage-assessments');
      }
    } else if (this.router.url.includes('energy-opportunities')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/details');
    } else if (this.router.url.includes('nebs')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/energy-opportunities');
    } else if (this.router.url.includes('results')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/nebs');
    }
  }

  navigateToOnSiteAssessment(guid: string, subUrl: string) {
    this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + guid + '/' + subUrl);
  }

  showSuggestedNebModal() {
    this.sharedDataService.displayAddNebsModal.next({ assessmentId: this.assessment.guid, energyOpportunityId: undefined });
  }

  closeContactModal() {
    this.sharedDataService.displayContactModal.next(undefined);
  }

  goToNext() {
    if (this.router.url.includes('details')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/energy-opportunities');
    } else if (this.router.url.includes('energy-opportunities')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/nebs');
    } else if (this.router.url.includes('nebs')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/results');
    } else if (this.router.url.includes('results')) {
      if (this.assessmentIndex != this.onSiteVisit.assessmentIds.length - 1) {
        this.goToNextAssessment();
      } else {
        //TODO: Issue 226
        // this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/review-data-collection');
        this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid);
      }
    }
  }
}
