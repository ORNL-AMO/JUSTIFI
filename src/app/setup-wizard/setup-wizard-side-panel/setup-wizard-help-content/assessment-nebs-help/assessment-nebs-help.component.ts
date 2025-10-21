import { Component } from '@angular/core';
import { Icon } from '@fortawesome/fontawesome-svg-core';
import { faAsterisk, faPlus, faSearchPlus, IconDefinition, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
    selector: 'app-assessment-nebs-help',
    templateUrl: './assessment-nebs-help.component.html',
    styleUrl: './assessment-nebs-help.component.css',
    standalone: false
})
export class AssessmentNebsHelpComponent {

  faPlus: IconDefinition = faPlus;
  faSearchPlus: IconDefinition = faSearchPlus;
  faAsterisk: IconDefinition = faAsterisk;
  faExclamationCircle: IconDefinition = faExclamationCircle;
  focusedHelp: string;
  focusedHelpSub: Subscription;
  constructor(private setupWizardService: SetupWizardService) {}

  ngOnInit() {
    this.focusedHelpSub = this.setupWizardService.focusedHelp.subscribe(focusedHelp => {
      this.focusedHelp = focusedHelp;
    });
  }

  ngOnDestroy() {
    this.focusedHelpSub.unsubscribe();
  }
}
