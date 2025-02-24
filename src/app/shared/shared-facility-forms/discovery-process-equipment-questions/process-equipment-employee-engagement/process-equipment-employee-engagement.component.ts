import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { ProcessEquipmentEmployeeEngagementHelp } from 'src/app/shared/help-content/process-equipment-help';

@Component({
  selector: 'app-process-equipment-employee-engagement',
  standalone: false,

  templateUrl: './process-equipment-employee-engagement.component.html',
  styleUrl: './process-equipment-employee-engagement.component.css'
})
export class ProcessEquipmentEmployeeEngagementComponent {
  @Input()
  inPortfolio: boolean;

  ProcessEquipmentEmployeeEngagementHelp = ProcessEquipmentEmployeeEngagementHelp;

  processEquipmentGuid: string;

  describeSafetyConcerns: string;
  describeWorkplaceEnvironment: string;
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
      this.describeSafetyConcerns = processEquipment.describeSafetyConcerns;
      this.describeWorkplaceEnvironment = processEquipment.describeWorkplaceEnvironment;
    });
  }

  ngOnDestory() {
    this.setupWizardService.focusedHelp.next(undefined);
  }

  async saveChanges() {
    let processEquipment: IdbProcessEquipment = this.processEquipmentIdbService.getByGuid(this.processEquipmentGuid);
    processEquipment.describeSafetyConcerns = this.describeSafetyConcerns;
    processEquipment.describeWorkplaceEnvironment = this.describeWorkplaceEnvironment;
    await this.processEquipmentIdbService.asyncUpdate(processEquipment);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
