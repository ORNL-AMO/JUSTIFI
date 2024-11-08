import { Component } from '@angular/core';
import { IconDefinition, faPlus, faSearchPlus, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { getNewIdbNonEnergyBenefit, IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessment-nebs-form',
  templateUrl: './assessment-nebs-form.component.html',
  styleUrl: './assessment-nebs-form.component.css'
})
export class AssessmentNebsFormComponent {

  faSearchPlus: IconDefinition = faSearchPlus;
  faPlus: IconDefinition = faPlus;
  faWeightHanging: IconDefinition = faWeightHanging;

  assessment: IdbAssessment;
  assessmentSub: Subscription;

  newNebName: string;
  displayNebModal: boolean = false;
  showAddNebDropdown: boolean = false;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private sharedDataService: SharedDataService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService
  ) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
  }

  openNebModal() {
    this.showAddNebDropdown = false;
    this.sharedDataService.displayAddNebsModal.next({ assessmentId: this.assessment.guid, energyOpportunityId: undefined });
  }

  async addNEB() {
    this.showAddNebDropdown = false;
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, this.assessment.guid, undefined, undefined, true);
    await firstValueFrom(this.nonEnergyBenefitIdbService.addWithObservable(newNonEnergyBenefit))
    await this.nonEnergyBenefitIdbService.setNonEnergyBenefits();
  }

  toggleAddNebDropdown() {
    this.showAddNebDropdown = !this.showAddNebDropdown;
  }

}
