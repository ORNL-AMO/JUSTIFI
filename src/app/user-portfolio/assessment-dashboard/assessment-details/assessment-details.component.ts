import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faLock, faTrashCan, faUnlock, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrl: './assessment-details.component.css',
  standalone: false
})
export class AssessmentDetailsComponent {

  faLock: IconDefinition = faLock;
  faUnlock: IconDefinition = faUnlock;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;
  faTrashCan: IconDefinition = faTrashCan;

  isDisabled: boolean = true;

  displayUnlockModal: boolean = false;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  displayDeleteModal: boolean = false;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private toastNotificationsService: ToastNotificationsService
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
    let visit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/data-collection/' + visit.guid + '/assessment/' + this.assessment.guid + '/details');
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

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async deleteAssessment() {
    await this.dbChangesService.deleteAssessment(this.assessment);
    this.toastNotificationsService.showToast('Assessment deleted.', undefined, 'bg-success', true, false);
    this.router.navigateByUrl('/portfolio/facility/' + this.assessment.facilityId);
  }

}
