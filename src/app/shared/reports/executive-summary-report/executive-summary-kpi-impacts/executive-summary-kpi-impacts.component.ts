import { Component, Input } from '@angular/core';
import { AdditionalKeyPerformanceIndicatorReportItem, KeyPerformanceIndicatorReport, KeyPerformanceIndicatorReportItem } from '../../calculations/keyPerformanceIndicatorReport';
import { KeyPerformanceIndicatorOption, UtilityUseKpi, EnergyUseKpi } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { ExecutiveSummaryReport } from '../../calculations/executiveSummaryReport';
import { IdbFacility } from 'src/app/models/facility';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { faBullseye, faSort, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { getNewKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import * as _ from 'lodash';
@Component({
  selector: 'app-executive-summary-kpi-impacts',
  standalone: false,

  templateUrl: './executive-summary-kpi-impacts.component.html',
  styleUrl: './executive-summary-kpi-impacts.component.css'
})
export class ExecutiveSummaryKpiImpactsComponent {
  @Input({ required: true })
  executiveSummaryReport: ExecutiveSummaryReport;

  faBullseye: IconDefinition = faBullseye;
  faSort: IconDefinition = faSort;

  topKpis: Array<KeyPerformanceIndicatorOption>;
  kpiReportItems: Array<KeyPerformanceIndicatorReportItem>;
  kpiReportCostItems: Array<KeyPerformanceIndicatorReportItem>;
  kpiReportRevenueItems: Array<KeyPerformanceIndicatorReportItem>;
  reducedKpiReportCostItems: Array<KeyPerformanceIndicatorReportItem>;
  reducedKpiReportRevenueItems: Array<KeyPerformanceIndicatorReportItem>;
  orderByField: 'percentSavings' | 'financialImpact' = 'financialImpact'; // default order by field
  orderByDir: 'asc' | 'desc' = 'desc'; // default order by direction

  additionalKpiReportCostItem: AdditionalKeyPerformanceIndicatorReportItem = {
    baselineCost: 0,
    financialImpact: 0,
    modifiedCost: 0,
    percentSavings: 0
  };
  additionalKpiReportRevenueItem: AdditionalKeyPerformanceIndicatorReportItem = {
    baselineCost: 0,
    financialImpact: 0,
    modifiedCost: 0,
    percentSavings: 0
  };
  currencyCode: string;
  currencySub: Subscription;

  facility: IdbFacility;
  facilitySub: Subscription;

  limitOptions: Array<number> = [];
  limit: number = 3;

  constructor(
    private facilityIdbService: FacilityIdbService,
    private localeService: LocaleService,
  ) { }

  ngOnInit() {
    // facility sub
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(
      facility => { this.facility = facility }
    );
    // calculate modified utility costs and percentage change
    // this.modifiedUtilityCosts = this.executiveSummaryReport.totalUtilityCosts - this.executiveSummaryReport.totalUtilityCostSavings;
    // this.utilityPercentageChange = (this.executiveSummaryReport.totalUtilityCostSavings / this.facility.cost) * 100; // utility percentage based on facility cost
    // get currency code
    this.currencySub = this.localeService.currencyCode.subscribe(
      code => { this.currencyCode = code }
    );
    // set reports
    this.setReports();
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
    this.facilitySub.unsubscribe();
  }

  setReports() {
    // filter top 3 KPIs
    this.kpiReportItems = [];
    this.limitOptions = [];
    for (let i = 0; i < this.executiveSummaryReport.keyPerformanceIndicatorReport.kpiReportItems.length; i++) {
      this.kpiReportItems.push(this.executiveSummaryReport.keyPerformanceIndicatorReport.kpiReportItems[i]);
      this.limitOptions.push(i + 1);
    }
    //add energy kpi item
    const utilityKpi: KeyPerformanceIndicatorOption = this.executiveSummaryReport.utilityCategory === 'energy' ? EnergyUseKpi : UtilityUseKpi;
    let tmpEnergyKpi: KeyPerformanceIndicatorReportItem = {
      keyPerformanceIndicator: getNewKeyPerformanceIndicator('', '', utilityKpi, true, ''),
      baselineCost: this.facility.cost,
      financialImpact: this.executiveSummaryReport.totalUtilityCostSavings,
      costSaving: this.executiveSummaryReport.totalUtilityCostSavings,
      revenue: 0,
      modifiedCost: this.facility.cost - this.executiveSummaryReport.totalUtilityCostSavings,
      percentSavings: (this.executiveSummaryReport.totalUtilityCostSavings / this.facility.cost) * 100
    }
    this.kpiReportItems.push(tmpEnergyKpi);
    this.kpiReportItems.sort((a, b) => {
      return b.costSaving - a.costSaving;
    });
    this.topKpis = this.kpiReportItems.slice(0, 3).map(item => item.keyPerformanceIndicator);
    // filter top KPIs by cost savings and revenue
    this.kpiReportCostItems = this.kpiReportItems.filter(item => {
      return item.costSaving > 0
    });
    this.kpiReportRevenueItems = this.kpiReportItems.filter(item => {
      return item.revenue > 0
    });
    this.limitOptions = Array.from({ length: Math.max(this.kpiReportCostItems.length, this.kpiReportRevenueItems.length) }, (_, i) => i + 1);
    this.orderReportItems();
  }

  setOrderByField(_orderByField: 'percentSavings' | 'financialImpact') {
    // set order by field and direction
    if (this.orderByField == _orderByField) {
      this.orderByDir = this.orderByDir === 'asc' ? 'desc' : 'asc'; // toggle direction
    } else {
      this.orderByField = _orderByField;
    }
    this.orderReportItems();
  }

  orderReportItems() {
    //order lists
    this.kpiReportCostItems = _.orderBy(this.kpiReportCostItems, (item: KeyPerformanceIndicatorReportItem) => {
      return item[this.orderByField]
    }, this.orderByDir)
    this.kpiReportRevenueItems = _.orderBy(this.kpiReportRevenueItems, (item: KeyPerformanceIndicatorReportItem) => {
      return item[this.orderByField]
    }, this.orderByDir);
    this.reducedKpiReportCostItems = this.kpiReportCostItems.slice(0, this.limit);
    this.reducedKpiReportRevenueItems = this.kpiReportRevenueItems.slice(0, this.limit);
    this.additionalKpiReportCostItem = {
      baselineCost: 0,
      financialImpact: 0,
      modifiedCost: 0,
      percentSavings: 0
    }
    //percent savings for combined doesn't make sense
    for (let i = this.limit; i < this.kpiReportCostItems.length; i++) {
      this.additionalKpiReportCostItem.baselineCost += this.kpiReportCostItems[i].baselineCost;
      this.additionalKpiReportCostItem.financialImpact += this.kpiReportCostItems[i].financialImpact;
      this.additionalKpiReportCostItem.modifiedCost += this.kpiReportCostItems[i].modifiedCost;
    }

    this.additionalKpiReportRevenueItem = {
      baselineCost: 0,
      financialImpact: 0,
      modifiedCost: 0,
      percentSavings: 0
    }
    for (let i = this.limit; i < this.kpiReportRevenueItems.length; i++) {
      this.additionalKpiReportRevenueItem.baselineCost += this.kpiReportRevenueItems[i].baselineCost;
      this.additionalKpiReportRevenueItem.financialImpact += this.kpiReportRevenueItems[i].financialImpact;
      this.additionalKpiReportRevenueItem.modifiedCost += this.kpiReportRevenueItems[i].modifiedCost;
    }
  }
}
