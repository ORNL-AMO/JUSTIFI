import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocaleService } from '../../shared-services/locale.service';

@Component({
    selector: 'app-single-cell-item',
    templateUrl: './single-cell-item.component.html',
    styleUrl: './single-cell-item.component.css',
    standalone: false
})
export class SingleCellItemComponent {
  @Input()
  strValue: string;
  @Input()
  numValue: number;
  @Input()
  units: string;
  @Input()
  per: string;
  @Input()
  isCurrency: boolean;
  @Input()
  numValueDigits: string = '1.0-2';
  
  currencyCode: string;
  currencySub: Subscription;
  
  constructor(
    private localeService: LocaleService,
  ) {}

  ngOnInit() {
    if (this.isCurrency) {
      this.currencySub = this.localeService.currencyCode.subscribe(code => {
        this.currencyCode = code;
      });
    }
  }

  ngOnDestroy() {
    if (this.currencySub) {
      this.currencySub.unsubscribe();
    }
  }
}
