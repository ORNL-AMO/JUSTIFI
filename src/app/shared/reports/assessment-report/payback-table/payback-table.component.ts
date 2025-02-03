import { Component, Input } from '@angular/core';
import { AssessmentReport } from '../../calculations/assessmentReport';

@Component({
    selector: 'app-payback-table',
    templateUrl: './payback-table.component.html',
    styleUrl: './payback-table.component.css',
    standalone: false
})
export class PaybackTableComponent {
  @Input({required: true})
  assessmentReport: AssessmentReport;

}
