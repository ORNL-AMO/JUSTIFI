import { Component } from '@angular/core';
import { faStopwatch, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbFacility } from 'src/app/models/facility';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';

type VisitSortColumn = 'company' | 'facility' | 'assessments' | 'visitDate' | 'modifiedDate';
type SortDirection = 'asc' | 'desc';

@Component({
  selector: 'app-latest-visits-table',
  templateUrl: './latest-visits-table.component.html',
  styleUrl: './latest-visits-table.component.css',
  standalone: false
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

  assessments: Array<IdbAssessment>;
  assessmentSub: Subscription;

  readonly itemsPerPage: number = 5;
  currentPageNumber: number = 1;
  sortColumn: VisitSortColumn = 'modifiedDate';
  sortDirection: SortDirection = 'desc';
  showArchivedFacilities: boolean = false;
  hasArchivedFacilities: boolean = false;
  constructor(
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private facilityIdbService: FacilityIdbService,
    private companyIdbService: CompanyIdbService,
    private sharedDataService: SharedDataService,
    private assessmentIdbService: AssessmentIdbService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.onSiteVisitSub = this.onSiteVisitIdbService.onSiteVisits.subscribe(visits => {
      this.onSiteVisits = [...visits];
      this.sortVisits();
      this.updateHasArchivedFacilities();
    });

    this.facilitiesSub = this.facilityIdbService.facilities.subscribe(facilities => {
      this.facilities = facilities;
      this.sortVisits();
      this.updateHasArchivedFacilities();
    });

    this.companiesSub = this.companyIdbService.companies.subscribe(companies => {
      this.companies = companies;
      this.sortVisits();
    });
    this.assessmentSub = this.assessmentIdbService.assessments.subscribe(assessments => {
      this.assessments = assessments;
      this.sortVisits();
    });
  }

  ngOnDestroy() {
    this.onSiteVisitSub.unsubscribe();
    this.facilitiesSub.unsubscribe();
    this.companiesSub.unsubscribe();
    this.assessmentSub.unsubscribe();
  }


  goToVisit(visit: IdbOnSiteVisit) {
    this.companyIdbService.setSelectedFromGUID(visit.companyId);
    this.facilityIdbService.setSelectedFromGUID(visit.facilityId);
    this.onSiteVisitIdbService.setSelectedFromGUID(visit.guid);
    this.router.navigateByUrl('/setup-wizard/pre-visit/' + visit.guid);
  }

  openWizardModal() {
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }

  setPageCurrentPageNumber(pageNumber: number) {
    this.currentPageNumber = pageNumber;
  }

  setSortColumn(sortColumn: VisitSortColumn) {
    if (this.sortColumn === sortColumn) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = sortColumn;
      this.sortDirection = 'asc';
    }

    this.sortVisits();
  }

  sortVisits() {
    if (!this.onSiteVisits) {
      return;
    }

    this.onSiteVisits = _.orderBy(
      this.onSiteVisits,
      (visit: IdbOnSiteVisit) => this.getVisitSortValue(visit),
      this.sortDirection
    );
    this.currentPageNumber = 1;
  }

  getAriaSort(sortColumn: VisitSortColumn): 'ascending' | 'descending' | null {
    if (this.sortColumn !== sortColumn) {
      return null;
    }

    return this.sortDirection === 'asc' ? 'ascending' : 'descending';
  }

  getSortButtonLabel(label: string, sortColumn: VisitSortColumn): string {
    const nextDirection = this.sortColumn === sortColumn && this.sortDirection === 'asc'
      ? 'descending'
      : 'ascending';
    return `Sort by ${label}, ${nextDirection}`;
  }

  toggleArchivedFacilities() {
    this.showArchivedFacilities = !this.showArchivedFacilities;
    this.currentPageNumber = 1;
  }

  updateHasArchivedFacilities() {
    if (!this.onSiteVisits || !this.facilities) {
      this.hasArchivedFacilities = false;
      return;
    }
    
    this.hasArchivedFacilities = this.onSiteVisits.some(visit => {
      const facility = this.facilities.find(f => f.guid === visit.facilityId);
      return facility && facility.isArchived;
    });
  }

  private getVisitSortValue(visit: IdbOnSiteVisit): string | number {
    if (this.sortColumn === 'company') {
      const company = this.companies?.find(item => item.guid === visit.companyId);
      return company?.generalInformation.name.toLocaleLowerCase() || '';
    }

    if (this.sortColumn === 'facility') {
      const facility = this.facilities?.find(item => item.guid === visit.facilityId);
      return facility?.generalInformation.name.toLocaleLowerCase() || '';
    }

    if (this.sortColumn === 'assessments') {
      return visit.assessmentIds
        .map(assessmentId => this.assessments?.find(assessment => assessment.guid === assessmentId)?.name || '')
        .sort()
        .join(' ')
        .toLocaleLowerCase();
    }

    const dateValue = this.sortColumn === 'visitDate' ? visit.visitDate : visit.modifiedDate;
    return new Date(dateValue).getTime();
  }
}
