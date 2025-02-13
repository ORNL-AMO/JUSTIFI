import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';

@Component({
  selector: 'app-process-equipment-take-stock',
  standalone: false,

  templateUrl: './process-equipment-take-stock.component.html',
  styleUrl: './process-equipment-take-stock.component.css'
})
export class ProcessEquipmentTakeStockComponent {

  processEquipmentGuid: string;

  whatIsTheOutput: string;
  howDoesTheProcessWork: string;
  financialStatusOfEquipment: string;

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
      this.whatIsTheOutput = processEquipment.whatIsTheOutput;
      this.howDoesTheProcessWork = processEquipment.howDoesTheProcessWork;
      this.financialStatusOfEquipment = processEquipment.financialStatusOfEquipment;
    });
  }

  ngOnDestory() {
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async saveChanges() {
    let processEquipment: IdbProcessEquipment = this.processEquipmentIdbService.getByGuid(this.processEquipmentGuid);
    processEquipment.whatIsTheOutput = this.whatIsTheOutput;
    processEquipment.howDoesTheProcessWork = this.howDoesTheProcessWork;
    processEquipment.financialStatusOfEquipment = this.financialStatusOfEquipment;
    await this.processEquipmentIdbService.asyncUpdate(processEquipment);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
