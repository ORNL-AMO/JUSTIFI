import { ChangeDetectorRef, Component } from '@angular/core';
import { faChevronDown, faChevronUp, faDatabase, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NebOption, NebOptions } from '../shared/constants/nonEnergyBenefitOptions';
import { KeyPerformanceIndicatorOption, KeyPerformanceIndicatorOptions, KeyPerformanceIndicatorValue } from '../shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetricOption, KeyPerformanceMetricOptions, KeyPerformanceMetricValue } from '../shared/constants/keyPerformanceMetrics';
import * as _ from 'lodash';

@Component({
  selector: 'app-nebs-database',
  templateUrl: './nebs-database.component.html',
  styleUrl: './nebs-database.component.css'
})
export class NebsDatabaseComponent {

  faDatabase: IconDefinition = faDatabase;
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
