import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faLinkSlash, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { getPerformanceMetrics, KeyPerformanceMetric, KeyPerformanceMetricValue } from 'src/app/shared/constants/keyPerformanceMetrics';

@Component({
  selector: 'app-kpm-database-modal',
  templateUrl: './kpm-database-modal.component.html',
  styleUrl: './kpm-database-modal.component.css',
  standalone: false
})
export class KpmDatabaseModalComponent {
  @Output('emitClose')
  emitClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input({ required: true })
  keyPerformanceIndicator: IdbKeyPerformanceIndicator;
  @Output()
  emitAddMetrics: EventEmitter<Array<KeyPerformanceMetric>> = new EventEmitter<Array<KeyPerformanceMetric>>();

  faPlus: IconDefinition = faPlus;
  faCheck: IconDefinition = faCheck;
  faLinkSlash: IconDefinition = faLinkSlash;
  displayModal: boolean = false;

  keyPerformanceMetricOptions: Array<KeyPerformanceMetric>;
  addMetricValues: Array<KeyPerformanceMetricValue> = [];
  usedPerformanceMetrics: Array<KeyPerformanceMetric> = [];
  constructor(private cd: ChangeDetectorRef,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService
  ) {

  }

  ngOnInit() {
    let currentTrackedMetrics: Array<KeyPerformanceMetricValue> = this.keyPerformanceIndicator.performanceMetrics.flatMap(metric => {
      return metric.value;
    })

    this.keyPerformanceMetricOptions = new Array();

    let allPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.keyPerformanceIndicator.facilityId);
    let usedKpmValues: Array<KeyPerformanceMetricValue> = allPerformanceMetrics.map(metric => {
      return metric.value
    });

    let tmpKeyPerformanceMetricOptions: Array<KeyPerformanceMetric> = getPerformanceMetrics(this.keyPerformanceIndicator.optionValue, this.keyPerformanceIndicator.guid)
    tmpKeyPerformanceMetricOptions.forEach(option => {
      if (usedKpmValues.includes(option.value) == false) {
        if (currentTrackedMetrics.includes(option.value) == false) {
          this.keyPerformanceMetricOptions.push(option);
        }
      } else {
        this.usedPerformanceMetrics.push(option);
      }
    });
  }

  ngAfterViewInit() {
    this.displayModal = true;
    this.cd.detectChanges();
  }

  closeModal() {
    this.displayModal = false;
    this.emitClose.emit(true);
  }

  toggleMetric(keyPerformanceMetric: KeyPerformanceMetric) {
    if (this.addMetricValues.includes(keyPerformanceMetric.value)) {
      this.addMetricValues = this.addMetricValues.filter(value => {
        return value != keyPerformanceMetric.value
      });
    } else {
      this.addMetricValues.push(keyPerformanceMetric.value);
    }
  }

  addMetrics() {
    let metricsToAdd: Array<KeyPerformanceMetric> = this.keyPerformanceMetricOptions.filter(option => {
      return this.addMetricValues.includes(option.value)
    })
    this.emitAddMetrics.emit(metricsToAdd);
    this.closeModal();
  }
}
