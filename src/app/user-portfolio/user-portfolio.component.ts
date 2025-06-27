import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBuilding, faFolderOpen, faIndustry, faScrewdriverWrench, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from '../indexed-db/company-idb.service';
import { FacilityIdbService } from '../indexed-db/facility-idb.service';
import { AssessmentIdbService } from '../indexed-db/assessment-idb.service';
import { IdbCompany } from '../models/company';
import { IdbFacility } from '../models/facility';
import { IdbAssessment } from '../models/assessment';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../shared/shared-services/shared-data.service';
import { IdbOnSiteVisit } from '../models/onSiteVisit';
import { OnSiteVisitIdbService } from '../indexed-db/on-site-visit-idb.service';

@Component({
  selector: 'app-user-portfolio',
  templateUrl: './user-portfolio.component.html',
  styleUrl: './user-portfolio.component.css',
  standalone: false
})
export class UserPortfolioComponent {

  faFolderOpen: IconDefinition = faFolderOpen;
  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles

  context: 'home' | 'company' | 'facility' | 'assessment';
  company: IdbCompany;
  companySub: Subscription;
  facility: IdbFacility;
  facilitySub: Subscription;
  assessment: IdbAssessment;
  assessmentSub: Subscription;
  routerSub: Subscription;
  displayAddNebsModal: {
    assessmentId: string,
    energyOpportunityId: string
  };
  displayAddNebsModalSub: Subscription;

  printSub: Subscription;
  print: boolean;

  onSiteVisit: IdbOnSiteVisit;
  onSiteVisitSub: Subscription;
  displayVisitButton: boolean = false;
  constructor(
    private router: Router,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private cd: ChangeDetectorRef,
    private sharedDataService: SharedDataService,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {
  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setContext(event.urlAfterRedirects);
      }
    });
    this.setContext(this.router.url);
    this.companySub = this.companyIdbService.selectedCompany.subscribe(selectedCompany => {
      this.company = selectedCompany;
      this.setDisplayVisitButton();
      this.cd.detectChanges();
    });
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(selectedFacility => {
      this.facility = selectedFacility;
      this.setDisplayVisitButton();
      this.cd.detectChanges();
    });
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(selectedAssessment => {
      this.assessment = selectedAssessment;
      this.setDisplayVisitButton();
      this.cd.detectChanges();
    })
    this.displayAddNebsModalSub = this.sharedDataService.displayAddNebsModal.subscribe(val => {
      this.displayAddNebsModal = val;
    });
    this.printSub = this.sharedDataService.print.subscribe(print => {
      this.print = print;
    });
    this.onSiteVisitSub = this.onSiteVisitIdbService.selectedVisit.subscribe(onSiteVisit => {
      this.onSiteVisit = onSiteVisit;
      this.setDisplayVisitButton();
    });
  }

  ngOnDestroy() {
    this.displayAddNebsModalSub.unsubscribe();
    this.companySub.unsubscribe();
    this.facilitySub.unsubscribe();
    this.assessmentSub.unsubscribe();
    this.routerSub.unsubscribe();
    this.printSub.unsubscribe();
    this.onSiteVisitSub.unsubscribe();
  }

  setContext(url: string) {
    if (url.includes('company')) {
      this.context = 'company';
      this.facilityIdbService.selectedFacility.next(undefined);
      this.assessmentIdbService.selectedAssessment.next(undefined);
    } else if (url.includes('facility')) {
      this.context = 'facility';
      this.assessmentIdbService.selectedAssessment.next(undefined);
    } else if (url.includes('assessment')) {
      this.context = 'assessment';
    } else {
      this.context = 'home';
      this.facilityIdbService.selectedFacility.next(undefined);
      this.assessmentIdbService.selectedAssessment.next(undefined);
      this.companyIdbService.selectedCompany.next(undefined);
    }
    this.setDisplayVisitButton();
  }

  setValues(guid: string) {
    if (this.context != 'home') {
      if (this.context == 'company') {
        this.assessment = undefined;
        this.facility = undefined;
        this.company = this.companyIdbService.getByGUID(guid);
      } else if (this.context == 'facility') {
        this.assessment = undefined;
        this.facility = this.facilityIdbService.getByGUID(guid);
        this.company = this.companyIdbService.getByGUID(this.facility.companyId);
      } else if (this.context == 'assessment') {
        this.assessment = this.assessmentIdbService.getByGuid(guid);
        this.facility = this.facilityIdbService.getByGUID(this.assessment.facilityId);
        this.company = this.companyIdbService.getByGUID(this.assessment.companyId);
      }
    }
  }

  setDisplayVisitButton() {
    if (this.onSiteVisit) {
      if (this.context == 'company' && this.company && this.company.guid == this.onSiteVisit.companyId) {
        this.displayVisitButton = true;
      } else if (this.context == 'facility' && this.facility && this.facility.guid == this.onSiteVisit.facilityId) {
        this.displayVisitButton = true;
      } else if (this.context == 'assessment' && this.assessment && this.onSiteVisit.assessmentIds.includes(this.assessment.guid)) {
        this.displayVisitButton = true;
      } else if (this.context == 'home') {
        this.displayVisitButton = true;
      } else {
        this.displayVisitButton = false;
      }
    } else {
      this.displayVisitButton = false;
    }
  }

  returnToVisit() {
    let facility: IdbFacility = this.facilityIdbService.getByGUID(this.onSiteVisit.facilityId);
    this.facilityIdbService.selectedFacility.next(facility);
    let company: IdbCompany = this.companyIdbService.getByGUID(this.onSiteVisit.companyId);
    this.companyIdbService.selectedCompany.next(company);
    if (this.context == 'home') {
      this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.onSiteVisit.guid);
    } else if (this.context == 'company') {
      if (this.router.url.includes('stakeholders')) {
        this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/company-contacts');
      } else {
        this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/company-setup');
      }
    } else if (this.context == 'facility') {
      if (this.router.url.includes('performance-indicators')) {
        this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-kpi-select');
      } else if (this.router.url.includes('questions')) {
        this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-questions');
      } else if (this.router.url.includes('system-inventory')) {
        this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-energy-equipment');
      } else if (this.router.url.includes('end-use-inventory')) {
        this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-end-uses');
      } else {
        this.router.navigateByUrl('/setup-wizard/pre-visit/' + this.onSiteVisit.guid + '/facility-setup');
      }
    } else if (this.context == 'assessment') {
      if (this.router.url.includes('energy-opportunities')) {
        this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/energy-opportunities');
      } else if (this.router.url.includes('nebs')) {
        this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/nebs');
      } else if (this.router.url.includes('reports')) {
        this.router.navigateByUrl('/setup-wizard/data-evaluation/' + this.onSiteVisit.guid + '/assessment-reports/' + this.assessment.guid);
      } else {
        this.router.navigateByUrl('/setup-wizard/data-collection/' + this.onSiteVisit.guid + '/assessment/' + this.assessment.guid + '/details');
      }
    }
  }
}
