import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceMetric } from '../constants/keyPerformanceMetrics';

@Pipe({
  name: 'kpmLabel'
})
export class KpmLabelPipe implements PipeTransform {

  transform(guid: string, keyPerformanceMetrics: Array<KeyPerformanceMetric>): string {
    let kpm: KeyPerformanceMetric = keyPerformanceMetrics.find(kpm => {
      return kpm.guid == guid
    });
    if (kpm) {
      return kpm.htmlLabel;
    }
    return '';
  }

}
