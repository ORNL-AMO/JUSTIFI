import { Component, Input } from '@angular/core';
import { faAddressBook, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IdbContact } from 'src/app/models/contact';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbReport } from 'src/app/models/report';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { getStakeholderReport, StakeholderReport } from '../calculations/stakeholderReport';
import { LocaleService } from '../../shared-services/locale.service';
import { KeyPerformanceMetric } from '../../constants/keyPerformanceMetrics';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';

@Component({
  selector: 'app-stakeholder-report',
  standalone: false,
  
  templateUrl: './stakeholder-report.component.html',
  styleUrl: './stakeholder-report.component.css'
})
export class StakeholderReportComponent {
  @Input({ required: true })
  contact: IdbContact;
  @Input({ required: true })
  onsiteVisit: IdbOnSiteVisit;
  @Input()
  report: IdbReport;

  faAddressBook: IconDefinition = faAddressBook;
  print: boolean = false;
  stakeholderReport: StakeholderReport;
  facilityPerformanceMetrics: Array<KeyPerformanceMetric>;
  currencyCode: string;
  currencySub: Subscription;
  printSub: Subscription;

  overlapAssessmentGuids: Set<string>;
  directAssessmentGuids: Set<string>;

  constructor(
    private assessmentIdbService: AssessmentIdbService,
    private energyOpportunityIdbService: EnergyOpportunityIdbService,
    private nonEnergyBenefitIdbService: NonEnergyBenefitsIdbService,
    private keyPerformanceIndicatorIdbService: KeyPerformanceIndicatorsIdbService,
    private keyPerformanceMetricImpactsIdbService: KeyPerformanceMetricImpactsIdbService,
    private energyEquipmentIdbService: EnergyEquipmentIdbService,
    private processEquipmentIdbService: ProcessEquipmentIdbService,
    private sharedDataService: SharedDataService,
    private localeService: LocaleService
  ) { }

  ngOnInit() {
    let allAssessments: Array<IdbAssessment> = this.assessmentIdbService.assessments.getValue();
    let allEnergyOpportunities: Array<IdbEnergyOpportunity> = this.energyOpportunityIdbService.energyOpportunities.getValue();
    let allNonEnergyBenefits: Array<IdbNonEnergyBenefit> = this.nonEnergyBenefitIdbService.nonEnergyBenefits.getValue();
    let allKPIs: Array<IdbKeyPerformanceIndicator> = this.keyPerformanceIndicatorIdbService.keyPerformanceIndicators.getValue();
    let allEnergyEquipment: Array<IdbEnergyEquipment> = this.energyEquipmentIdbService.energyEquipments.getValue();
    let allProcessEquipment: Array<IdbProcessEquipment> = this.processEquipmentIdbService.processEquipments.getValue();
    let allKpmImpacts: Array<IdbKeyPerformanceMetricImpact> = this.keyPerformanceMetricImpactsIdbService.keyPerformanceMetricImpacts.getValue();

    this.facilityPerformanceMetrics = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.onsiteVisit.facilityId);

    this.stakeholderReport = getStakeholderReport(
      this.contact,
      this.onsiteVisit.assessmentIds,
      allAssessments,
      allEnergyOpportunities,
      allNonEnergyBenefits,
      this.facilityPerformanceMetrics,
      allKPIs,
      allEnergyEquipment,
      allProcessEquipment,
      allKpmImpacts,
      this.report
    );

    this.overlapAssessmentGuids = new Set(this.stakeholderReport.overlapAssessments.map(a => a.guid));
    this.directAssessmentGuids = new Set(this.stakeholderReport.directAssessments.map(a => a.guid));

    this.printSub = this.sharedDataService.print.subscribe(_print => {
      this.print = _print;
    });
    this.currencySub = this.localeService.currencyCode.subscribe(
      currencyCode => this.currencyCode = currencyCode
    );
  }

  ngOnDestroy() {
    this.printSub.unsubscribe();
    this.currencySub.unsubscribe();
  }

  // Simple helper methods for template data lookups
  getKpiImpacts(kpiGuid: string): Array<IdbKeyPerformanceMetricImpact> {
    return this.stakeholderReport.indirectKpmImpacts.filter(impact => impact.kpiGuid === kpiGuid);
  }

  getNebCountFromImpacts(impacts: Array<IdbKeyPerformanceMetricImpact>): number {
    return new Set(impacts.map(impact => impact.nebId)).size;
  }

  getTotalImpactFromImpacts(impacts: Array<IdbKeyPerformanceMetricImpact>): number {
    return impacts.reduce((sum, impact) => sum + (impact.costAdjustment || 0), 0);
  }

  // Expand NEBs into rows based on their KPM impacts
  getNebExpandedRows(): Array<{
    neb: IdbNonEnergyBenefit,
    nebReport: any,
    isDirect: boolean,
    isIndirect: boolean,
    kpmImpact?: IdbKeyPerformanceMetricImpact,
    kpi?: IdbKeyPerformanceIndicator,
    kpmName?: string
  }> {
    const rows: Array<any> = [];
    const directNebGuids = new Set(this.stakeholderReport.directNEBs.map(n => n.guid));
    const indirectNebGuids = new Set(this.stakeholderReport.indirectNEBsViaKpmImpacts.map(n => n.guid));

    this.stakeholderReport.connectedNebReports.forEach(nebReport => {
      const neb = nebReport.nonEnergyBenefit;
      const isDirect = directNebGuids.has(neb.guid);
      const isIndirect = indirectNebGuids.has(neb.guid);

      const relatedKpmImpacts = this.stakeholderReport.indirectKpmImpacts.filter(
        impact => impact.nebId === neb.guid
      );

      if (relatedKpmImpacts.length > 0) {
        relatedKpmImpacts.forEach(kpmImpact => {
          const kpi = this.stakeholderReport.directKPIs.find(k => k.guid === kpmImpact.kpiGuid);
          const kpm = this.facilityPerformanceMetrics.find(m => 
            m.isCustom ? m.guid === kpmImpact.kpmGuid : m.value === kpmImpact.kpmValue
          );
          rows.push({
            neb,
            nebReport,
            isDirect,
            isIndirect,
            kpmImpact,
            kpi,
            kpmName: kpm?.label
          });
        });
      } else {
        rows.push({ neb, nebReport, isDirect, isIndirect });
      }
    });

    return rows;
  }
}
