import { Component } from '@angular/core';
import { IconDefinition, faBuilding, faChevronDown, faChevronRight, faCircleInfo, faDatabase, faExclamationCircle, faFolder, faFolderOpen, faHome, faInbox, faIndustry, faMinusSquare, faPlusSquare, faQuestionCircle, faScrewdriverWrench, faTrophy, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ElectronService } from 'src/app/electron/electron.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { LoadingService } from '../loading/loading.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: false
})
export class SidebarComponent {

  faMinusSquare: IconDefinition = faMinusSquare;
  faPlusSquare: IconDefinition = faPlusSquare;
  faFolder: IconDefinition = faFolder;
  faFolderOpen: IconDefinition = faFolderOpen;
  faChevronRight: IconDefinition = faChevronRight;
  faChevronDown: IconDefinition = faChevronDown;
  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faTrophy: IconDefinition = faTrophy;
  faCircleInfo: IconDefinition = faCircleInfo;
  faInbox: IconDefinition = faInbox;
  faQuestionCircle: IconDefinition = faQuestionCircle;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;
  faHome: IconDefinition = faHome;
  faDatabase: IconDefinition = faDatabase;
  faExclamationCircle: IconDefinition = faExclamationCircle;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  assessments: Array<IdbAssessment>;
  assessmentsSub: Subscription;

  sidebarOpen: boolean;
  sidebarOpenSub: Subscription;

  updateAvailable: boolean;
  updateAvailableSub: Subscription;
  updateInfo: { releaseName: string, releaseNotes: string };
  updateInfoSub: Subscription;
  constructor(private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private sharedDataService: SharedDataService,
    private assessmentIdbService: AssessmentIdbService,
    private electronService: ElectronService,
    private loadingService: LoadingService) {
  }

  ngOnInit() {
    this.sidebarOpenSub = this.sharedDataService.sidebarOpen.subscribe(_sidebarOpen => {
      this.sidebarOpen = _sidebarOpen;
    })

    this.companiesSub = this.companyIdbService.companies.subscribe(_companies => {
      this.companies = _companies;
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(_facilities => {
      this.facilities = _facilities;
    });

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(_assessments => {
      this.assessments = _assessments;
    });

    if (this.electronService.isElectron) {
      this.updateAvailableSub = this.electronService.updateAvailable.subscribe(val => {
        this.updateAvailable = val;
      });
      this.updateInfoSub = this.electronService.updateInfo.subscribe(val => {
        this.updateInfo = val;
      });
    }
  }

  ngOnDestroy() {
    this.companiesSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.assessmentsSub.unsubscribe();
    this.sidebarOpenSub.unsubscribe();
    this.updateAvailableSub?.unsubscribe();
    this.updateInfoSub?.unsubscribe();
  }

  hideSidebar() {
    this.sharedDataService.sidebarOpen.next(false);
  }

  openSetupWizardModal() {
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }

  downloadUpdate() {
    this.loadingService.setLoadingMessage('Downloading update. Application will close when download is completed. This may take a moment.');
    this.loadingService.setLoadingStatus(true);
    this.electronService.sendUpdateSignal();

  }
}
