import { Component, Input } from '@angular/core';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbFacility } from 'src/app/models/facility';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceMetric } from '../../constants/keyPerformanceMetrics';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { AssessmentReport, getAssessmentReport } from '../calculations/assessmentReport';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { Subscription } from 'rxjs';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { IdbReport } from 'src/app/models/report';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { PowerpointReportGeneratorService } from '../../shared-services/powerpoint-report-generator.service';

@Component({
  selector: 'app-assessment-report',
  templateUrl: './assessment-report.component.html',
  styleUrl: './assessment-report.component.css',
  standalone: false
})
export class AssessmentReportComponent {
  @Input({ required: true })
  assessment: IdbAssessment;
  @Input()
  report: IdbReport;
  @Input()
  inRollup: boolean;

  company: IdbCompany;
  facility: IdbFacility;
  assessmentReport: AssessmentReport;
  energyEquipments: Array<IdbEnergyEquipment>;
  printSub: Subscription;
  print: boolean;
  createPowerPointSub: Subscription;
  constructor(private facilityIdbService: FacilityIdbService, private companyIdbService: CompanyIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private sharedDataService: SharedDataService,
    private powerpointReportGeneratorService: PowerpointReportGeneratorService
  ) {
  }

  ngOnInit() {
    this.company = this.companyIdbService.getByGUID(this.assessment.companyId);
    this.facility = this.facilityIdbService.getByGUID(this.assessment.facilityId);
    this.energyEquipments = this.energyEquipmentIdbService.energyEquipments.getValue();
    this.printSub = this.sharedDataService.print.subscribe(_print => {
      this.print = _print;
    });
    this.createPowerPointSub = this.sharedDataService.createPowerPoint.subscribe(_createPowerPoint => {
      if (_createPowerPoint == true) {
        this.generatePowerPoint();
      }
    });
  }

  ngOnDestroy() {
    this.printSub.unsubscribe();
    this.createPowerPointSub.unsubscribe();
  }

  ngOnChanges() {
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let facilityPerformanceMetrics: Array<KeyPerformanceMetric> = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.assessment.facilityId);
    let facilityPerformanceIndicators: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.getByFacilityGuid(this.assessment.facilityId);
    let keyPerformanceMetricImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();
    this.assessmentReport = getAssessmentReport(this.assessment, allEnergyOpportunities, allNonEnergyBenefits, facilityPerformanceMetrics, facilityPerformanceIndicators, keyPerformanceMetricImpacts, this.report);
  }


  generatePowerPoint() {
    this.powerpointReportGeneratorService.createAssessmentPPT(this.assessmentReport, this.company, this.facility, this.inRollup, this.assessment);
  }
}
