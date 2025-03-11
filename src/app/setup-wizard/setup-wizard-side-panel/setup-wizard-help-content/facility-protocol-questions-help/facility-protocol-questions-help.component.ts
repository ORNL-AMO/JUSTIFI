import { Component } from '@angular/core';
import { faClipboardQuestion, faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { FacilityProtocolHelp } from 'src/app/shared/help-content/facility-protocol-help';

@Component({
  selector: 'app-facility-protocol-questions-help',
  standalone: false,

  templateUrl: './facility-protocol-questions-help.component.html',
  styleUrl: './facility-protocol-questions-help.component.css'
})
export class FacilityProtocolQuestionsHelpComponent {

  faClipboardQuestion: IconDefinition = faClipboardQuestion;
  FacilityProtocolHelp = FacilityProtocolHelp;
  faExclamationCircle: IconDefinition = faExclamationCircle;
  focusedHelp: string;
  focusedHelpSub: Subscription;
  constructor(private setupWizardService: SetupWizardService) { }

  ngOnInit() {
    this.focusedHelpSub = this.setupWizardService.focusedHelp.subscribe(focusedHelp => {
      this.focusedHelp = focusedHelp;
    });
  }

  ngOnDestroy() {
    this.focusedHelpSub.unsubscribe();
  }
}
