import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faList, faPlus, faTrash, faUpload, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { getNewIdbAssessment, IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

@Component({
  selector: 'app-manage-pre-assessments',
  templateUrl: './manage-pre-assessments.component.html',
  styleUrl: './manage-pre-assessments.component.css',
  standalone: false
})
export class ManagePreAssessmentsComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faList: IconDefinition = faList;
  faPlus: IconDefinition = faPlus;
  faUpload: IconDefinition = faUpload;
  faTrash: IconDefinition = faTrash;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  facility: IdbFacility;
  facilitySub: Subscription;

  onSiteVisitSub: Subscription;
  onSiteVisit: IdbOnSiteVisit;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;
  displayDeleteModal: boolean = false;
  assessmentToDelete: IdbAssessment;

  constructor(private router: Router,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private contactIdbService: ContactIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private reportIdbService: ReportIdbService,
    private dbChangesService: DbChangesService
  ) {
  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(selectedFacility => {
      this.facility = selectedFacility;
    });
    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(assessments => {
      this.assessments = assessments;
    });
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(visit => {
      this.onSiteVisit = visit;
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(contacts => {
      this.contacts = contacts;
    })
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.contactsSub.unsubscribe();
  }

  async addAssessment() {
    let assessment: IdbAssessment = getNewIdbAssessment(this.onSiteVisit.userId, this.onSiteVisit.companyId, this.onSiteVisit.facilityId,
      this.facilityIdbService.getByGUID(this.onSiteVisit.facilityId).unitSettings);
    assessment.visitDate = this.onSiteVisit.visitDate;
    await firstValueFrom(this.assessmentIdbService.addWithObservable(assessment));
    await this.assessmentIdbService.setAssessments();
    this.onSiteVisit.assessmentIds.push(assessment.guid);
    await this.onSiteVisitIdbService.asyncUpdate(this.onSiteVisit);
    //TODO: Update Reports
    await this.reportIdbService.addNewAssessment(assessment.guid, this.onSiteVisit.guid);
    this.goToAssessment(assessment);
  }

  async goBack() {
    if (!this.facility.sidebarEndUseInventoryOpen) {
      this.facility.sidebarEndUseInventoryOpen = true;
      this.facility.sidebarPreAssessmentOpen = false;
      await this.facilityIdbService.asyncUpdate(this.facility);
    }
    let processEquipment: Array<IdbProcessEquipment> = this.processEquipmentIdbService.getFacilityProcessEquipment(this.facility.guid);
    if (processEquipment.length > 0) {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-end-uses/' + processEquipment[processEquipment.length - 1].guid);
    } else {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-end-uses');
    }
  }

  async goToNext() {
    if (this.onSiteVisit.assessmentIds.length != 0) {
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-pre-assessment/' + this.onSiteVisit.assessmentIds[0]);
    } else {
      if (this.facility.sidebarPreAssessmentOpen) {
        this.facility.sidebarPreAssessmentOpen = false;
        await this.facilityIdbService.asyncUpdate(this.facility);
      }
      this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/review-pre-visit')
    }
  }

  goToAssessment(assessment: IdbAssessment) {
    this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-pre-assessment/' + assessment.guid);
  }

  async setVisitDate() {
    for (let i = 0; i < this.assessments.length; i++) {
      if (this.onSiteVisit.assessmentIds.includes(this.assessments[i].guid)) {
        this.assessments[i].visitDate = this.onSiteVisit.visitDate;
        await firstValueFrom(this.assessmentIdbService.updateWithObservable(this.assessments[i]));
      }
    }
    await this.assessmentIdbService.setAssessments();
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

  goToUploadTemplate() {
    this.router.navigateByUrl('/setup-wizard/upload-template/' + this.onSiteVisit.guid);
  }
}
