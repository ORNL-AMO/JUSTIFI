import { Component } from '@angular/core';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-energy-equipment-help',
    templateUrl: './energy-equipment-help.component.html',
    styleUrl: './energy-equipment-help.component.css',
    standalone: false
})
export class EnergyEquipmentHelpComponent {
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
