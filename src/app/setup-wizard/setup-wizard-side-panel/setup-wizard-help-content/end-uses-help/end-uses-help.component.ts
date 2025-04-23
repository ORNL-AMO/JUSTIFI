import { Component } from '@angular/core';
import { faClipboardQuestion, faExclamationCircle, faLink, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ProcessEquipmentEmployeeEngagementHelp, ProcessEquipmentOperationsHelp, ProcessEquipmentSustainabilityHelp, ProcessEquipmentTakeStockHelp } from 'src/app/shared/help-content/process-equipment-help';

@Component({
    selector: 'app-end-uses-help',
    templateUrl: './end-uses-help.component.html',
    styleUrl: './end-uses-help.component.css',
    standalone: false
})
export class EndUsesHelpComponent {
 ProcessEquipmentTakeStockHelp = ProcessEquipmentTakeStockHelp;
  ProcessEquipmentOperationsHelp = ProcessEquipmentOperationsHelp;
  ProcessEquipmentSustainabilityHelp = ProcessEquipmentSustainabilityHelp
  ProcessEquipmentEmployeeEngagementHelp = ProcessEquipmentEmployeeEngagementHelp;

  faExclamationCircle: IconDefinition = faExclamationCircle;
  faClipboardQuestion: IconDefinition = faClipboardQuestion;
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
    this.isTakeStock = ['whatIsTheOutput', 'howDoesTheProcessWork', 'financialStatusOfEquipment', 'takeStock'].includes(this.focusedHelp);
  }

  setIsOperations() {
    this.isOperations = ['describeOutputRate', 'describeOutputQualityMeasurement', 'describeMaintenanceNeeds', 'describeLaborRequirements', 'describeRequiredMaterials', 'operations'].includes(this.focusedHelp);
  }

  setIsSustainability() {
    this.isSustainability = ['describeRegulations', 'describeRefrigerantProcessDustEmissions', 'describeWaterInputDischarge', 'describeWasteStreams', 'sustainability'].includes(this.focusedHelp);
  }

  setIsEmployeeEngagement() {
    this.isEmployeeEngagement = ['describeSafetyConcerns', 'describeWorkplaceEnvironment', 'employeeEngagement'].includes(this.focusedHelp);
  }
}
