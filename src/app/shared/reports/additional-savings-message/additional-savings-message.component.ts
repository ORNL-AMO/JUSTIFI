import { Component, Input } from '@angular/core';
import { AssessmentReport } from '../calculations/assessmentReport';
import { OnSiteVisitReport } from '../calculations/visitReport';
import { faExclamationCircle, faMoneyBillWave, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-additional-savings-message',
  standalone: false,
  
  templateUrl: './additional-savings-message.component.html',
  styleUrl: './additional-savings-message.component.css'
})
export class AdditionalSavingsMessageComponent {
  @Input()
  assessmentReport: AssessmentReport;
  @Input()
  onSiteVisitReport: OnSiteVisitReport;
  @Input({required: true})
  context: 'onSiteVisit' | 'assessment';

  faExclamationCircle: IconDefinition = faExclamationCircle;
  faMoneyBillWave: IconDefinition = faMoneyBillWave;
  
}
