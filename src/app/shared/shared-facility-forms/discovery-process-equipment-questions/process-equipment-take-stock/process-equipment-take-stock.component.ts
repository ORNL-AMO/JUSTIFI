import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCaretRight, faCirclePlus, faCircleQuestion, faPersonCircleQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ProcessEquipmentTakeStockHelp } from 'src/app/shared/help-content/process-equipment-help';

@Component({
  selector: 'app-process-equipment-take-stock',
  standalone: false,

  templateUrl: './process-equipment-take-stock.component.html',
  styleUrl: './process-equipment-take-stock.component.css'
})
export class ProcessEquipmentTakeStockComponent {
  @Input()
  inPortfolio: boolean;

  ProcessEquipmentTakeStockHelp = ProcessEquipmentTakeStockHelp;
  faCaretRight: IconDefinition = faCaretRight;

  processEquipmentGuid: string;

  whatIsTheOutput: string;
  howDoesTheProcessWork: string;
  financialStatusOfEquipment: string;
  financialMetricsUsed: string;

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
      this.financialMetricsUsed = processEquipment.financialMetricsUsed;
    });
  }

  ngOnDestroy() {
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async saveChanges() {
    let processEquipment: IdbProcessEquipment = this.processEquipmentIdbService.getByGuid(this.processEquipmentGuid);
    processEquipment.whatIsTheOutput = this.whatIsTheOutput;
    processEquipment.howDoesTheProcessWork = this.howDoesTheProcessWork;
    processEquipment.financialStatusOfEquipment = this.financialStatusOfEquipment;
    processEquipment.financialMetricsUsed = this.financialMetricsUsed;
    await this.processEquipmentIdbService.asyncUpdate(processEquipment);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
