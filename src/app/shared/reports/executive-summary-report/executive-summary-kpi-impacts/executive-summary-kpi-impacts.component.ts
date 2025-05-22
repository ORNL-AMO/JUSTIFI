import { Component, Input } from '@angular/core';
import { AdditionalKeyPerformanceIndicatorReportItem, KeyPerformanceIndicatorReport, KeyPerformanceIndicatorReportItem } from '../../calculations/keyPerformanceIndicatorReport';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { ExecutiveSummaryReport } from '../../calculations/executiveSummaryReport';
import { IdbFacility } from 'src/app/models/facility';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { faBullseye, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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

  
  topKpis: Array<KeyPerformanceIndicatorOption>;
  kpiReportItems: Array<KeyPerformanceIndicatorReportItem>;
  kpiReportCostItems: Array<KeyPerformanceIndicatorReportItem>;
  kpiReportRevenueItems: Array<KeyPerformanceIndicatorReportItem>;
  reducedKpiReportCostItems: Array<KeyPerformanceIndicatorReportItem>;
  reducedKpiReportRevenueItems: Array<KeyPerformanceIndicatorReportItem>;
  limit: number = 4; // limit top KPIs to show
  orderByField: 'PotentialChange' | 'PercentChange' = 'PotentialChange'; // default order by field
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

  modifiedUtilityCosts: number;
  utilityPercentageChange: number;

  currencyCode: string;
  currencySub: Subscription;

  facility: IdbFacility;
  facilitySub: Subscription;

  constructor(
    private facilityIdbService: FacilityIdbService,
    private localeService: LocaleService,
  ) { }

  ngOnInit() {
    // facility sub
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(
      facility => {this.facility = facility}
    );
    // calculate modified utility costs and percentage change
    this.modifiedUtilityCosts = this.executiveSummaryReport.totalUtilityCosts - this.executiveSummaryReport.totalUtilityCostSavings;
    this.utilityPercentageChange = (this.executiveSummaryReport.totalUtilityCostSavings / this.facility.cost) * 100; // utility percentage based on facility cost
    // get currency code
    this.currencySub = this.localeService.currencyCode.subscribe(
      code => {this.currencyCode = code}
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
    this.kpiReportItems = this.executiveSummaryReport.keyPerformanceIndicatorReport.kpiReportItems;
    this.kpiReportItems.sort((a, b) => {
      return b.percentSavings - a.percentSavings;
    });
    this.topKpis = this.kpiReportItems.slice(0, 3).map(item => item.keyPerformanceIndicator);
    // filter top KPIs by cost savings and revenue
    this.kpiReportCostItems = this.kpiReportItems.filter(item => {
      return item.costSaving > 0
    });
    this.kpiReportRevenueItems = this.kpiReportItems.filter(item => {
      return item.revenue > 0
    });
    this.setOrderByField(this.orderByField);
  }

  setOrderByField(orderByField: 'PotentialChange' | 'PercentChange') {
    this.orderByField = orderByField;
    this.sortKpiReportItems(this.kpiReportCostItems, this.orderByField, this.orderByDir);
    this.reducedKpiReportCostItems = this.reduceKpiReportItemsByChange(this.kpiReportCostItems, this.limit, this.additionalKpiReportCostItem);
    this.sortKpiReportItems(this.kpiReportRevenueItems, this.orderByField, this.orderByDir);
    this.reducedKpiReportRevenueItems = this.reduceKpiReportItemsByChange(this.kpiReportRevenueItems, this.limit, this.additionalKpiReportRevenueItem);
  }

  sortKpiReportItems(kpiReportItems: Array<KeyPerformanceIndicatorReportItem>, orderByField: 'PotentialChange' | 'PercentChange', orderByDir: 'asc' | 'desc') {
    // sort by orderByField and orderByDir
    kpiReportItems.sort((a, b) => {
      if (orderByField == 'PotentialChange') {
        if (orderByDir == 'asc') {
          return a.financialImpact - b.financialImpact;
        } else {
          return b.financialImpact - a.financialImpact;
        }
      } else if (orderByField == 'PercentChange') {
        if (orderByDir == 'asc') {
          return a.percentSavings - b.percentSavings;
        } else {
          return b.percentSavings - a.percentSavings;
        }
      } else {
        return 0;
      }
    });
  }

  reduceKpiReportItemsByChange(kpiReportItems: Array<KeyPerformanceIndicatorReportItem>, limit: number, additionalKpiReportItem: AdditionalKeyPerformanceIndicatorReportItem): Array<KeyPerformanceIndicatorReportItem> {
    if (kpiReportItems.length > limit) {
      const topKpiReportItems = kpiReportItems.slice(0, limit - 1);
      const otherKpiReportItems = kpiReportItems.slice(limit - 1);
      // aggregate others into a single item
      let baselineCost: number = otherKpiReportItems.reduce((acc, item) => acc + item.baselineCost, 0);
      let financialImpact: number = otherKpiReportItems.reduce((acc, item) => acc + item.financialImpact, 0);
      let modifiedCost: number = baselineCost - financialImpact;
      let percentSavings: number = (financialImpact / baselineCost) * 100;
      if (percentSavings == Infinity || percentSavings == -Infinity || isNaN(percentSavings)) {
        percentSavings = 0;
      }
      additionalKpiReportItem.baselineCost = baselineCost;
      additionalKpiReportItem.financialImpact = financialImpact;
      additionalKpiReportItem.percentSavings = percentSavings;
      additionalKpiReportItem.modifiedCost = modifiedCost;
      return [...topKpiReportItems]
    } else {
      return [...kpiReportItems];
    }
  }

}
