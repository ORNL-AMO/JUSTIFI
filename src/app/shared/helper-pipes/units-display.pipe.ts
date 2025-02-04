import { Pipe, PipeTransform } from '@angular/core';
import { ConvertValue } from '../conversions/convertValue';

@Pipe({
    name: 'unitsDisplay',
    standalone: false
})
export class UnitsDisplayPipe implements PipeTransform {

  transform(value: string, per?: string): any {
    if (value && value !== 'F' && value !== 'C' && value !== 'K') {
      let foundUnit = new ConvertValue().getUnit(value);
      if (foundUnit) {
        let dispUnit: string = foundUnit.name.display;
        dispUnit = dispUnit.replace('(', '');
        dispUnit = dispUnit.replace(')', '');
        if (per) {
          if (value === 'kWh' && per === 'hr') {
            dispUnit = 'kW';
          } else {
            dispUnit = dispUnit + '/' + per;
          }
        }
        return dispUnit;
      } else {
        return value;
      }
    } else if (value && (value === 'F' || value === 'C' || value === 'K')) {
      if (value === 'F') {
        return '&#8457;';
      } else if (value === 'C') {
        return '&#8451;';
      } else if (value === 'K') {
        return '&#8490;';
      }
    } else {
      return '';
    }
  }

}
