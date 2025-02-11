import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SetupWizardService } from '../../setup-wizard.service';
import { faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-facility-setup-help',
    templateUrl: './facility-setup-help.component.html',
    styleUrl: './facility-setup-help.component.css',
    standalone: false
})
export class FacilitySetupHelpComponent {

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
