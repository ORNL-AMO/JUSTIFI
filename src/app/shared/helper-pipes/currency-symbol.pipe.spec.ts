import { CurrencyPipe } from '@angular/common';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { TestBed } from '@angular/core/testing';

describe('CurrencySymbolPipe', () => {
  let currencyPipe: CurrencyPipe;
  let currencySymbolPipe: CurrencySymbolPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyPipe]
    });
    currencyPipe = TestBed.inject(CurrencyPipe);
    currencySymbolPipe = new CurrencySymbolPipe(currencyPipe);
  });

  it('create an instance', () => {
    expect(currencySymbolPipe).toBeTruthy();
  });
});
