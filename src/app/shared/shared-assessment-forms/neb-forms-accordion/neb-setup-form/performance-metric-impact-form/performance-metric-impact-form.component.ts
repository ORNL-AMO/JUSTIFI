import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faBullseye, faClose, faEdit, faLock, faPlus, faScaleUnbalancedFlip, faTrash } from '@fortawesome/free-solid-svg-icons';
import { firstValueFrom, Subscription } from 'rxjs';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { KeyPerformanceMetric } from 'src/app/shared/constants/keyPerformanceMetrics';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';

@Component({
    selector: 'app-performance-metric-impact-form',
    templateUrl: './performance-metric-impact-form.component.html',
    styleUrl: './performance-metric-impact-form.component.css',
    standalone: false
})
export class PerformanceMetricImpactFormComponent {
  @Input({ required: true })
  impactGuid: string;
  @Input({ required: true })
  nonEnergyBenefit: IdbNonEnergyBenefit;

  faScaleUnbalancedFlip: IconDefinition = faScaleUnbalancedFlip;
  faPlus: IconDefinition = faPlus;
  faClose: IconDefinition = faClose;
  faTrash: IconDefinition = faTrash;
  faEdit: IconDefinition = faEdit;
  faBullseye: IconDefinition = faBullseye;
  faLock: IconDefinition = faLock;

  keyPerformanceMetric: KeyPerformanceMetric;
  overrideBaseline: boolean = false;

  keyPerformanceMetricImpact: IdbKeyPerformanceMetricImpact;
  displayDeleteModal: boolean = false;
  metricHasOtherImpacts: boolean = false;

  keyPerformanceMetricImpactsSub: Subscription;

  isFormChange: boolean = false;
  showDropdownMenu: boolean = false;

  currencyCode: string;
  currencySub: Subscription;

  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private router: Router,
    private onSiteVisitIdbService: OnSiteVisitIdbService,
    private keyPerformanceMetricImpactIdbService: KeyPerformanceMetricImpactsIdbService,
    private localeService: LocaleService,
  ) {

  }

  ngOnInit() {
    this.keyPerformanceMetricImpactsSub = this.keyPerformanceMetricImpactIdbService.keyPerformanceMetricImpacts.subscribe(_kpmImpacts => {
      if (!this.isFormChange) {
        this.keyPerformanceMetricImpact = this.keyPerformanceMetricImpactIdbService.getByGuid(this.impactGuid);
        if (this.keyPerformanceMetricImpact) {
          this.keyPerformanceMetric = this.keyPerformanceIndicatorIdbService.getKeyPerformanceMetric(this.keyPerformanceMetricImpact.facilityId, this.keyPerformanceMetricImpact.kpmGuid);
        }
      } else {
        this.isFormChange = false;
      }
      if (this.keyPerformanceMetricImpact) {
        this.setDisabledBaseline(_kpmImpacts);
      }
    });
    this.currencySub = this.localeService.currencyCode.subscribe(code => {
      this.currencyCode = code;
    });
  }

  ngOnDestroy() {
    this.keyPerformanceMetricImpactsSub.unsubscribe();
    this.currencySub.unsubscribe();
  }

  setDisabledBaseline(allKpmImpacts: Array<IdbKeyPerformanceMetricImpact>) {
    //disable baseline if other impacts in the system then one being edited in this component.
    let filteredImpacts: Array<IdbKeyPerformanceMetricImpact> = allKpmImpacts.filter(kpmImpact => {
      return kpmImpact.guid != this.impactGuid && kpmImpact.kpmGuid == this.keyPerformanceMetricImpact.kpmGuid;
    });
    this.metricHasOtherImpacts = (filteredImpacts.length != 0);
  }


  async saveChanges() {
    this.isFormChange = true;
    await this.keyPerformanceMetricImpactIdbService.asyncUpdate(this.keyPerformanceMetricImpact);
  }

  calculateCostFromKPM(kpmChanges: {modifiedMethod: boolean, updateBaseline: boolean}){
    if(kpmChanges.modifiedMethod){
      this.keyPerformanceMetricImpact.modificationValue = undefined;
    }
    this.calculateCost();
  }


  calculateCost() {
    if (this.keyPerformanceMetric.calculationMethod == 'costPerUnit') {
      this.keyPerformanceMetricImpact.costAdjustment = (this.keyPerformanceMetricImpact.modificationValue * this.keyPerformanceMetric.costPerValue);
    } else if (this.keyPerformanceMetric.calculationMethod == 'percentTotal') {
      this.keyPerformanceMetricImpact.costAdjustment = this.keyPerformanceMetric.baselineCost * (this.keyPerformanceMetricImpact.modificationValue / 100);
    } else if(this.keyPerformanceMetric.calculationMethod == 'directCost'){
      this.keyPerformanceMetricImpact.costAdjustment = this.keyPerformanceMetricImpact.modificationValue;
    }
    this.saveChanges();
  }

  goToMetric() {
    this.showDropdownMenu = false;
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    this.router.navigateByUrl('setup-wizard/pre-visit/' + onSiteVisit.guid + '/facility-kpi-detail/' + this.keyPerformanceMetricImpact.kpiGuid)
  }

  async savePerformanceMetric() {
    this.isFormChange = true;
    let keyPerformanceIndicator: IdbKeyPerformanceIndicator = this.keyPerformanceIndicatorIdbService.getByGuid(this.keyPerformanceMetric.kpiGuid);
    keyPerformanceIndicator.performanceMetrics.forEach(_metric => {
      if (_metric.guid == this.keyPerformanceMetric.guid) {
        _metric.baselineCost = this.keyPerformanceMetric.baselineCost;
        _metric.baselineValue = this.keyPerformanceMetric.baselineValue;
        _metric.costPerValue = this.keyPerformanceMetric.costPerValue;
      }
    });
    await this.keyPerformanceMetricImpactIdbService.updatePerformanceMetricBaseline(keyPerformanceIndicator, this.keyPerformanceMetric);
    await this.keyPerformanceIndicatorIdbService.asyncUpdate(keyPerformanceIndicator);
  }

  async calculateBaseline() {
    this.keyPerformanceMetric.baselineCost = (this.keyPerformanceMetric.baselineValue * this.keyPerformanceMetric.costPerValue);
    await this.savePerformanceMetric();
    await this.calculateCost();
  }

  openDeleteModal() {
    this.showDropdownMenu = false;
    this.displayDeleteModal = true;
    this.showDropdownMenu = false;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async confirmDelete() {
    await firstValueFrom(this.keyPerformanceMetricImpactIdbService.deleteWithObservable(this.keyPerformanceMetricImpact.id));
    await this.keyPerformanceMetricImpactIdbService.setKeyPerformanceMetricImpacts();
  }

  setOverrideBaseline(overrideBaseline: boolean) {
    this.showDropdownMenu = false;
    this.overrideBaseline = overrideBaseline;
    this.showDropdownMenu = false;
  }

  toggleDropdownMenu() {
    this.showDropdownMenu = !this.showDropdownMenu;
  }

  toggleShowDropdownMenu() {
    this.showDropdownMenu = !this.showDropdownMenu;
  }
}
