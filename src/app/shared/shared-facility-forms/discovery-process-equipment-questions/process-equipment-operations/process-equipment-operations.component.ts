import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ProcessEquipmentOperationsHelp } from 'src/app/shared/help-content/process-equipment-help';

@Component({
  selector: 'app-process-equipment-operations',
  standalone: false,

  templateUrl: './process-equipment-operations.component.html',
  styleUrl: './process-equipment-operations.component.css'
})
export class ProcessEquipmentOperationsComponent {
  @Input()
  inPortfolio: boolean;

  ProcessEquipmentOperationsHelp = ProcessEquipmentOperationsHelp;

  processEquipmentGuid: string;

  describeOutputRate: string;
  describeOutputQualityMeasurement: string;
  describeMaintenanceNeeds: string;
  describeLaborRequirements: string;
  describeRequiredMaterials: string;

  collapseTackStock: boolean = true;
  collapseOperations: boolean = true;
  constructor(private activatedRoute: ActivatedRoute,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private setupWizardService: SetupWizardService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.processEquipmentGuid = params['id'];
      let processEquipment: IdbProcessEquipment = this.processEquipmentIdbService.getByGuid(this.processEquipmentGuid);
      this.describeOutputRate = processEquipment.describeOutputRate;
      this.describeOutputQualityMeasurement = processEquipment.describeOutputQualityMeasurement;
      this.describeMaintenanceNeeds = processEquipment.describeMaintenanceNeeds;
      this.describeLaborRequirements = processEquipment.describeLaborRequirements;
      this.describeRequiredMaterials = processEquipment.describeRequiredMaterials;
    });
  }

  ngOnDestory() {
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async saveChanges() {
    let processEquipment: IdbProcessEquipment = this.processEquipmentIdbService.getByGuid(this.processEquipmentGuid);
    processEquipment.describeOutputRate = this.describeOutputRate;
    processEquipment.describeOutputQualityMeasurement = this.describeOutputQualityMeasurement;
    processEquipment.describeMaintenanceNeeds = this.describeMaintenanceNeeds;
    processEquipment.describeLaborRequirements = this.describeLaborRequirements;
    processEquipment.describeRequiredMaterials = this.describeRequiredMaterials;
    await this.processEquipmentIdbService.asyncUpdate(processEquipment);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
