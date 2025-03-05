import { Component } from '@angular/core';
import { faClipboardQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FacilityProtocolHelp } from 'src/app/shared/help-content/facility-protocol-help';

@Component({
  selector: 'app-facility-dashboard-protocol-questions',
  standalone: false,
  
  templateUrl: './facility-dashboard-protocol-questions.component.html',
  styleUrl: './facility-dashboard-protocol-questions.component.css'
})
export class FacilityDashboardProtocolQuestionsComponent {
  faClipboardQuestion: IconDefinition = faClipboardQuestion;
  FacilityProtocolHelp = FacilityProtocolHelp;
}
