import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { EnergyEquipmentOperationsHelp } from 'src/app/shared/help-content/energy-equipment-help';

@Component({
  selector: 'app-energy-equipment-operations',
  standalone: false,
  
  templateUrl: './energy-equipment-operations.component.html',
  styleUrl: './energy-equipment-operations.component.css'
})
export class EnergyEquipmentOperationsComponent {
  @Input()
  inPortfolio: boolean;

  EnergyEquipmentOperationsHelp = EnergyEquipmentOperationsHelp;

  energyEquipmentGuid: string;

  describeOutputOfSystem: string;
  describeServicingNeeds: string;
  describeLaborRequirements: string;
  describeSystemMaterials: string;

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
      this.describeOutputOfSystem = energyEquipment.describeOutputOfSystem;
      this.describeServicingNeeds = energyEquipment.describeServicingNeeds;
      this.describeLaborRequirements = energyEquipment.describeLaborRequirements;
      this.describeSystemMaterials = energyEquipment.describeSystemMaterials;
    });
  }

  ngOnDestory(){
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async saveChanges() {
    let energyEquipment: IdbEnergyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
    energyEquipment.describeOutputOfSystem = this.describeOutputOfSystem;
    energyEquipment.describeServicingNeeds = this.describeServicingNeeds;
    energyEquipment.describeLaborRequirements = this.describeLaborRequirements;
    energyEquipment.describeSystemMaterials = this.describeSystemMaterials;
    await this.energyEquipmentIdbService.asyncUpdate(energyEquipment);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
