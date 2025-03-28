import { Component } from '@angular/core';
import { UserIdbService } from './indexed-db/user-idb.service';
import { CompanyIdbService } from './indexed-db/company-idb.service';
import { FacilityIdbService } from './indexed-db/facility-idb.service';
import { Router } from '@angular/router';
import { IdbUser } from './models/user';
import { SharedDataService } from './shared/shared-services/shared-data.service';
import { AssessmentIdbService } from './indexed-db/assessment-idb.service';
import { ContactIdbService } from './indexed-db/contact-idb.service';
import { NonEnergyBenefitsIdbService } from './indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from './indexed-db/on-site-visit-idb.service';
import { KeyPerformanceIndicatorsIdbService } from './indexed-db/key-performance-indicators-idb.service';
import { EnergyOpportunityIdbService } from './indexed-db/energy-opportunity-idb.service';
import { EnergyEquipmentIdbService } from './indexed-db/energy-equipment-idb.service';
import { ProcessEquipmentIdbService } from './indexed-db/process-equipment-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from './indexed-db/key-performance-metric-impacts-idb.service';
import { ToastNotificationsService } from './core-components/toast-notifications/toast-notifications.service';
import { UpdateDbEntriesService } from './indexed-db/update-db-entries.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent {

  dataInitialized: boolean = false;
  print: boolean;
  printSub: Subscription;
  constructor(private userIdbService: UserIdbService, private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService, private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private router: Router,
    private sharedDataService: SharedDataService,
    private assessmentIdbService: AssessmentIdbService,
    private contactIdbService: ContactIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceIndicatorsIdbService: KeyPerformanceIndicatorsIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService,
    private toastNotificationService: ToastNotificationsService,
    private updateDbEntriesService: UpdateDbEntriesService) {
  }

  async ngOnInit() {
    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
    });
    await this.initializeData();
    this.checkRouter();
    this.toastNotificationService.showWebDisclaimer();
  }

  async initializeData() {
    //Todo: add loading messaging
    //user
    console.log('init')
    await this.userIdbService.initializeData();
    console.log('users init..');
    //update db entries
    let user: IdbUser = this.userIdbService.user.getValue();
    await this.updateDbEntriesService.updateDbEntries(user);
    //companies
    await this.companyIdbService.setCompanies();
    console.log('companies init..');
    //companies
    await this.contactIdbService.setContacts();
    console.log('contacts init..');
    //key performance indicators
    await this.keyPerformanceIndicatorsIdbService.setKeyPerformanceIndicators();
    console.log('key performance indicators init..');
    //key performance metric impacts
    await this.keyPerformanceMetricImpactIdbService.setKeyPerformanceMetricImpacts()
    console.log('key performance metric impacts init..');
    //facilities
    await this.facilityIdbService.setFacilities();
    console.log('facilities init..');
    //assessments 
    await this.assessmentIdbService.setAssessments();
    console.log('assessments init..');
    //process equipment 
    await this.processEquipmentIdbService.setProcessEquipments();
    console.log('process equipment init..');
    //energy equipment 
    await this.energyEquipmentIdbService.setEnergyEquipments();
    console.log('energy equipment init..');
    //energy efficiency measures 
    await this.energyOpportunityIdbService.setEnergyOpportunities();
    console.log('energy efficiency measures init..');
    //non energy benefits 
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
    console.log('NEBs init..');
    //on site visist 
    await this.onSiteVisitIdbService.setOnSiteVisits();
    console.log('On Site Visit init..');
    this.dataInitialized = true;
  }

  checkRouter() {
    //on init check if initialized on welcome screen
    if (this.router.url == '/welcome') {
      let user: IdbUser = this.userIdbService.user.getValue();
      if (user.skipSplashScreen) {
        //if user skips the home screen navigate to dashboard.
        this.router.navigateByUrl('/portfolio')
      }
    }
  }

  collapseSidebar() {
    if (this.sharedDataService.sidebarOpen.getValue() == true) {
      this.sharedDataService.sidebarOpen.next(false);
    }
  }
}
