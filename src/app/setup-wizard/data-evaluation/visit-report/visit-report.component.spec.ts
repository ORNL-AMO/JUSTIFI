import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitReportComponent } from './visit-report.component';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ReportsModule } from 'src/app/shared/reports/reports.module';
import { getNewIdbAssessment, IdbAssessment } from 'src/app/models/assessment';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';
import { getNewIdbCompany, IdbCompany } from 'src/app/models/company';
import { getNewIdbFacility, IdbFacility } from 'src/app/models/facility';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

describe('VisitReportComponent', () => {
  let component: VisitReportComponent;
  let fixture: ComponentFixture<VisitReportComponent>;

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
      imports: [RouterTestingModule, FontAwesomeModule, ReportsModule],
      declarations: [VisitReportComponent    ],
      providers: [
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorService },
        { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
