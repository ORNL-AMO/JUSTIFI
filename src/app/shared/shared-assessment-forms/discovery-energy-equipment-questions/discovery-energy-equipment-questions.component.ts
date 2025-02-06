import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';

@Component({
  selector: 'app-discovery-energy-equipment-questions',
  standalone: false,

  templateUrl: './discovery-energy-equipment-questions.component.html',
  styleUrl: './discovery-energy-equipment-questions.component.css'
})
export class DiscoveryEnergyEquipmentQuestionsComponent {

  energyEquipmentGuid: string;
  energyEquipment: IdbEnergyEquipment

  howSupportPlant: string;
  adverseEffects: string;
  equipmentFinancialStatus: string;
  constructor(private activatedRoute: ActivatedRoute,
    private energyEquipmentIdbService: EnergyEquipmentIdbService
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

  async saveChanges() {
    let energyEquipment: IdbEnergyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
    energyEquipment.howSupportPlant = this.howSupportPlant;
    energyEquipment.adverseEffects = this.adverseEffects;
    energyEquipment.equipmentFinancialStatus = this.equipmentFinancialStatus;
    await this.energyEquipmentIdbService.asyncUpdate(energyEquipment);
  }

  focusField(str: string) {

  }
}
