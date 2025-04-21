import { Component, Input } from '@angular/core';
import { KeyPerformanceIndicatorReport, KeyPerformanceIndicatorReportItem } from '../../calculations/keyPerformanceIndicatorReport';
import { KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { Subscription } from 'rxjs';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { ExecutiveSummaryReport } from '../../calculations/executiveSummaryReport';

@Component({
  selector: 'app-executive-summary-kpm-impacts',
  standalone: false,
  
  templateUrl: './executive-summary-kpm-impacts.component.html',
  styleUrl: './executive-summary-kpm-impacts.component.css'
})
export class ExecutiveSummaryKpmImpactsComponent {

  @Input({ required: true })
  executiveSummaryReport: ExecutiveSummaryReport;

  topKpis: Array<KeyPerformanceIndicatorValue>;
  reducedKpiReportItems: Array<KeyPerformanceIndicatorReportItem>;

  modifiedUtilityCosts: number;
  utilityPercentageChange: number;

  currencyCode: string;
  currencySub: Subscription;

  constructor(
    private localeService: LocaleService,
  ) { }

  ngOnInit() {
    // filter top 3 KPIs
    const kpiReportItems: Array<KeyPerformanceIndicatorReportItem> = this.executiveSummaryReport.keyPerformanceIndicatorReport.kpiReportItems;
    console.log("kpiReportItems", kpiReportItems);
    kpiReportItems.sort((a, b) => {
      return b.percentSavings - a.percentSavings;
    });
    this.reducedKpiReportItems = this.reduceKpiReportItemsByChange(kpiReportItems, 6);
    this.topKpis = kpiReportItems.slice(0, 3).map(item => item.kpiValue);
    // get currency code
    this.currencySub = this.localeService.currencyCode.subscribe(
      code => {this.currencyCode = code}
    );
    // calculate modified utility costs and percentage change
    this.modifiedUtilityCosts = this.executiveSummaryReport.totalUtilityCosts - this.executiveSummaryReport.totalUtilityCostSavings;
    this.utilityPercentageChange = (this.executiveSummaryReport.totalUtilityCostSavings / this.executiveSummaryReport.totalUtilityCosts) * 100;
  }

  ngOnDestroy() {
    this.currencySub.unsubscribe();
  }

  reduceKpiReportItemsByChange(kpiReportItems: Array<KeyPerformanceIndicatorReportItem>, limit: number): Array<KeyPerformanceIndicatorReportItem> {
    kpiReportItems.sort((a, b) => {
      return b.percentSavings - a.percentSavings;
    });
    if (kpiReportItems.length > limit) {
      const topKpiReportItems = kpiReportItems.slice(0, limit - 1);
      const otherKpiReportItems = kpiReportItems.slice(limit - 1);
      // // aggregate others into a single item
      // let baselineCost: number = otherKpiReportItems.reduce((acc, item) => acc + item.baselineCost, 0);
      // let annualCostSavings: number = otherKpiReportItems.reduce((acc, item) => acc + item.annualCostSavings, 0);
      // let modifiedCost: number = baselineCost - annualCostSavings;
      // let percentSavings: number = (annualCostSavings / baselineCost) * 100;
      // if (percentSavings == Infinity || percentSavings == -Infinity || isNaN(percentSavings)) {
      //   percentSavings = 0;
      // }
      // let otherKpiReportItem: KeyPerformanceIndicatorReportItem = {
      //   kpiValue: "other",
      //   baselineCost: baselineCost,
      //   annualCostSavings: annualCostSavings,
      //   modifiedCost: modifiedCost,
      //   percentSavings: percentSavings
      // };
      // let items = [...topKpiReportItems, otherKpiReportItem];
      // console.log("otherKpiReportItem", items.length);
      return [...topKpiReportItems]
    } else {
      return kpiReportItems;
    }
  }

}
