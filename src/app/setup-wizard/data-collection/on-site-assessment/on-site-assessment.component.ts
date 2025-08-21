import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faPlus, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { IdbAssessment } from 'src/app/models/assessment';
import { filter, Subscription } from 'rxjs';
import { ContactContext, IdbContact } from 'src/app/models/contact';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { SetupWizardService } from '../../setup-wizard.service';

@Component({
  selector: 'app-on-site-assessment',
  templateUrl: './on-site-assessment.component.html',
  styleUrl: './on-site-assessment.component.css',
  standalone: false
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

  backLabel: string;
  nextLabel: string;
  routerSub: Subscription;

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
      this.setBackLabel();
      this.setNextLabel();
    });

    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setBackLabel();
        this.setNextLabel();
      }
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.displayAddNebsModalSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  goToNextAssessment() {
    this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex + 1], 'details');
  }

  goBack(button: HTMLButtonElement) {
    if (this.router.url.includes('details')) {
      if (this.assessmentIndex != 0) {
        this.navigateToOnSiteAssessment(this.onSiteVisit.assessmentIds[this.assessmentIndex - 1], 'nebs');
      } else {
        this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/manage-assessments');
      }
    } else if (this.router.url.includes('energy-opportunities')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/details');
    } else if (this.router.url.includes('nebs')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/energy-opportunities');
    }
    button.blur();
  }

  navigateToOnSiteAssessment(guid: string, subUrl: string) {
    this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + guid + '/' + subUrl);
  }

  showSuggestedNebModal() {
    this.sharedDataService.displayAddNebsModal.next({ assessmentId: this.assessment.guid, energyOpportunityId: undefined });
  }

  goToNext(button: HTMLButtonElement) {
    if (this.router.url.includes('details')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/energy-opportunities');
    } else if (this.router.url.includes('energy-opportunities')) {
      this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/nebs');
    } else if (this.router.url.includes('nebs')) {
      if (this.assessmentIndex != this.onSiteVisit.assessmentIds.length - 1) {
        this.goToNextAssessment();
      } else {
        //TODO: Issue 226
        // this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/review-data-collection');
        this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid);
      }
    }
    button.blur();
  }

  setBackLabel() {
    if (this.router.url.includes('details')) {
      if (this.assessmentIndex != 0) {
        this.backLabel = 'Previous Assessment';
      } else {
        this.backLabel = 'Manage Assessments';
      }
    } else if (this.router.url.includes('energy-opportunities')) {
      this.backLabel = 'Details';
    } else if (this.router.url.includes('nebs')) {
      //EEM or Energy Efficiency Measures ?
      this.backLabel = 'Energy Efficiency Measures';
    }
  }

  setNextLabel() {
    if (this.router.url.includes('details')) {
      //EEM or Energy Efficiency Measures ?
      this.nextLabel = 'Energy Efficiency Measures';
    } else if (this.router.url.includes('energy-opportunities')) {
      //incoming changes will have + Incentives
      this.nextLabel = 'NEBs + Incentives';
    } else if (this.router.url.includes('nebs')) {
      if (this.assessmentIndex != this.onSiteVisit.assessmentIds.length - 1) {
        this.nextLabel = 'Next Assessment';
      }
      else {
        this.nextLabel = 'Review Data Collection';
      }
    }
  }
}
