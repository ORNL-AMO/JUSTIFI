import { Component, Input } from '@angular/core';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from '../constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';

@Component({
    selector: 'app-primary-kpi-badge',
    templateUrl: './primary-kpi-badge.component.html',
    styleUrl: './primary-kpi-badge.component.css',
    standalone: false
})
export class PrimaryKpiBadgeComponent {
  @Input()
  kpiValue: KeyPerformanceIndicatorValue;
  @Input()
  kpiOption: KeyPerformanceIndicatorOption;
  @Input()
  facilityId: string
  @Input()
  fullWidth: boolean;

  constructor(private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService) {
  }

  ngOnInit() {
    if (!this.kpiOption && this.kpiValue != 'other') {
      this.kpiOption = KeyPerformanceIndicatorOptions.find(option => {
        return option.optionValue == this.kpiValue;
      });
    } else if (this.kpiValue == 'other' && this.facilityId) {
      this.kpiOption = this.keyPerformanceIndicatorIdbService.getKpiFromKpm(this.facilityId, this.kpiValue);
    }
  }
}
