import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
// import { EnergyEquipmentTakeStockHelp } from 'src/app/shared/help-content/energy-equipment-help';

@Component({
  selector: 'app-energy-equipment-take-stock',
  standalone: false,

  templateUrl: './energy-equipment-take-stock.component.html',
  styleUrl: './energy-equipment-take-stock.component.css'
})
export class EnergyEquipmentTakeStockComponent {
  // EnergyEquipmentTakeStockHelp = EnergyEquipmentTakeStockHelp;

  energyEquipmentGuid: string;

  howSupportPlant: string;
  adverseEffects: string;
  equipmentFinancialStatus: string;

  constructor(private activatedRoute: ActivatedRoute,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private setupWizardService: SetupWizardService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.energyEquipmentGuid = params['id'];
      let energyEquipment: IdbEnergyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
      this.howSupportPlant = energyEquipment.howSupportPlant;
      this.adverseEffects = energyEquipment.adverseEffects;
      this.equipmentFinancialStatus = energyEquipment.equipmentFinancialStatus;
    });
  }

  ngOnDestory() {
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async saveChanges() {
    let energyEquipment: IdbEnergyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
    energyEquipment.howSupportPlant = this.howSupportPlant;
    energyEquipment.adverseEffects = this.adverseEffects;
    energyEquipment.equipmentFinancialStatus = this.equipmentFinancialStatus;
    await this.energyEquipmentIdbService.asyncUpdate(energyEquipment);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
