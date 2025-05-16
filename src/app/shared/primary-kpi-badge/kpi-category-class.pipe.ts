import { Pipe, PipeTransform } from '@angular/core';
import { PrimaryKPI } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';

@Pipe({
    name: 'kpiCategoryClass',
    standalone: false
})
export class KpiCategoryClassPipe implements PipeTransform {

  transform(category: PrimaryKPI): string {
    return getCategoryColor(category);
  }
}

export function getCategoryColor(category: PrimaryKPI): string {
  if (category == 'Strategic Growth') {
    return '#8E44AD';
  } else if (category == 'Resource Efficiency') {
    return '#138D75';
  } else if (category == 'Operations Impact') {
    return '#D35400';
  } else if (category == 'Employee Environment') {
    return '#2C3E50';
  } else if (category == 'Other') {
    return '#0027FF';
  }
  return null;
}