import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayRoundedValues',
  pure: false,
  standalone: false
})
export class DisplayRoundedValuesPipe implements PipeTransform {

  transform(value: number, isCurrency: boolean): number {
    if (isCurrency) {
      if (value >= 1000) {
        return Number(value.toFixed(0));
      }
      else if (value < 1000) {
        return Number(value.toFixed(2));
      }
      else {
        return value;
      }
    }
    else {
      if(value < 10) {
        return Number(value.toFixed(3));
      }
      else if (value >= 10 && value < 100) {
        return Number(value.toFixed(2));
      }
      else if (value >= 100 && value < 1000) {
        return Number(value.toFixed(1));
      }
      else if (value >= 1000) {
        return Number(value.toFixed(0));
      }
      else {
        return value;
      }
    }
  }
}
