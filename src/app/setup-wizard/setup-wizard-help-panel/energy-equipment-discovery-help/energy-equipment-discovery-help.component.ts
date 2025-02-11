import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnergyEquipmentOperationsHelp, EnergyEquipmentTakeStockHelp } from 'src/app/shared/help-content/energy-equipment-help';
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
  faExclamationCircle: IconDefinition = faExclamationCircle;
  faClipboardQuestion: IconDefinition = faClipboardQuestion;

  focusedHelp: string;
  focusedHelpSub: Subscription;

  isTakeStock: boolean;
  isOperations: boolean;
  constructor(private setupWizardService: SetupWizardService) { }

  ngOnInit() {
    this.focusedHelpSub = this.setupWizardService.focusedHelp.subscribe(focusedHelp => {
      this.focusedHelp = focusedHelp;
      this.setIsTakeStock()
      this.setIsOperations();
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
}
