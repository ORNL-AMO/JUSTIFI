import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbContact } from 'src/app/models/contact';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { IdbReport } from 'src/app/models/report';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { getStakeholderReport, StakeholderReport } from '../calculations/stakeholderReport';
import { LocaleCurrencyOption } from '../../constants/localeCurrency';
import { LocaleService } from '../../shared-services/locale.service';

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

  stakeholderReport: StakeholderReport;
  facilityPerformanceMetrics: any[];
  currencyCode: string;
  currencySub: Subscription;
  print: boolean;
  printSub: Subscription;

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

    // Get facility performance metrics for assessment report calculations
    this.facilityPerformanceMetrics = this.keyPerformanceIndicatorIdbService.getFacilityKeyPerformanceMetrics(this.onsiteVisit.facilityId);

    // Generate report for this specific contact
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

    this.printSub = this.sharedDataService.print.subscribe(_print => {
      this.print = _print;
    });
    this.currencySub = this.localeService.currencyCode.subscribe(
      currencyCode => this.currencyCode = currencyCode
    );
  }

  ngOnDestroy() {
    this.printSub.unsubscribe();
  }

  // Helper methods for template
  isNebInOverlap(nebGuid: string): boolean {
    return this.stakeholderReport.overlapNEBs.some(n => n.guid === nebGuid);
  }

  isNebDirect(nebGuid: string): boolean {
    return this.stakeholderReport.directNEBs.some(n => n.guid === nebGuid);
  }

  isNebIndirect(nebGuid: string): boolean {
    return this.stakeholderReport.indirectNEBsViaKpmImpacts.some(n => n.guid === nebGuid);
  }

  isAssessmentInOverlap(assessmentGuid: string): boolean {
    return this.stakeholderReport.overlapAssessments.some(a => a.guid === assessmentGuid);
  }

  isAssessmentDirect(assessmentGuid: string): boolean {
    return this.stakeholderReport.directAssessments.some(a => a.guid === assessmentGuid);
  }

  isAssessmentIndirect(assessmentGuid: string): boolean {
    return this.stakeholderReport.indirectAssessmentsViaEquipment.some(a => a.guid === assessmentGuid);
  }

  getKpiRelatedNebCount(kpiGuid: string): number {
    const relatedImpacts = this.stakeholderReport.indirectKpmImpacts.filter(impact => impact.kpiGuid === kpiGuid);
    const nebGuids = new Set(relatedImpacts.map(impact => impact.nebId));
    return nebGuids.size;
  }

  getKpiTotalImpact(kpiGuid: string): number {
    return this.stakeholderReport.indirectKpmImpacts
      .filter(impact => impact.kpiGuid === kpiGuid)
      .reduce((sum, impact) => sum + (impact.costAdjustment || 0), 0);
  }

  getAssessmentReport(assessmentGuid: string): any {
    return this.stakeholderReport.connectedAssessmentReports.find(r => r.assessment.guid === assessmentGuid);
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

    this.stakeholderReport.connectedNebReports.forEach(nebReport => {
      const neb = nebReport.nonEnergyBenefit;
      const isDirect = this.isNebDirect(neb.guid);
      const isIndirect = this.isNebIndirect(neb.guid);

      // Find all KPM impacts for this NEB connected to stakeholder KPIs
      const relatedKpmImpacts = this.stakeholderReport.indirectKpmImpacts.filter(
        impact => impact.nebId === neb.guid
      );

      if (relatedKpmImpacts.length > 0) {
        // Create one row per KPM impact
        relatedKpmImpacts.forEach(kpmImpact => {
          const kpi = this.stakeholderReport.directKPIs.find(k => k.guid === kpmImpact.kpiGuid);
          // Find KPM - for custom KPMs use guid, for standard KPMs use value
          const kpm = this.facilityPerformanceMetrics.find(m => {
            if (m.isCustom === false) {
              return m.value === kpmImpact.kpmValue;
            } else {
              return m.guid === kpmImpact.kpmGuid;
            }
          });
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
        // No KPM impacts, create single row
        rows.push({
          neb,
          nebReport,
          isDirect,
          isIndirect
        });
      }
    });

    return rows;
  }

  getAssessmentName(assessmentGuid: string): string {
    const assessment = this.stakeholderReport.allConnectedAssessments.find(a => a.guid === assessmentGuid);
    return assessment ? assessment.name : '';
  }

  getConnectedEemNames(equipmentEemIds: string[]): string {
    if (!equipmentEemIds || equipmentEemIds.length === 0) return 'None';
    
    const eemNames = equipmentEemIds
      .map(eemId => {
        const eem = this.stakeholderReport.indirectEnergyOpposViaEquipment.find(e => e.guid === eemId);
        return eem ? eem.name : null;
      })
      .filter(name => name !== null);
    
    return eemNames.length > 0 ? eemNames.join(', ') : 'None';
  }

  getConnectedAssessmentNames(equipmentAssessmentIds: string[]): string {
    if (!equipmentAssessmentIds || equipmentAssessmentIds.length === 0) return 'None';
    
    const assessmentNames = equipmentAssessmentIds
      .map(assessmentId => {
        const assessment = this.stakeholderReport.allConnectedAssessments.find(a => a.guid === assessmentId);
        return assessment ? assessment.name : null;
      })
      .filter(name => name !== null);
    
    return assessmentNames.length > 0 ? assessmentNames.join(', ') : 'None';
  }
}
