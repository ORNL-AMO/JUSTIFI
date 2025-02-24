import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { EnergyEquipmentSustainabilityHelp } from 'src/app/shared/help-content/energy-equipment-help';

@Component({
  selector: 'app-energy-equipment-sustainability',
  standalone: false,

  templateUrl: './energy-equipment-sustainability.component.html',
  styleUrl: './energy-equipment-sustainability.component.css'
})
export class EnergyEquipmentSustainabilityComponent {
  @Input()
  inPortfolio: boolean;

  EnergyEquipmentSustainabilityHelp = EnergyEquipmentSustainabilityHelp;

  energyEquipmentGuid: string;
  describeWasteStreams: string;
  describeWaterInputDischarge: string;
  describeRefrigerantProcessDustEmissions: string;
  describeRegulations: string;

  collapseTackStock: boolean = true;
  collapseOperations: boolean = true;
  constructor(private activatedRoute: ActivatedRoute,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private setupWizardService: SetupWizardService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.energyEquipmentGuid = params['id'];
      let energyEquipment: IdbEnergyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
      this.describeWasteStreams = energyEquipment.describeWasteStreams;
      this.describeWaterInputDischarge = energyEquipment.describeWaterInputDischarge;
      this.describeRefrigerantProcessDustEmissions = energyEquipment.describeRefrigerantProcessDustEmissions;
      this.describeRegulations = energyEquipment.describeRegulations;
    });
  }

  ngOnDestory() {
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async saveChanges() {
    let energyEquipment: IdbEnergyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
    energyEquipment.describeWasteStreams = this.describeWasteStreams;
    energyEquipment.describeWaterInputDischarge = this.describeWaterInputDischarge;
    energyEquipment.describeRefrigerantProcessDustEmissions = this.describeRefrigerantProcessDustEmissions;
    energyEquipment.describeRegulations = this.describeRegulations;
    await this.energyEquipmentIdbService.asyncUpdate(energyEquipment);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
