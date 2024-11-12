import { Component } from '@angular/core';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';

@Component({
  selector: 'app-assessment-energy-opportunities',
  templateUrl: './assessment-energy-opportunities.component.html',
  styleUrl: './assessment-energy-opportunities.component.css'
})
export class AssessmentEnergyOpportunitiesComponent {

  faChevronRight: IconDefinition = faChevronRight;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService
  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessment = assessment;
    });

    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(energyOpportunities => {
      this.energyOpportunities = energyOpportunities.filter(opp => {
        return opp.assessmentId == this.assessment.guid;
      });
    })
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
  }
}
