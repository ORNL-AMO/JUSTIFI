import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicatorOption, PrimaryKPI } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetricOptions, KpmKeywords } from 'src/app/shared/constants/keyPerformanceMetrics';
import * as _ from 'lodash';

@Pipe({
    name: 'kpiListFilter',
    standalone: false
})
export class KpiListFilterPipe implements PipeTransform {

  transform(keyPerformanceIndicators: Array<KeyPerformanceIndicatorOption>, searchStr: string, category: PrimaryKPI): Array<KeyPerformanceIndicatorOption> {
    let filteredOptions: Array<KeyPerformanceIndicatorOption> = keyPerformanceIndicators;
    if (category) {
      filteredOptions = filteredOptions.filter(option => {
        return option.primaryKPI == category
      });
    }
    if (searchStr) {
      const search = searchStr.toLowerCase().trim();
      // Search by KPI label
      let labelOptions = filteredOptions.filter(option => {
        return option.label.toLowerCase().includes(search);
      });
      
      // Search by KPM keywords - find KPIs associated with matching KPMs
      let keywordOptions = filteredOptions.filter(option => {
        // Find KPMs associated with this KPI
        const associatedKpms = KeyPerformanceMetricOptions.filter(kpm => kpm.kpiValue === option.optionValue);
        // Check if any of the associated KPMs have matching keywords
        return associatedKpms.some(kpm => {
          const keywords = KpmKeywords[kpm.value] || [];
          return keywords.some(keyword => keyword.toLowerCase().includes(search));
        });
      });
      
      // Combine results and remove duplicates
      filteredOptions = _.union(labelOptions, keywordOptions);
    }


    return _.orderBy(filteredOptions, (option: KeyPerformanceIndicatorOption) => {
      return this.getPrimaryOrder(option);
    }, 'asc');
  }


  getPrimaryOrder(option: KeyPerformanceIndicatorOption): number {
    switch (option.primaryKPI) {
      case 'Operations Impact':
        return 1;
      case 'Employee Environment':
        return 2;
      case 'Resource Efficiency':
        return 3;
      case 'Strategic Growth':
        return 4;
      case 'Other':
        return 5;
      case 'Utility Use and Costs':
        return 6
    }
  }
}