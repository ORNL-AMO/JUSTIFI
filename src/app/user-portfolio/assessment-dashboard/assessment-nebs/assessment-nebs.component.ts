import { Component } from '@angular/core';
import { faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

@Component({
  selector: 'app-assessment-nebs',
  templateUrl: './assessment-nebs.component.html',
  styleUrl: './assessment-nebs.component.css'
})
export class AssessmentNebsComponent {

  faChevronRight: IconDefinition = faChevronRight;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  constructor(private assessmentIdbService: AssessmentIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService
  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessment = assessment;
    });

    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(nonEnergyBenefits => {
      this.nonEnergyBenefits = nonEnergyBenefits.filter(neb => {
        return neb.assessmentId == this.assessment.guid && neb.energyOpportunityId == undefined;
      });
    })
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
  }
}
