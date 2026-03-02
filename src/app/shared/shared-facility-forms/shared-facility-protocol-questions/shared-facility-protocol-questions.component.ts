import { Component, Input } from '@angular/core';
import { faCircleCheck, faCirclePlus, faCircleXmark, faMinus, faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { SetupWizardService } from 'src/app/setup-wizard/setup-wizard.service';
import { FacilityProtocolHelp } from '../../help-content/facility-protocol-help';

@Component({
  selector: 'app-shared-facility-protocol-questions',
  standalone: false,

  templateUrl: './shared-facility-protocol-questions.component.html',
  styleUrl: './shared-facility-protocol-questions.component.css'
})
export class SharedFacilityProtocolQuestionsComponent {
  @Input()
  inPortfolio: boolean;


  FacilityProtocolHelp = FacilityProtocolHelp;

  faPlus: IconDefinition = faPlus;
  faMinus: IconDefinition = faMinus;
  faCirclePlus: IconDefinition = faCirclePlus;
  faCircleCheck: IconDefinition = faCircleCheck;
  faCircleXmark: IconDefinition = faCircleXmark

  equipmentAcquisition: string;
  financialCriteria: string;
  howCostsTracked: string;
  outsidePressures: string;
  financialMetricsUsed: string;
  efficiencyIncentives: string;
  dependentFunding: string;
  constructor(private facilityIdbService: FacilityIdbService,
    private setupWizardService: SetupWizardService
  ) {
  }

  ngOnInit() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    this.equipmentAcquisition = facility.equipmentAcquisition;
    this.howCostsTracked = facility.howCostsTracked;
    this.financialCriteria = facility.financialCriteria;
    this.financialMetricsUsed = facility.financialMetricsUsed;
    this.outsidePressures = facility.outsidePressures;
    this.efficiencyIncentives = facility.efficiencyIncentives;
    this.dependentFunding = facility.dependentFunding;
  }

  async saveChanges() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    facility.equipmentAcquisition = this.equipmentAcquisition;
    facility.howCostsTracked = this.howCostsTracked;
    facility.financialCriteria = this.financialCriteria;
    facility.outsidePressures = this.outsidePressures;
    facility.financialMetricsUsed = this.financialMetricsUsed;
    facility.efficiencyIncentives = this.efficiencyIncentives;
    facility.dependentFunding = this.dependentFunding;
    await this.facilityIdbService.asyncUpdate(facility);
  }

  focusField(str: string) {
    this.setupWizardService.focusedHelp.next(str);
  }
}
