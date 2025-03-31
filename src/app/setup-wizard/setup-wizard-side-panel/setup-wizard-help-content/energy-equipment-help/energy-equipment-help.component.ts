import { Component } from '@angular/core';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { Subscription } from 'rxjs';
import { EnergyEquipmentTakeStockHelp } from 'src/app/shared/help-content/energy-equipment-help';
import { faClipboardQuestion, faExclamationCircle, faLink, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-energy-equipment-help',
    templateUrl: './energy-equipment-help.component.html',
    styleUrl: './energy-equipment-help.component.css',
    standalone: false
})
export class EnergyEquipmentHelpComponent {
    EnergyEquipmentTakeStockHelp = EnergyEquipmentTakeStockHelp;
    faClipboardQuestion: IconDefinition = faClipboardQuestion;
    faExclamationCircle: IconDefinition = faExclamationCircle;
    faLink: IconDefinition = faLink;
    focusedHelp: string;
    focusedHelpSub: Subscription;
    isTakeStock: boolean;
    isOperations: boolean;
    isSustainability: boolean;
    isEmployeeEngagement: boolean;
    constructor(private setupWizardService: SetupWizardService) { }

    ngOnInit() {
        this.focusedHelpSub = this.setupWizardService.focusedHelp.subscribe(focusedHelp => {
            this.focusedHelp = focusedHelp;
            this.setIsTakeStock()
            this.setIsOperations();
            this.setIsSustainability();
            this.setIsEmployeeEngagement();
        });
    }

    ngOnDestroy() {
        this.focusedHelpSub.unsubscribe();
    }

    setIsTakeStock() {
        this.isTakeStock = ['howSupportPlant', 'adverseEffects', 'equipmentFinancialStatus', 'takeStock'].includes(this.focusedHelp);
    }

    setIsOperations() {
        this.isOperations = ['describeOutputOfSystem', 'describeServicingNeeds', 'describeLaborRequirements', 'describeSystemMaterials', 'operations'].includes(this.focusedHelp);
    }

    setIsSustainability() {
        this.isSustainability = ['describeRegulations', 'describeRefrigerantProcessDustEmissions', 'describeWaterInputDischarge', 'describeWasteStreams', 'sustainability'].includes(this.focusedHelp);
    }

    setIsEmployeeEngagement() {
        this.isEmployeeEngagement = ['describeSafetyConcerns', 'describeWorkplaceEnvironment', 'employeeEngagement'].includes(this.focusedHelp);
    }
}
