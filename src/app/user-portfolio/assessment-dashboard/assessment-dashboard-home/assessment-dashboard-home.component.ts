import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faFileLines, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-assessment-dashboard-home',
  templateUrl: './assessment-dashboard-home.component.html',
  styleUrl: './assessment-dashboard-home.component.css',
  standalone: false
})
export class AssessmentDashboardHomeComponent {

  faFileLines: IconDefinition = faFileLines;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;

  assessment: IdbAssessment;
  assessmentSub: Subscription;
  energyOpportunitiesSub: Subscription;
  energyOpportunities: Array<IdbEnergyOpportunity>;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private companyIdbService: CompanyIdbService,
    private facilityIdbService: FacilityIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private router: Router
  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessment = assessment;
    });
    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(opportunities => {
      this.energyOpportunities = opportunities.filter(opp => {
        return opp.assessmentId == this.assessment.guid
      });
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
  }

  goToVisit() {
    this.companyIdbService.setSelectedFromGUID(this.assessment.companyId);
    this.facilityIdbService.setSelectedFromGUID(this.assessment.facilityId);
    this.onSiteVisitIdbService.setSelectedFromAssessmentGUID(this.assessment.guid);
    let visit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('/setup-wizard/data-collection/' + visit.guid + '/assessment/' + this.assessment.guid + '/details');
  }
}
