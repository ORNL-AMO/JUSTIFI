import { Component } from '@angular/core';
import { IconDefinition, faBookOpen, faBookReader, faBuilding, faChevronRight, faDatabase, faExternalLink, faFolderOpen, faIndustry, faQuestionCircle, faSearchPlus, faStopwatch, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbUser } from 'src/app/models/user';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  faChevronRight: IconDefinition = faChevronRight;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;
  faFolderOpen: IconDefinition = faFolderOpen;
  faBookOpen: IconDefinition = faBookOpen;
  faExternalLink: IconDefinition = faExternalLink
  faQuestionCircle: IconDefinition = faQuestionCircle;
  faDatabase: IconDefinition = faDatabase;
  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faSearchPlus: IconDefinition = faSearchPlus;
  faStopwatch: IconDefinition = faStopwatch

  userSub: Subscription
  user: IdbUser;

  onSiteVisits: Array<IdbOnSiteVisit>;
  onSiteVisitSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;
  constructor(private userIdbService: UserIdbService,
    private sharedDataService: SharedDataService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService
  ) {

  }

  ngOnInit() {
    this.userSub = this.userIdbService.user.subscribe(user => {
      this.user = user;
    });
    this.onSiteVisitSub = this.onSiteVisitIdbService.onSiteVisits.subscribe(visits => {
      this.onSiteVisits =  _.orderBy(visits, (visit: IdbOnSiteVisit) => {
        return new Date(visit.modifiedDate);
      }, 'desc').slice(0, 5);
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(facilities => {
      this.facilities = facilities;
    });

    this.companiesSub = this.companyIdbService.companies.subscribe(companies => {
      this.companies = companies;
    })
  }

  ngOnDestroy(){
    this.onSiteVisitSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.companiesSub.unsubscribe();
    this.userSub.unsubscribe();
  }

  async saveChanges() {
    await this.userIdbService.asyncUpdate(this.user);
  }

  openWizardModal() {
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }

  goToVisit(visit: IdbOnSiteVisit) {
    this.companyIdbService.setSelectedFromGUID(visit.companyId);
    this.facilityIdbService.setSelectedFromGUID(visit.facilityId);
    this.onSiteVisitIdbService.setSelectedFromGUID(visit.guid);
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }
}
