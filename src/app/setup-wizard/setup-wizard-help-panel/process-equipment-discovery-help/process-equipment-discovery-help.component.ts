import { Component } from '@angular/core';
import { faClipboardQuestion, faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { SetupWizardService } from '../../setup-wizard.service';
import { ProcessEquipmentEmployeeEngagementHelp, ProcessEquipmentOperationsHelp, ProcessEquipmentSustainabilityHelp, ProcessEquipmentTakeStockHelp } from 'src/app/shared/help-content/process-equipment-help';

@Component({
  selector: 'app-process-equipment-discovery-help',
  standalone: false,
  
  templateUrl: './process-equipment-discovery-help.component.html',
  styleUrl: './process-equipment-discovery-help.component.css'
})
export class ProcessEquipmentDiscoveryHelpComponent {
  ProcessEquipmentTakeStockHelp = ProcessEquipmentTakeStockHelp;
  ProcessEquipmentOperationsHelp = ProcessEquipmentOperationsHelp;
  ProcessEquipmentSustainabilityHelp = ProcessEquipmentSustainabilityHelp
  ProcessEquipmentEmployeeEngagementHelp = ProcessEquipmentEmployeeEngagementHelp;

  faExclamationCircle: IconDefinition = faExclamationCircle;
  faClipboardQuestion: IconDefinition = faClipboardQuestion;

  focusedHelp: string;
  focusedHelpSub: Subscription;

  isTakeStock: boolean;
  isOperations: boolean;
  isSustainablity: boolean;
  isEmployeeEngagement: boolean;
  constructor(private setupWizardService: SetupWizardService) { }

  ngOnInit() {
    this.focusedHelpSub = this.setupWizardService.focusedHelp.subscribe(focusedHelp => {
      this.focusedHelp = focusedHelp;
      this.setIsTakeStock()
      this.setIsOperations();
      this.setIsSustainablity();
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

  setIsSustainablity() {
    this.isSustainablity = ['describeRegulations', 'describeRefrigerantProcessDustEmissions', 'describeWaterInputDischarge', 'describeWasteStreams', 'sustainability'].includes(this.focusedHelp);
  }

  setIsEmployeeEngagement() {
    this.isEmployeeEngagement = ['describeSafetyConcerns', 'describeWorkplaceEnvironment', 'employeeEngagement'].includes(this.focusedHelp);
  }
}
