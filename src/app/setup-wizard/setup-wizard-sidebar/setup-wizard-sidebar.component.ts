import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { IconDefinition, faChevronDown, faChevronUp, faFolderOpen, faCircleExclamation, faChevronCircleRight, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { SetupWizardService } from '../setup-wizard.service';
import { Subscription } from 'rxjs';
import { IdbAssessment } from 'src/app/models/assessment';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

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
  faChevronUp: IconDefinition = faChevronUp;
  faChevronRight: IconDefinition = faChevronCircleRight;
  faChevronLeft: IconDefinition = faChevronCircleLeft;

  displayStartOverModal: boolean;

  assessmentsSub: Subscription;
  assessments: Array<IdbAssessment>;

  sidebarOpenSub: Subscription;
  sidebarOpen: boolean = false;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;

  companySub: Subscription;
  company: IdbCompany;
  keyPerformanceIndicators: Array<IdbKeyPerformanceIndicator>;
  keyPerformanceIndicatorsSub: Subscription;

  collapsePreVisit: boolean = true;
  collapseDataCollection: boolean = true;
  collapseDataEvaluation: boolean = true;

  routerSub: Subscription;

  constructor(private router: Router, private setupWizardService: SetupWizardService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private companyIdbService: CompanyIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
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

    this.companySub = this.companyIdbService.selectedCompany.subscribe(_company => {
      this.company = _company;
    });

    this.keyPerformanceIndicatorsSub = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.subscribe(_keyPerformanceIndicators => {
      this.keyPerformanceIndicators = _keyPerformanceIndicators;
    });
  }

  ngOnDestroy() {
    this.assessmentsSub.unsubscribe();
    this.sidebarOpenSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
    this.companySub.unsubscribe();
    this.keyPerformanceIndicatorsSub.unsubscribe();
    this.routerSub.unsubscribe();
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

}
