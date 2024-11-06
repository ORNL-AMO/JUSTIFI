import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteVisitReportComponent } from './on-site-visit-report.component';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { BehaviorSubject } from 'rxjs';
import { getNewIdbOnSiteVisit, IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { getNewIdbAssessment, IdbAssessment } from 'src/app/models/assessment';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { getNewIdbCompany, IdbCompany } from 'src/app/models/company';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { getNewIdbFacility, IdbFacility } from 'src/app/models/facility';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/helper-pipes.module';
import { PaybackTableComponent } from '../assessment-report/payback-table/payback-table.component';
import { AssessmentSavingsTableComponent } from '../assessment-report/assessment-savings-table/assessment-savings-table.component';
import { TableEntriesModule } from '../../table-entries/table-entries.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ReportDetailsTableComponent } from '../report-details-table/report-details-table.component';
import { PerformanceMetricsTableComponent } from '../performance-metrics-table/performance-metrics-table.component';
import { PerformanceMetricsChartComponent } from '../performance-metrics-chart/performance-metrics-chart.component';
import { OnSiteVisitPaybackTableComponent } from './on-site-visit-payback-table/on-site-visit-payback-table.component';
import { OnSiteVisitSavingsChartComponent } from './on-site-visit-savings-chart/on-site-visit-savings-chart.component';
import { NebContributionsBarChartComponent } from './neb-contributions-bar-chart/neb-contributions-bar-chart.component';
import { PerformanceMetricsTablePipe } from '../performance-metrics-table/performance-metrics-table.pipe';

describe('OnSiteVisitReportComponent', () => {
  let component: OnSiteVisitReportComponent;
  let fixture: ComponentFixture<OnSiteVisitReportComponent>;
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '', getDefaultUnitSettings())),
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  }

  let companyIdbService: Partial<CompanyIdbService> = {
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany('')),
    getByGUID: () => { return getNewIdbCompany('') }
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', '')),
    getByGUID: () => { return getNewIdbFacility('', '') }
  };
  let contactIdbService: Partial<ContactIdbService> = {};
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([])
  };
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };
  let keyPerformanceIndicatorService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([]),
    getCompanyKeyPerformanceMetrics: () => { return [] }
  };


  let energyEquipmentIdbService: Partial<EnergyEquipmentIdbService> = {
    energyEquipments: new BehaviorSubject<Array<IdbEnergyEquipment>>([])
  };

  let keyPerformanceMetricImpactsIdbService: Partial<KeyPerformanceMetricImpactsIdbService> = {
    keyPerformanceMetricImpacts: new BehaviorSubject<Array<IdbKeyPerformanceMetricImpact>>([])
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, TableEntriesModule, HelperPipesModule],
      declarations: [OnSiteVisitReportComponent, AssessmentSavingsTableComponent, PaybackTableComponent, ReportDetailsTableComponent, PerformanceMetricsTableComponent, PerformanceMetricsChartComponent,
        OnSiteVisitPaybackTableComponent, OnSiteVisitSavingsChartComponent, NebContributionsBarChartComponent, PerformanceMetricsTablePipe
      ],
      providers: [
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnSiteVisitReportComponent);
    component = fixture.componentInstance;
    component.onSiteVisit = getNewIdbOnSiteVisit('', '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
