import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceIndicatorOption, PrimaryKPI } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
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
      filteredOptions = filteredOptions.filter(option => {
        return option.label.toLowerCase().includes(searchStr.toLowerCase());
      });
    }


    return _.orderBy(filteredOptions, (option: KeyPerformanceIndicatorOption) => {
      return this.getPrimaryOrder(option);
    }, 'asc');
  }


  getPrimaryOrder(option: KeyPerformanceIndicatorOption): number {
    switch (option.primaryKPI) {
      case 'Operations':
        return 1;
      case 'Employee and Workplace Environment':
        return 2;
      case 'Sustainability (Environmental Impact)':
        return 3;
      case 'Strategic Relationship Impact':
        return 4;
      case 'Other':
        return 5;
    }
  }
}