import { Component, Input } from '@angular/core';
import { faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

@Component({
    selector: 'app-assessment-list-item',
    templateUrl: './assessment-list-item.component.html',
    styleUrl: './assessment-list-item.component.css',
    standalone: false
})
export class AssessmentListItemComponent {
  @Input({ required: true })
  assessment: IdbAssessment;
  @Input()
  inAssessmentDashboard: boolean;

  faWeightHanging: IconDefinition = faWeightHanging;
  energyOpportunitiesSub: Subscription;
  energyOpportunities: Array<IdbEnergyOpportunity>;

  nonEnergyBenefitsSub: Subscription;
  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  constructor(private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService
  ) {
  }

  ngOnInit() {
    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(opportunities => {
      this.energyOpportunities = opportunities.filter(opp => {
        return opp.assessmentId == this.assessment.guid
      });
    });

    this.nonEnergyBenefitsSub = this.nonEnergyBenefitIdbService.nonEnergyBenefits.subscribe(nebs => {
      this.nonEnergyBenefits = nebs;
    });
  }

  ngOnDestroy() {
    this.energyOpportunitiesSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
  }
}
