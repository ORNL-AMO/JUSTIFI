import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IconDefinition, faChevronDown, faChevronUp, faFolderOpen, faCircleExclamation, faChevronCircleRight, faChevronCircleLeft, faGear, faChevronRight, faUser, faAddressBook, faMagnifyingGlassPlus, faBullseye, faList, faBox } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardService } from '../setup-wizard.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { IdbAssessment } from 'src/app/models/assessment';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbFacility } from 'src/app/models/facility';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Component({
  selector: 'app-setup-wizard-sidebar',
  templateUrl: './setup-wizard-sidebar.component.html',
  styleUrl: './setup-wizard-sidebar.component.css'
})
export class SetupWizardSidebarComponent implements OnInit, OnDestroy {
  @Output('emitToggleCollapse')
  emitToggleCollapse: EventEmitter<boolean> = new EventEmitter<boolean>();

  faFolderOpen: IconDefinition = faFolderOpen;
  faCircleExclamation: IconDefinition = faCircleExclamation;
  faChevronDown: IconDefinition = faChevronDown;
  faChevronRight: IconDefinition = faChevronRight;

  faChevronUp: IconDefinition = faChevronUp;
  faChevronCircleRight: IconDefinition = faChevronCircleRight;
  faChevronCircleLeft: IconDefinition = faChevronCircleLeft;
  faGear: IconDefinition = faGear;
  faUser: IconDefinition = faUser;
  faAddressBook: IconDefinition = faAddressBook;
  faMagnifyingGlassPlus: IconDefinition = faMagnifyingGlassPlus;
  faBullseye: IconDefinition = faBullseye;
  faList: IconDefinition = faList;
  faBox: IconDefinition = faBox;

  displayStartOverModal: boolean;

  assessmentsSub: Subscription;
  assessments: Array<IdbAssessment>;

  sidebarOpenSub: Subscription;
  sidebarOpen: boolean = false;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  facilitySub: Subscription;
  facility: IdbFacility;

  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorsSub: Subscription;

  collapsePreVisit: boolean = true;
  collapseDataCollection: boolean = true;
  collapseDataEvaluation: boolean = true;

  routerSub: Subscription;

  company: IdbCompany;
  companySub: Subscription;

  contacts: Array<IdbContact>;
  contactsSub: Subscription;

  energyEquipmentsSub: Subscription;
  energyEquipments: Array<IdbEnergyEquipment>;
  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private facilityIdbService: FacilityIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private companyIdbService: CompanyIdbService,
    private contactIdbService: ContactIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
  ) {

  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setDisplaySidebar();
      }
    });
    this.setDisplaySidebar();

    this.assessmentsSub = this.assessmentIdbService.assessments.subscribe(val => {
      this.assessments = val;
    });

    this.sidebarOpenSub = this.setupWizardService.sidebarOpen.subscribe(val => {
      this.sidebarOpen = val;
      //needed to resize charts
      setTimeout(() => {
        window.dispatchEvent(new Event("resize"));
      }, 100)
    });

    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(val => {
      this.onSiteVisit = val;
    });

    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(_facility => {
      this.facility = _facility;
    });

    this.keyPerformanceIndicatorsSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });

    this.companySub = this.companyIdbService.selectedCompany.subscribe(val => {
      this.company = val;
    });
    this.contactsSub = this.contactIdbService.contacts.subscribe(contacts => {
      this.contacts = contacts;
    });


    this.energyEquipmentsSub = this.energyEquipmentIdbService.energyEquipments.subscribe(energyEquipments => {
      this.energyEquipments = energyEquipments;
    });
  }

  ngOnDestroy() {
    this.assessmentsSub.unsubscribe();
    this.sidebarOpenSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.facilitySub.unsubscribe();
    this.keyPerformanceIndicatorsSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.companySub.unsubscribe();
    this.contactsSub.unsubscribe();
    this.energyEquipmentsSub.unsubscribe();
  }

  setDisplaySidebar() {
    this.checkCollapsePrevisit();
    this.checkCollapseDataCollection();
    this.checkCollapseDataEvaluation();
  }

  openStartOverModal() {
    this.displayStartOverModal = true;
  }

  closeStartOverModal() {
    this.displayStartOverModal = false;
  }

  confirmStartOver() {
    this.router.navigateByUrl('/portfolio');
  }

  toggleSidebar() {
    this.emitToggleCollapse.emit(!this.sidebarOpen);
  }

  toggleCollapsePrevisit() {
    this.collapsePreVisit = !this.collapsePreVisit;
  }

  checkCollapsePrevisit() {
    if (this.collapsePreVisit) {
      let isInPrevisit: boolean = (this.router.url.includes('pre-visit') == true);
      if (isInPrevisit) {
        this.toggleCollapsePrevisit();
      }
    }
  }

  toggleCollapseDataCollection() {
    this.collapseDataCollection = !this.collapseDataCollection;
  }

  checkCollapseDataCollection() {
    if (this.collapseDataCollection) {
      let isInDataCollection: boolean = (this.router.url.includes('data-collection') == true);
      if (isInDataCollection) {
        this.toggleCollapseDataCollection();
      }
    }
  }

  toggleCollapseDataEvaluation() {
    this.collapseDataEvaluation = !this.collapseDataEvaluation;
  }

  checkCollapseDataEvaluation() {
    if (this.collapseDataEvaluation) {
      let isInDataEvaluation: boolean = (this.router.url.includes('data-evaluation') == true);
      if (isInDataEvaluation) {
        this.toggleCollapseDataEvaluation();
      }
    }
  }

  async toggleCollapseCompany() {
    this.company.sidebarOpen = !this.company.sidebarOpen;
    await firstValueFrom(this.companyIdbService.updateWithObservable(this.company));
    await this.companyIdbService.setCompanies();
    this.companyIdbService.selectedCompany.next(this.company);
  }

  async toggleContactsOpen() {
    this.company.sidebarContactsOpen = !this.company.sidebarContactsOpen;
    await firstValueFrom(this.companyIdbService.updateWithObservable(this.company));
    await this.companyIdbService.setCompanies();
    this.companyIdbService.selectedCompany.next(this.company);
  }

  async toggleCollapseFacility() {
    this.facility.sidebarOpen = !this.facility.sidebarOpen;
    await firstValueFrom(this.facilityIdbService.updateWithObservable(this.facility));
    await this.facilityIdbService.setFacilities();
    this.facilityIdbService.selectedFacility.next(this.facility);
  }

  async toggleKPIsOpen() {
    this.facility.sidebarKPIsOpen = !this.facility.sidebarKPIsOpen;
    await firstValueFrom(this.facilityIdbService.updateWithObservable(this.facility));
    await this.facilityIdbService.setFacilities();
    this.facilityIdbService.selectedFacility.next(this.facility);
  }
  async toggleSystemInventoryOpen() {
    this.facility.sidebarSystemInventoryOpen = !this.facility.sidebarSystemInventoryOpen;
    await firstValueFrom(this.facilityIdbService.updateWithObservable(this.facility));
    await this.facilityIdbService.setFacilities();
    this.facilityIdbService.selectedFacility.next(this.facility);
  }
}
