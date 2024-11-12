import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBuilding, faFolderOpen, faIndustry, faScrewdriverWrench, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CompanyIdbService } from '../indexed-db/company-idb.service';
import { FacilityIdbService } from '../indexed-db/facility-idb.service';
import { AssessmentIdbService } from '../indexed-db/assessment-idb.service';
import { IdbCompany } from '../models/company';
import { IdbFacility } from '../models/facility';
import { IdbAssessment } from '../models/assessment';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../shared/shared-services/shared-data.service';
import { ContactContext, IdbContact } from '../models/contact';

@Component({
  selector: 'app-user-portfolio',
  templateUrl: './user-portfolio.component.html',
  styleUrl: './user-portfolio.component.css'
})
export class UserPortfolioComponent {

  faFolderOpen: IconDefinition = faFolderOpen;
  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;

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
  displayContactModal: { context: ContactContext, viewContact: IdbContact, contextGuid: string };
  displayContactModalSub: Subscription;
  constructor(
    private router: Router,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private cd: ChangeDetectorRef,
    private sharedDataService: SharedDataService
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
      this.cd.detectChanges();
    });
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(selectedFacility => {
      this.facility = selectedFacility;
      this.cd.detectChanges();
    });
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(selectedAssessment => {
      this.assessment = selectedAssessment;
      this.cd.detectChanges();
    })
    this.displayAddNebsModalSub = this.sharedDataService.displayAddNebsModal.subscribe(val => {
      this.displayAddNebsModal = val;
    });
    this.displayContactModalSub = this.sharedDataService.displayContactModal.subscribe(val => {
      this.displayContactModal = val;
    })
  }

  ngOnDestroy() {
    this.displayAddNebsModalSub.unsubscribe();
    this.displayContactModalSub.unsubscribe();
    this.companySub.unsubscribe();
    this.facilitySub.unsubscribe();
    this.assessmentSub.unsubscribe();
    this.routerSub.unsubscribe();
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

  closeContactModal() {
    this.sharedDataService.displayContactModal.next(undefined);
  }
}
