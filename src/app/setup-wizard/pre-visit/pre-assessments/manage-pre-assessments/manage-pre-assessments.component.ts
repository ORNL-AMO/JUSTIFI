import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faChevronLeft, faChevronRight, faList, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { getNewIdbAssessment, IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-manage-pre-assessments',
  templateUrl: './manage-pre-assessments.component.html',
  styleUrl: './manage-pre-assessments.component.css'
})
export class ManagePreAssessmentsComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;
  faList: IconDefinition = faList;
  faPlus: IconDefinition = faPlus;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  facility: IdbFacility;
  facilitySub: Subscription;

  onSiteVisitSub: Subscription;
  onSiteVisit: IdbOnSiteVisit;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  constructor(private router: Router,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private contactIdbService: ContactIdbService,
    private assessmentIdbService: AssessmentIdbService
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
    this.goToAssessment(assessment);
  }

  goBack() {
    //TODO: navigation
  }

  goToNext() {
    //TODO: navigation
  }

  goToAssessment(assessment: IdbAssessment) {
    this.router.navigateByUrl('setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/pre-assessment/' + assessment.guid);
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
}
