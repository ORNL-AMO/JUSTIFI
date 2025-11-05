import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { IdbReport } from 'src/app/models/report';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { getStakeholderReport, StakeholderReport } from '../calculations/stakeholderReport';

@Component({
  selector: 'app-stakeholder-report',
  standalone: false,
  
  templateUrl: './stakeholder-report.component.html',
  styleUrl: './stakeholder-report.component.css'
})
export class StakeholderReportComponent {
  @Input({ required: true })
  contact: IdbContact;
  @Input()
  report: IdbReport;
  @Input()
  inRollup: boolean;

  stakeholderReport: StakeholderReport;
  print: boolean;
  printSub: Subscription;

  constructor(
    private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private sharedDataService: SharedDataService
  ) { }

  ngOnInit() {
    this.printSub = this.sharedDataService.print.subscribe(_print => {
      this.print = _print;
    });
  }

  ngOnDestroy() {
    this.printSub.unsubscribe();
  }

  ngOnChanges() {
    // Get all data arrays once
    let allAssessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let allKPIs: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    let allEnergyEquipment: Array<IdbEnergyEquipment> = this.energyEquipmentIdbService.energyEquipments.getValue();
    let allProcessEquipment: Array<IdbProcessEquipment> = this.processEquipmentIdbService.processEquipments.getValue();

    // Generate report for this specific contact
    this.stakeholderReport = getStakeholderReport(
      this.contact,
      allAssessments,
      allEnergyOpportunities,
      allNonEnergyBenefits,
      allKPIs,
      allEnergyEquipment,
      allProcessEquipment,
      this.report
    );
  }
}
