import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-process-equipment-sustainablity',
  standalone: false,

  templateUrl: './process-equipment-sustainablity.component.html',
  styleUrl: './process-equipment-sustainablity.component.css'
})
export class ProcessEquipmentSustainablityComponent {
  processEquipmentGuid: string;

  describeRefrigerantProcessDustEmissions: string;
  describeWasteStreams: string;
  describeWaterInputDischarge: string;
  describeRegulations: string;

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
      this.describeRefrigerantProcessDustEmissions = processEquipment.describeRefrigerantProcessDustEmissions;
      this.describeWasteStreams = processEquipment.describeWasteStreams;
      this.describeWaterInputDischarge = processEquipment.describeWaterInputDischarge;
      this.describeRegulations = processEquipment.describeRegulations;
    });
  }

  ngOnDestory() {
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async saveChanges() {
    let processEquipment: IdbProcessEquipment = this.processEquipmentIdbService.getByGuid(this.processEquipmentGuid);
    processEquipment.describeRefrigerantProcessDustEmissions = this.describeRefrigerantProcessDustEmissions;
    processEquipment.describeWasteStreams = this.describeWasteStreams;
    processEquipment.describeWaterInputDischarge = this.describeWaterInputDischarge;
    processEquipment.describeRegulations = this.describeRegulations;
    await this.processEquipmentIdbService.asyncUpdate(processEquipment);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
