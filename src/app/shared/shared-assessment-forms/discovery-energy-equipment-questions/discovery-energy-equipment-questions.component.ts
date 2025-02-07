import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { BootstrapService } from '../../shared-services/bootstrap.service';
import { faClipboardQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-discovery-energy-equipment-questions',
  standalone: false,

  templateUrl: './discovery-energy-equipment-questions.component.html',
  styleUrl: './discovery-energy-equipment-questions.component.css'
})
export class DiscoveryEnergyEquipmentQuestionsComponent {

  faClipboardQuestion: IconDefinition = faClipboardQuestion;

  energyEquipmentGuid: string;
  energyEquipment: IdbEnergyEquipment

  howSupportPlant: string;
  adverseEffects: string;
  equipmentFinancialStatus: string;
  describeOutputOfSystem: string;
  describeServicingNeeds: string;
  describeLaborRequirements: string;
  describeSystemMaterials: string;

  collapseTackStock: boolean = true;
  collapseOperations: boolean = false;
  constructor(private activatedRoute: ActivatedRoute,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private bootstrapService: BootstrapService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.energyEquipmentGuid = params['id'];
      let energyEquipment: IdbEnergyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
      this.howSupportPlant = energyEquipment.howSupportPlant;
      this.adverseEffects = energyEquipment.adverseEffects;
      this.equipmentFinancialStatus = energyEquipment.equipmentFinancialStatus;
      this.describeOutputOfSystem = energyEquipment.describeOutputOfSystem;
      this.describeServicingNeeds = energyEquipment.describeServicingNeeds;
      this.describeLaborRequirements = energyEquipment.describeLaborRequirements;
      this.describeSystemMaterials = energyEquipment.describeSystemMaterials;
    });
  }

  async saveChanges() {
    let energyEquipment: IdbEnergyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
    energyEquipment.howSupportPlant = this.howSupportPlant;
    energyEquipment.adverseEffects = this.adverseEffects;
    energyEquipment.equipmentFinancialStatus = this.equipmentFinancialStatus;
    energyEquipment.describeOutputOfSystem = this.describeOutputOfSystem;
    energyEquipment.describeServicingNeeds = this.describeServicingNeeds;
    energyEquipment.describeLaborRequirements = this.describeLaborRequirements;
    energyEquipment.describeSystemMaterials = this.describeSystemMaterials;
    await this.energyEquipmentIdbService.asyncUpdate(energyEquipment);
  }

  focusField(str: string) {

  }

  toggleBS(collapseId: 'takeStock' | 'operations') {
    this.bootstrapService.bsCollapse('#' + collapseId);
    if (collapseId == 'takeStock') {
      this.collapseTackStock = !this.collapseTackStock;
    } else if (collapseId == 'operations') {
      this.collapseOperations = !this.collapseOperations;
    }
  }
}
