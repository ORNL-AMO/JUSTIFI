import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KeyPerformanceMetric } from '../constants/keyPerformanceMetrics';

@Component({
    selector: 'app-kpm-details-form',
    templateUrl: './kpm-details-form.component.html',
    styleUrl: './kpm-details-form.component.css',
    standalone: false
})
export class KpmDetailsFormComponent {
  @Input({ required: true })
  keyPerformanceMetric: KeyPerformanceMetric;
  @Input()
  disableForm: boolean;
  @Output('emitSave')
  emitSave: EventEmitter<boolean> = new EventEmitter();
  @Output('emitCalculate')
  emitCalculate: EventEmitter<{modifiedMethod: boolean, updateBaseline: boolean}> = new EventEmitter();
  @Input({required: true})
  context: 'preVisit' | 'onSite';


  saveChanges() {
    this.emitSave.emit(true);
  }

  calculateCost(modifiedMethod: boolean) {
    if (this.keyPerformanceMetric.calculationMethod == 'costPerUnit') {
      this.keyPerformanceMetric.baselineCost = (this.keyPerformanceMetric.costPerValue * this.keyPerformanceMetric.baselineValue);
    }
    this.emitCalculate.emit({modifiedMethod: modifiedMethod, updateBaseline: true});
    // if (this.context == 'onSite') {
    //   this.saveChanges();
    // }
  }
}
