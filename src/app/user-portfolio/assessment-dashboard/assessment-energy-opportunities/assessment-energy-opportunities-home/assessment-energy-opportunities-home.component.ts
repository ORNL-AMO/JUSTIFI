import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus, faWeightHanging, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { getNewIdbEnergyOpportunity, IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

@Component({
  selector: 'app-assessment-energy-opportunities-home',
  templateUrl: './assessment-energy-opportunities-home.component.html',
  styleUrl: './assessment-energy-opportunities-home.component.css'
})
export class AssessmentEnergyOpportunitiesHomeComponent {

  faPlus: IconDefinition = faPlus;
  faWeightHanging: IconDefinition = faWeightHanging;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  energyOpportunities: Array<IdbEnergyOpportunity>;
  energyOpportunitiesSub: Subscription;

  nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;

  constructor(private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private router: Router,
    private toastNotificationsService: ToastNotificationsService
  ) { }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(assessment => {
      this.assessment = assessment;
    });

    this.energyOpportunitiesSub = this.energyOpportunityIdbService.energyOpportunities.subscribe(energyOpportunities => {
      this.energyOpportunities = energyOpportunities.filter(opp => {
        return opp.assessmentId == this.assessment.guid;
      });
    });

    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(nebs => {
      this.nonEnergyBenefits = nebs;
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.energyOpportunitiesSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
  }


  async addEnergyOpportunity() {
    let newOpportunity: IdbEnergyOpportunity = getNewIdbEnergyOpportunity(this.assessment.userId, this.assessment.companyId,
      this.assessment.facilityId, this.assessment.guid, this.assessment.utilityEnergyUses);
    let assessmentEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunities.filter(prj => {
      return prj.assessmentId == this.assessment.guid;
    });
    newOpportunity.name = 'Opportunity #' + (assessmentEnergyOpportunities.length + 1);
    await firstValueFrom(this.energyOpportunityIdbService.addWithObservable(newOpportunity));
    await this.energyOpportunityIdbService.setEnergyOpportunities();
    this.toastNotificationsService.showToast('Opportunity Added!', 'A new energy efficiency opportunity was added to the assessment.', 'bg-success', true, false);
    this.router.navigateByUrl('/portfolio/assessment/' + newOpportunity.assessmentId + '/energy-opportunities/' + newOpportunity.guid)
  }
}
