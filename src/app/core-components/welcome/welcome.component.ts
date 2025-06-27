import { Component } from '@angular/core';
import { IconDefinition, faBookOpen, faInbox, faBuilding, faChevronRight, faDatabase, faExternalLink, faFileCirclePlus, faFolderOpen, faIndustry, faQuestionCircle, faSearchPlus, faStopwatch, faWandMagicSparkles, faFileExcel } from '@fortawesome/free-solid-svg-icons';
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
import { LoadingService } from '../loading/loading.service';
import { BackupDataService, BackupFile } from 'src/app/shared/shared-services/backup-data.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { Router } from '@angular/router';
import { ToastNotificationsService } from '../toast-notifications/toast-notifications.service';
import { UpdateDbEntriesService } from 'src/app/indexed-db/update-db-entries.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrls: ['./welcome.component.css'],
    standalone: false
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
  faStopwatch: IconDefinition = faStopwatch;
  faInbox: IconDefinition = faInbox;
  faFileCirclePlus: IconDefinition = faFileCirclePlus;
  faFileExcel: IconDefinition = faFileExcel;

  userSub: Subscription
  user: IdbUser;

  onSiteVisits: Array<IdbOnSiteVisit>;
  onSiteVisitSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  showAddExampleModal: boolean = false;
  constructor(private userIdbService: UserIdbService,
    private sharedDataService: SharedDataService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService,
    private loadingService: LoadingService,
    private backupDataService: BackupDataService,
    private dbChangesService: DbChangesService,
    private toastNotificationService: ToastNotificationsService,
    private router: Router,
    private updateDbEntriesService: UpdateDbEntriesService
  ) {

  }

  ngOnInit() {
    this.userSub = this.userIdbService.user.subscribe(user => {
      this.user = user;
    });
    this.onSiteVisitSub = this.onSiteVisitIdbService.onSiteVisits.subscribe(visits => {
      this.onSiteVisits = _.orderBy(visits, (visit: IdbOnSiteVisit) => {
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

  ngOnDestroy() {
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
    this.router.navigateByUrl('/setup-wizard/pre-visit/' + visit.guid);
  }

  openAddExampleModal() {
    this.showAddExampleModal = true;
  }

  closeAddExampleModal() {
    this.showAddExampleModal = false;
  }

  addExample() {
    this.closeAddExampleModal();
    this.loadingService.setLoadingMessage('Loading Example Data..');
    this.loadingService.setLoadingStatus(true);
    var request = new XMLHttpRequest();
    request.open('GET', 'assets/example-data/ExampleData.json', true);
    request.responseType = 'blob';
    request.onload = () => {
      var reader = new FileReader();
      reader.readAsText(request.response);
      reader.onloadend = async (e) => {
        try {
          let fileData: string = reader.result as string;
          let tmpBackupFile: BackupFile = JSON.parse(fileData);
          let updatedBackupFile: BackupFile = await this.backupDataService.importUserBackupFile(tmpBackupFile, this.user.guid);
          this.user.kpiFacilityMigrationDoneV2 = false;
          await this.updateDbEntriesService.updateDbEntries(this.user);
          await this.dbChangesService.selectUser(this.user, false);
          this.loadingService.setLoadingStatus(false);
          let exampleVisit: IdbOnSiteVisit = updatedBackupFile.onSiteVisits[0];
          this.companyIdbService.setSelectedFromGUID(exampleVisit.companyId);
          this.facilityIdbService.setSelectedFromGUID(exampleVisit.facilityId);
          this.onSiteVisitIdbService.setSelectedFromGUID(exampleVisit.guid);
          this.toastNotificationService.showToast('Cocoa Co. Example Added!', 
            `Our example company and assessments have been added. 
            You can now explore a completed on-site energy assessment visit to view the possible impacts of NEBs!`,
            'bg-success', true, false);
          this.router.navigateByUrl('/setup-wizard/pre-visit/' + exampleVisit.guid);
        } catch (err) {
          console.log(err);
          this.loadingService.setLoadingMessage('Something has gone horribly wrong with the example data..');
        }
      };
    };
    request.send();
  }

  showSlidesShow(){
    this.sharedDataService.showSlideShow.next(true);
  }
}
