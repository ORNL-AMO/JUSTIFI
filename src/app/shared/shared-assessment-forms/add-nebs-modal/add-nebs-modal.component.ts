import { Component } from '@angular/core';
import { IconDefinition, faPlus, faWeightHanging } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { getNewIdbKeyPerformanceMetricImpact, IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit, getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';
import { SharedDataService } from '../../shared-services/shared-data.service';

@Component({
  selector: 'app-add-nebs-modal',
  templateUrl: './add-nebs-modal.component.html',
  styleUrl: './add-nebs-modal.component.css'
})
export class AddNebsModalComponent {


  faWeightHanging: IconDefinition = faWeightHanging;
  faPlus: IconDefinition = faPlus;
  displayModal: boolean = false;
  assessment: IdbAssessment;
  energyOpportunity: IdbEnergyOpportunity;

  selectedNebs: Array<NebOption> =[];

  constructor(private sharedDataService: SharedDataService, private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService
  ) {
  }

  ngOnInit() {
    let modalData: { assessmentId: string, energyOpportunityId: string } = this.sharedDataService.displayAddNebsModal.getValue();
    this.assessment = this.assessmentIdbService.getByGuid(modalData.assessmentId);
    if (modalData.energyOpportunityId) {
      this.energyOpportunity = this.energyOpportunityIdbService.getByGuid(modalData.energyOpportunityId);
    }
    setTimeout(() => {
      this.displayModal = true;
    }, 100)
  }

  async addNebs() {
    for (let i = 0; i < this.selectedNebs.length; i++) {
      let nebOption: NebOption = this.selectedNebs[i];
      let newIdbNonEnergyBenefit: IdbNonEnergyBenefit;
      let companyPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getCompanyKeyPerformanceMetrics(this.assessment.companyId);
      if (this.energyOpportunity) {
        newIdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.energyOpportunity.userId, this.energyOpportunity.companyId, this.energyOpportunity.facilityId, this.energyOpportunity.assessmentId, this.energyOpportunity.guid, nebOption, false);
        //add associated key performance metric impacts
        for (let x = 0; x < companyPerformanceMetrics.length; x++) {
          let metric: KeyPerformanceMetric = companyPerformanceMetrics[x];
          if (nebOption.KPM.indexOf(metric.value) != -1) {
            let performanceMetricImpact: IdbKeyPerformanceMetricImpact = getNewIdbKeyPerformanceMetricImpact(this.energyOpportunity.userId, this.energyOpportunity.companyId, this.energyOpportunity.facilityId, this.energyOpportunity.guid, newIdbNonEnergyBenefit.guid, metric.value, this.energyOpportunity.assessmentId, metric.kpiGuid, metric.guid);
            await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.addWithObservable(performanceMetricImpact));
          }
        }
      } else {
        newIdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, this.assessment.guid, undefined, nebOption, false);
        //add associated key performance metric impacts
        for (let x = 0; x < companyPerformanceMetrics.length; x++) {
          let metric: KeyPerformanceMetric = companyPerformanceMetrics[x];
          if (nebOption.KPM.indexOf(metric.value) != -1) {
            let performanceMetricImpact: IdbKeyPerformanceMetricImpact = getNewIdbKeyPerformanceMetricImpact(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, undefined, newIdbNonEnergyBenefit.guid, metric.value, this.assessment.guid, metric.kpiGuid, metric.guid);
            await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.addWithObservable(performanceMetricImpact));
          }
        }
      }
      await firstValueFrom(this.nonEnergyBenefitIdbService.addWithObservable(newIdbNonEnergyBenefit));
    }
    await this.nonEnergyBenefitIdbService.setNonEnergyBenefits();
    await this.keyPerformanceMetricImpactsIdbService.setKeyPerformanceMetricImpacts();
    this.closeModal();
  }


  closeModal() {
    NebOptions.forEach(option => {
      option.selected = false;
    });
    this.sharedDataService.displayAddNebsModal.next(undefined);
  }

  setSelectedNebs(selectedNebs: Array<NebOption>) {
    this.selectedNebs = selectedNebs;
  }

}
