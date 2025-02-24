import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { EnergyEquipmentEmployeeEngagementHelp } from 'src/app/shared/help-content/energy-equipment-help';

@Component({
  selector: 'app-energy-equipment-employee-engagement',
  standalone: false,
  
  templateUrl: './energy-equipment-employee-engagement.component.html',
  styleUrl: './energy-equipment-employee-engagement.component.css'
})
export class EnergyEquipmentEmployeeEngagementComponent {
  @Input()
  inPortfolio: boolean;

  EnergyEquipmentEmployeeEngagementHelp = EnergyEquipmentEmployeeEngagementHelp;

  energyEquipmentGuid: string;
  describeSafetyConcerns: string;
  describeWorkplaceEnvironment: string;

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
      this.describeSafetyConcerns = energyEquipment.describeSafetyConcerns;
      this.describeWorkplaceEnvironment = energyEquipment.describeWorkplaceEnvironment;
    });
  }

  ngOnDestory() {
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async saveChanges() {
    let energyEquipment: IdbEnergyEquipment = this.energyEquipmentIdbService.getByGuid(this.energyEquipmentGuid);
    energyEquipment.describeSafetyConcerns = this.describeSafetyConcerns;
    energyEquipment.describeWorkplaceEnvironment = this.describeWorkplaceEnvironment;
    await this.energyEquipmentIdbService.asyncUpdate(energyEquipment);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
