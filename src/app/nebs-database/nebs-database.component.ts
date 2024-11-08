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

}
