import { Component } from '@angular/core';
import { IconDefinition, faBookOpen, faMoneyBillWave, faPlus, faSearchPlus, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { getNewIdbNonEnergyBenefit, IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
  selector: 'app-assessment-nebs-form',
  templateUrl: './assessment-nebs-form.component.html',
  styleUrl: './assessment-nebs-form.component.css',
  standalone: false
})
export class AssessmentNebsFormComponent {

  faSearchPlus: IconDefinition = faSearchPlus;
  faPlus: IconDefinition = faPlus;
  faWeightHanging: IconDefinition = faWeightHanging;
  faMoneyBillWave: IconDefinition = faMoneyBillWave;
  faBookOpen: IconDefinition = faBookOpen;

  assessment: IdbAssessment;
  assessmentSub: Subscription;
  energyOppNonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  nonEnergyBenefitsSub: Subscription;

  newNebName: string;
  displayNebModal: boolean = false;
  showAddNebDropdown: boolean = false;
  constructor(private assessmentIdbService: AssessmentIdbService,
    private sharedDataService: SharedDataService,
    private nonEnergyBenefitsIdbService: NonEnergyBenefitsIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private reportIdbService: ReportIdbService
  ) {
  }

  ngOnInit() {
    this.assessmentSub = this.assessmentIdbService.selectedAssessment.subscribe(_assessment => {
      this.assessment = _assessment;
    });
    this.nonEnergyBenefitsSub = this.nonEnergyBenefitsIdbService.nonEnergyBenefits.subscribe(_nonEnergyBenefits => {
      this.energyOppNonEnergyBenefits = _nonEnergyBenefits.filter(neb => { return neb.assessmentId == this.assessment.guid && neb.energyOpportunityId != undefined });
    });
  }

  ngOnDestroy() {
    this.assessmentSub.unsubscribe();
    this.nonEnergyBenefitsSub.unsubscribe();
  }

  openNebModal() {
    this.showAddNebDropdown = false;
    this.sharedDataService.displayAddNebsModal.next({ assessmentId: this.assessment.guid, energyOpportunityId: undefined });
  }

  async addNEB(isRebate: boolean) {
    this.showAddNebDropdown = false;
    let newNonEnergyBenefit: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, this.assessment.guid, undefined, undefined, true);
    if (isRebate) {
      newNonEnergyBenefit.costImpactType = 'oneTime';
      newNonEnergyBenefit.name = 'One-time Incentive';
    }
    await firstValueFrom(this.nonEnergyBenefitsIdbService.addWithObservable(newNonEnergyBenefit));
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.getByAssessmentGUID(newNonEnergyBenefit.assessmentId);
    await this.reportIdbService.addNonEnergyBenefit(newNonEnergyBenefit, onSiteVisit.guid);
    await this.nonEnergyBenefitsIdbService.setNonEnergyBenefits();
  }

  toggleAddNebDropdown() {
    this.showAddNebDropdown = !this.showAddNebDropdown;
  }

}
