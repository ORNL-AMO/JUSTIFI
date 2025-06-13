import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceMetric, KeyPerformanceMetricOption, KpmKeywords } from 'src/app/shared/constants/keyPerformanceMetrics';
import * as _ from 'lodash';

@Pipe({
    name: 'metricOptionsModalList',
    standalone: false
})
export class MetricOptionsModalListPipe implements PipeTransform {

  transform(options: Array<KeyPerformanceMetric>, searchStr: string, orderByDir: 'asc' | 'desc'): Array<KeyPerformanceMetric> {
    let filteredOptions: Array<KeyPerformanceMetric> = options;
    if (searchStr) {
      const search = searchStr.toLowerCase().trim();
      let labelOptions = filteredOptions.filter(option => {
        return option.label.toLowerCase().includes(search);
      });
      let keywordOptions = filteredOptions.filter(option => {
         const keywords = KpmKeywords[option.value] || [];
         return keywords.includes(search);
      });
      filteredOptions = _.union(labelOptions, keywordOptions);
    }
    return _.orderBy(filteredOptions, (option: KeyPerformanceMetric) => {
      return option.label;
    }, orderByDir);
  }
}
