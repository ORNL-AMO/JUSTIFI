import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faChevronLeft, faChevronRight, faList, faPlus, faScrewdriverWrench, faToolbox, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons';
import { Subscription, firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-data-collection-manage-assessments',
  templateUrl: './data-collection-manage-assessments.component.html',
  styleUrl: './data-collection-manage-assessments.component.css',
  standalone: false
})
export class DataCollectionManageAssessmentsComponent {

  faList: IconDefinition = faList;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faPlus: IconDefinition = faPlus;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faTrash: IconDefinition = faTrash;
  faUpload: IconDefinition = faUpload;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  assessmentsSub: Subscription;
  assessments: Array<IdbAssessment>;
  displayDeleteModal: boolean = false;
  assessmentToDelete: IdbAssessment;
  constructor(private router: Router, private assessmentIdbService: AssessmentIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private dbChangesService: DbChangesService,
    private facilityIdbService: FacilityIdbService,
    private reportIdbService: ReportIdbService
  ) {
  }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(_onSiteVisit => {
      this.onSiteVisit = _onSiteVisit;
    });

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });
  }

  ngOnDestroy() {
    this.onSiteVisitSub.unsubscribe();
    this.assessmentsSub.unsubscribe();

  }


  goBack() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/end-uses');
  }

  goToNext() {
    this.goToAssessment(this.onSiteVisit.assessmentIds[0])
  }

  async addAssessment() {
    let assessment: IdbAssessment = getNewIdbAssessment(this.onSiteVisit.userId,
      this.onSiteVisit.companyId, this.onSiteVisit.facilityId,
      this.facilityIdbService.getByGUID(this.onSiteVisit.facilityId).unitSettings
    );
    assessment.visitDate = this.onSiteVisit.visitDate;
    assessment.sidebarOpen = true;
    await firstValueFrom(this.assessmentIdbService.addWithObservable(assessment));
    await this.assessmentIdbService.setAssessments();
    this.onSiteVisit.assessmentIds.push(assessment.guid);
    await this.onSiteVisitIdbService.asyncUpdate(this.onSiteVisit);
    await this.reportIdbService.addNewAssessment(assessment.guid, this.onSiteVisit.guid);
    this.goToAssessment(assessment.guid);
  }


  async saveChanges(assessment: IdbAssessment) {
    this.assessmentIdbService.asyncUpdate(assessment);
  }

  async setVisitDate() {
    for (let i = 0; i < this.assessments.length; i++) {
      if (this.onSiteVisit.assessmentIds.includes(this.assessments[i].guid)) {
        this.assessments[i].visitDate = this.onSiteVisit.visitDate;
        await this.saveChanges(this.assessments[i]);
      }
    }
    await this.onSiteVisitIdbService.asyncUpdate(this.onSiteVisit);
  }

  async deleteAssessment() {
    await this.dbChangesService.deleteAssessment(this.assessmentToDelete);
    this.closeDeleteModal();
  }

  openDeleteModal(assessment: IdbAssessment) {
    this.assessmentToDelete = assessment;
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
    this.assessmentToDelete = undefined;
  }

  goToAssessment(guid: string) {
    this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + guid);
  }


  goToUploadTemplate() {
    this.router.navigateByUrl('/setup-wizard/upload-template/' + this.onSiteVisit.guid);
  }
}
