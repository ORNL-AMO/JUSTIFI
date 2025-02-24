import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySymbol',
  pure: false,
  standalone: false
})
export class CurrencySymbolPipe implements PipeTransform {
  
  constructor(
    private currencyPipe: CurrencyPipe
  ) {}

  transform(currencyCode: string): string {
    return this.currencyPipe
      .transform(0, currencyCode, 'symbol', '1.0-0')
      .replace(/[0-9\.\,]/g, '')
      .trim();
  }

}
