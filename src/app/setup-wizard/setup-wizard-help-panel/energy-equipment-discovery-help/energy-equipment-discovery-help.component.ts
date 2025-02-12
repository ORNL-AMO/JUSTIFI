import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnergyEquipmentEmployeeEngagementHelp, EnergyEquipmentOperationsHelp, EnergyEquipmentSustainabilityHelp, EnergyEquipmentTakeStockHelp } from 'src/app/shared/help-content/energy-equipment-help';
import { SetupWizardService } from '../../setup-wizard.service';
import { faClipboardQuestion, faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-energy-equipment-discovery-help',
  standalone: false,

  templateUrl: './energy-equipment-discovery-help.component.html',
  styleUrl: './energy-equipment-discovery-help.component.css'
})
export class EnergyEquipmentDiscoveryHelpComponent {
  EnergyEquipmentTakeStockHelp = EnergyEquipmentTakeStockHelp;
  EnergyEquipmentOperationsHelp = EnergyEquipmentOperationsHelp;
  EnergyEquipmentSustainabilityHelp = EnergyEquipmentSustainabilityHelp;
  EnergyEquipmentEmployeeEngagementHelp = EnergyEquipmentEmployeeEngagementHelp;

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
    this.isTakeStock = ['howSupportPlant', 'adverseEffects', 'equipmentFinancialStatus', 'takeStock'].includes(this.focusedHelp);
  }

  setIsOperations() {
    this.isOperations = ['describeOutputOfSystem', 'describeServicingNeeds', 'describeLaborRequirements', 'describeSystemMaterials', 'operations'].includes(this.focusedHelp);
  }

  setIsSustainablity() {
    this.isSustainablity = ['describeRegulations', 'describeRefrigerantProcessDustEmissions', 'describeWaterInputDischarge', 'describeWasteStreams', 'sustainability'].includes(this.focusedHelp);
  }

  setIsEmployeeEngagement() {
    this.isEmployeeEngagement = ['describeSafetyConcerns', 'describeWorkplaceEnvironment', 'employeeEngagement'].includes(this.focusedHelp);
  }
}
