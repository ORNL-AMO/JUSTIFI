import { ChangeDetectorRef, Component } from '@angular/core';
import { faChevronDown, faChevronUp, faDatabase, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as _ from 'lodash';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from 'src/app/shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetricOption, KeyPerformanceMetricOptions, KeyPerformanceMetricValue } from 'src/app/shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from 'src/app/shared/constants/nonEnergyBenefitOptions';

@Component({
  selector: 'app-nebs-database-table',
  templateUrl: './nebs-database-table.component.html',
  styleUrl: './nebs-database-table.component.css'
})
export class NebsDatabaseTableComponent {
  faChevronUp: IconDefinition = faChevronUp;
  faChevronDown: IconDefinition = faChevronDown;

  nebOptions: Array<NebOption> = NebOptions;

  orderByDir: 'asc' | 'desc' = 'asc';

  kpiValue: KeyPerformanceIndicatorValue;
  kpmValue: KeyPerformanceMetricValue;
  keyPerformanceIndicatorOptions: Array<KeyPerformanceIndicatorOption> = KeyPerformanceIndicatorOptions;
  keyPerformanceMetricOptions: Array<KeyPerformanceMetricOption> = [];

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.keyPerformanceIndicatorOptions = _.orderBy(KeyPerformanceIndicatorOptions, (option: KeyPerformanceIndicatorOption) => {
      return option.label;
    }, 'asc')
  }

  setKpmOptions() {
    this.keyPerformanceMetricOptions = KeyPerformanceMetricOptions.filter(option => {
      return option.kpiValue == this.kpiValue;
    });
    this.keyPerformanceMetricOptions = _.orderBy(this.keyPerformanceMetricOptions, (option: KeyPerformanceMetricOption) => {
      return option.label;
    }, 'asc')
    this.kpmValue = undefined;
    this.cd.detectChanges();
  }

  toggleOrderBy() {
    if (this.orderByDir == 'asc') {
      this.orderByDir = 'desc';
    } else {
      this.orderByDir = 'asc';
    }
  }
}
