import { Component } from '@angular/core';
import { faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-manage-on-site-visits',
  standalone: false,

  templateUrl: './manage-on-site-visits.component.html',
  styleUrl: './manage-on-site-visits.component.css'
})
export class ManageOnSiteVisitsComponent {
  faTrash: IconDefinition = faTrash;

  onSiteVisits: Array<IdbOnSiteVisit>;
  onSiteVisitsSub: Subscription;

  facilitySub: Subscription;
  facility: IdbFacility;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  visitToDelete: IdbOnSiteVisit;
  displayDeleteModal: boolean = false;

  constructor(private onSiteVisitIdbService: OnSiteVisitIdbService,
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private toastNotificationsService: ToastNotificationsService,
    private dbChangesService: DbChangesService
  ) { }

  ngOnInit() {
    this.onSiteVisitsSub = this.onSiteVisitIdbService.onSiteVisits.subscribe(onSiteVisits => {
      this.onSiteVisits = onSiteVisits;
    });

    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
    });

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(assessments => {
      this.assessments = assessments;
    });
  }
  ngOnDestroy() {
    this.onSiteVisitsSub.unsubscribe();
    this.facilitySub.unsubscribe();
    this.assessmentsSub.unsubscribe();
  }

  openDeleteVisitModal(visit: IdbOnSiteVisit) {
    this.visitToDelete = visit;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {  
    this.displayDeleteModal = false;
    this.visitToDelete = undefined;
  }

  async deleteVisit(){
    await this.dbChangesService.deleteOnSiteVisit(this.visitToDelete);
    this.closeDeleteModal();
    this.toastNotificationsService.showToast('Visit deleted', undefined, 'bg-success', true, false);
  }

  async setVisitDate(visit: IdbOnSiteVisit) {
    for (let i = 0; i < this.assessments.length; i++) {
      if (visit.assessmentIds.includes(this.assessments[i].guid)) {
        this.assessments[i].visitDate = visit.visitDate;
        await firstValueFrom(this.assessmentIdbService.updateWithObservable(this.assessments[i]));
      }
    }
    await this.assessmentIdbService.setAssessments();
    await this.onSiteVisitIdbService.asyncUpdate(visit);
    this.toastNotificationsService.showToast('Visit date updated', undefined, 'bg-success', true, false);
  }
}
