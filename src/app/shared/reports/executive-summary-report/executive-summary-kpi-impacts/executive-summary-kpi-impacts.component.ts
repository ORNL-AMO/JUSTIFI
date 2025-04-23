import { Component, Input } from '@angular/core';
import { KeyPerformanceIndicatorReport, KeyPerformanceIndicatorReportItem } from '../../calculations/keyPerformanceIndicatorReport';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { ExecutiveSummaryReport } from '../../calculations/executiveSummaryReport';
import { IdbFacility } from 'src/app/models/facility';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';

@Component({
  selector: 'app-executive-summary-kpi-impacts',
  standalone: false,
  
  templateUrl: './executive-summary-kpi-impacts.component.html',
  styleUrl: './executive-summary-kpi-impacts.component.css'
})
export class ExecutiveSummaryKpiImpactsComponent {

  @Input({ required: true })
  executiveSummaryReport: ExecutiveSummaryReport;

  topKpis: Array<KeyPerformanceIndicatorOption>;
  kpiReportItems: Array<KeyPerformanceIndicatorReportItem>;
  reducedKpiReportItems: Array<KeyPerformanceIndicatorReportItem>;
  limit: number = 6; // limit top KPIs to show
  additionalKpiFinancialImpact: number = 0;
  additionalKpiBaselineCost: number = 0;
  additionalKpiPercentChange: number = 0;
  additionalKpiModifiedCost: number = 0;

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
    // filter top 3 KPIs
    this.kpiReportItems = this.executiveSummaryReport.keyPerformanceIndicatorReport.kpiReportItems;
    this.kpiReportItems.sort((a, b) => {
      return b.percentSavings - a.percentSavings;
    });
    this.reducedKpiReportItems = this.reduceKpiReportItemsByChange(this.kpiReportItems, this.limit);
    this.topKpis = this.kpiReportItems.slice(0, 3).map(item => item.keyPerformanceIndicator);
    // get currency code
    this.currencySub = this.localeService.currencyCode.subscribe(
      code => {this.currencyCode = code}
    );
    // calculate modified utility costs and percentage change
    this.modifiedUtilityCosts = this.executiveSummaryReport.totalUtilityCosts - this.executiveSummaryReport.totalUtilityCostSavings;
    this.utilityPercentageChange = (this.executiveSummaryReport.totalUtilityCostSavings / this.facility.cost) * 100; // utility percentage based on facility cost
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
    this.facilitySub.unsubscribe();
  }

  reduceKpiReportItemsByChange(kpiReportItems: Array<KeyPerformanceIndicatorReportItem>, limit: number): Array<KeyPerformanceIndicatorReportItem> {
    kpiReportItems.sort((a, b) => {
      return b.percentSavings - a.percentSavings;
    });
    if (kpiReportItems.length > limit) {
      const topKpiReportItems = kpiReportItems.slice(0, limit - 1);
      const otherKpiReportItems = kpiReportItems.slice(limit - 1);
      // aggregate others into a single item
      let baselineCost: number = otherKpiReportItems.reduce((acc, item) => acc + item.baselineCost, 0);
      let annualCostSavings: number = otherKpiReportItems.reduce((acc, item) => acc + item.annualCostSavings, 0);
      let modifiedCost: number = baselineCost - annualCostSavings;
      let percentSavings: number = (annualCostSavings / baselineCost) * 100;
      if (percentSavings == Infinity || percentSavings == -Infinity || isNaN(percentSavings)) {
        percentSavings = 0;
      }
      this.additionalKpiBaselineCost = baselineCost;
      this.additionalKpiFinancialImpact = annualCostSavings;
      this.additionalKpiPercentChange = percentSavings;
      this.additionalKpiModifiedCost = modifiedCost;
      return [...topKpiReportItems]
    } else {
      return [...kpiReportItems];
    }
  }

}
