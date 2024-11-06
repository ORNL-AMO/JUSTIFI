import { Component } from '@angular/core';
import { faStopwatch, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-latest-visits-table',
  templateUrl: './latest-visits-table.component.html',
  styleUrl: './latest-visits-table.component.css'
})
export class LatestVisitsTableComponent {

  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;
  faStopwatch: IconDefinition = faStopwatch;

  onSiteVisits: Array<IdbOnSiteVisit>;
  onSiteVisitSub: Subscription;

  facilities: Array<IdbFacility>;
  facilitiesSub: Subscription;

  companies: Array<IdbCompany>;
  companiesSub: Subscription;
  currentPageNumber: number = 1;
  constructor(
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService,
    private sharedDataService: SharedDataService
  ) {

  }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.onSiteVisits.subscribe(visits => {
      this.onSiteVisits = visits;
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
  }


  goToVisit(visit: IdbOnSiteVisit) {
    this.companyIdbService.setSelectedFromGUID(visit.companyId);
    this.facilityIdbService.setSelectedFromGUID(visit.facilityId);
    this.onSiteVisitIdbService.setSelectedFromAssessmentGUID(visit.assessmentIds[0]);
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }

  openWizardModal() {
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }

  setPageCurrentPageNumber(pageNumber: number) {
    this.currentPageNumber = pageNumber;
  }
}
