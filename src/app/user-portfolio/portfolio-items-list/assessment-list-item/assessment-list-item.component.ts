import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { faExpand, faTrash, faWandMagicSparkles, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';

@Component({
  selector: 'app-assessment-list-item',
  templateUrl: './assessment-list-item.component.html',
  styleUrl: './assessment-list-item.component.css'
})
export class AssessmentListItemComponent {
  @Input({ required: true })
  assessment: IdbAssessment;
  @Input()
  inAssessmentDashboard: boolean;

  faTrash: IconDefinition = faTrash;
  faWandMagicSparkles: IconDefinition = faWandMagicSparkles;

  energyOpportunitiesSub: Subscription;
  energyOpportunities: Array<IdbEnergyOpportunity>;
  constructor(private energyOpportunityIdbService: EnergyOpportunityIdbService
  ) {
  }

  ngOnInit() {
    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(opportunities => {
      this.energyOpportunities = opportunities.filter(opp => {
        return opp.assessmentId == this.assessment.guid
      });
    });
  }

  ngOnDestroy() {
    this.energyOpportunitiesSub.unsubscribe();
  }

  openDeleteAssessmentModal() {

  }

  goToVisit() {

  }
}
