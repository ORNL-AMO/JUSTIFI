import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { localeCurrency } from '../constants/localeCurrency';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  currencyCode: BehaviorSubject<string>;

  constructor() {
    this.currencyCode = new BehaviorSubject<string>('USD');
  }

  setCurrencyCode(locale: string) {
    const currencyOption = localeCurrency.find(option => option.locale === locale);
    const code = currencyOption ? currencyOption.currencyCode : 'USD';
    this.currencyCode.next(code);
  }

  getCurrencyCode(): string {
    return this.currencyCode.getValue();
  }
  
}
