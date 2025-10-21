import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from '../constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetricOptions, KeyPerformanceMetricValue } from '../constants/keyPerformanceMetrics';

export interface KpmComposite {
    kpmValue: KeyPerformanceMetricValue;
    kpiValue: KeyPerformanceIndicatorValue;
    htmlLabel: string;
}

@Pipe({
    name: 'kpmComposite',
    standalone: false
})
export class KpmCompositePipe implements PipeTransform {

  transform(kpmValues: Array<KeyPerformanceMetricValue>): Array<KpmComposite> {
    const kpmComposites: Array<KpmComposite> = [];

    kpmValues.forEach(kpmValue => {
      const kpmOptions = KeyPerformanceMetricOptions.filter(option => option.value === kpmValue);
      kpmOptions.forEach(option => {
        const kpiValue = option.kpiValue;
        const kpiHtmlLabel = KeyPerformanceIndicatorOptions.find(kpi => kpi.optionValue === kpiValue)?.htmlLabel || '';
        kpmComposites.push({
          kpmValue: kpmValue,
          kpiValue: kpiValue,
          htmlLabel: option.htmlLabel + ' (' + kpiHtmlLabel + ')'
        });
      });
    });

    return kpmComposites;
  }

}
