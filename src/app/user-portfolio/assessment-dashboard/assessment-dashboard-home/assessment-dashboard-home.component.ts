import { Component } from '@angular/core';
import { faFileLines, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessment-dashboard-home',
  templateUrl: './assessment-dashboard-home.component.html',
  styleUrl: './assessment-dashboard-home.component.css'
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
    private sharedDataService: SharedDataService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService
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
    this.sharedDataService.createAssessmentModalOpen.next(true);
  }

}
