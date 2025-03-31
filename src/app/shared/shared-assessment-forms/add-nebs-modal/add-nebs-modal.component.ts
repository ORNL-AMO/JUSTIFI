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
import { KeyPerformanceMetric, KeyPerformanceMetricOption, KeyPerformanceMetricOptions } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';

@Component({
  selector: 'app-add-nebs-modal',
  templateUrl: './add-nebs-modal.component.html',
  styleUrl: './add-nebs-modal.component.css',
  standalone: false
})
export class AddNebsModalComponent {


  faWeightHanging: IconDefinition = faWeightHanging;
  faPlus: IconDefinition = faPlus;
  displayModal: boolean = false;
  assessment: IdbAssessment;
  energyOpportunity: IdbEnergyOpportunity;

  selectedNebs: Array<NebOption> = [];

  constructor(private sharedDataService: SharedDataService, private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private reportIdbService: ReportIdbService
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
      if (this.energyOpportunity) {
        newIdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.energyOpportunity.userId, this.energyOpportunity.companyId, this.energyOpportunity.facilityId, this.energyOpportunity.assessmentId, this.energyOpportunity.guid, nebOption, false);
      } else {
        newIdbNonEnergyBenefit = getNewIdbNonEnergyBenefit(this.assessment.userId, this.assessment.companyId, this.assessment.facilityId, this.assessment.guid, undefined, nebOption, false);
      }
      for (let kpm of nebOption.selectedKPM) {
        let performanceMetricToAdd: KeyPerformanceMetricOption = KeyPerformanceMetricOptions.find(kpmOption => { return kpmOption.value == kpm })
        let addedMetric: KeyPerformanceMetric = await this.keyPerformanceIndicatorIdbService.addKpmToKpi(newIdbNonEnergyBenefit.companyId, performanceMetricToAdd, newIdbNonEnergyBenefit.userId, newIdbNonEnergyBenefit.facilityId);
        let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(newIdbNonEnergyBenefit.facilityId, performanceMetricToAdd.kpiValue);
        let newKeyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact = getNewIdbKeyPerformanceMetricImpact(newIdbNonEnergyBenefit.userId, newIdbNonEnergyBenefit.companyId, newIdbNonEnergyBenefit.facilityId, newIdbNonEnergyBenefit.energyOpportunityId, newIdbNonEnergyBenefit.guid, addedMetric.value, newIdbNonEnergyBenefit.assessmentId, keyPerformanceIndicator.guid, addedMetric.guid);
        await firstValueFrom(this.keyPerformanceMetricImpactsIdbService.addWithObservable(newKeyPerformanceMetricImpact));
        await this.keyPerformanceMetricImpactsIdbService.setKeyPerformanceMetricImpacts();
        let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.getByAssessmentGUID(newKeyPerformanceMetricImpact.assessmentId);
        await this.reportIdbService.addKpmImpact(newKeyPerformanceMetricImpact, onSiteVisit.guid);
      }
      await firstValueFrom(this.nonEnergyBenefitIdbService.addWithObservable(newIdbNonEnergyBenefit));
      let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.getByAssessmentGUID(newIdbNonEnergyBenefit.assessmentId);
      await this.reportIdbService.addNonEnergyBenefit(newIdbNonEnergyBenefit, onSiteVisit.guid);
    }
    await this.nonEnergyBenefitIdbService.setNonEnergyBenefits();
    await this.keyPerformanceMetricImpactsIdbService.setKeyPerformanceMetricImpacts();
    this.closeModal();
  }


  closeModal() {
    NebOptions.forEach(option => {
      option.selected = false;
      option.selectedKPM = [];
    });
    this.sharedDataService.displayAddNebsModal.next(undefined);
  }

  setSelectedNebs(selectedNebs: Array<NebOption>) {
    this.selectedNebs = selectedNebs;
  }

}
