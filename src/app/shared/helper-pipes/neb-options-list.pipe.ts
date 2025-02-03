import { Pipe, PipeTransform } from '@angular/core';
import { KeyPerformanceMetricValue } from '../constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from '../constants/nonEnergyBenefitOptions';
import * as _ from 'lodash';

@Pipe({
    name: 'nebOptionsList',
    standalone: false
})
export class NebOptionsListPipe implements PipeTransform {

  transform(optionValue: KeyPerformanceMetricValue): Array<NebOption> {
    let nebOptionsList: Array<NebOption> = NebOptions;

    nebOptionsList = nebOptionsList.filter(nebOption => {
      return nebOption.KPM.includes(optionValue)
    });
    return _.orderBy(nebOptionsList, (kpm: NebOption) => {
      return kpm.label
    }, 'asc');
  }

}
