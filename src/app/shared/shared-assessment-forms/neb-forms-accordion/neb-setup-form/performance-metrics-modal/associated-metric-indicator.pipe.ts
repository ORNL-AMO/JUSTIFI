import { Pipe, PipeTransform } from '@angular/core';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric, KeyPerformanceMetricOption } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';

@Pipe({
  name: 'associatedMetricIndicator'
})
export class AssociatedMetricIndicatorPipe implements PipeTransform {

  transform(nonEnergyBenefit: IdbNonEnergyBenefit, performanceMetric: KeyPerformanceMetricOption): boolean {
    let nebOption: NebOption = NebOptions.find(option => {
      return option.optionValue == nonEnergyBenefit.nebOptionValue;
    });
    if (nebOption) {
      return nebOption.KPM.includes(performanceMetric.value);
    }
    return false;
  }

}
