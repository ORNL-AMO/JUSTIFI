import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
  displayModal: boolean = false;

  keyPerformanceMetricOptions: Array<KeyPerformanceMetric>;
  addMetricValues: Array<KeyPerformanceMetricValue> = [];
  constructor(private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    let currentTrackedMetrics: Array<KeyPerformanceMetricValue> = this.keyPerformanceIndicator.performanceMetrics.flatMap(metric => {
      return metric.value;
    })

    this.keyPerformanceMetricOptions = new Array();

    let tmpKeyPerformanceMetricOptions: Array<KeyPerformanceMetric> = getPerformanceMetrics(this.keyPerformanceIndicator.optionValue, this.keyPerformanceIndicator.guid)
    tmpKeyPerformanceMetricOptions.forEach(option => {
      if (currentTrackedMetrics.includes(option.value) == false) {
        this.keyPerformanceMetricOptions.push(option);
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
