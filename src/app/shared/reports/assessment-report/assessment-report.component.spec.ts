import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentReportComponent } from './assessment-report.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { BehaviorSubject } from 'rxjs';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { IdbAssessment, getNewIdbAssessment } from 'src/app/models/assessment';
import { RouterTestingModule } from '@angular/router/testing';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { TableEntriesModule } from '../../table-entries/table-entries.module';
import { HelperPipesModule } from '../../helper-pipes/helper-pipes.module';
import { AssessmentSavingsTableComponent } from './assessment-savings-table/assessment-savings-table.component';
import { PaybackTableComponent } from './payback-table/payback-table.component';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';
import { ReportDetailsTableComponent } from '../report-details-table/report-details-table.component';

describe('AssessmentReportComponent', () => {
  let component: AssessmentReportComponent;
  let fixture: ComponentFixture<AssessmentReportComponent>;
  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };

  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '', getDefaultUnitSettings()))
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
      declarations: [AssessmentReportComponent, AssessmentSavingsTableComponent, PaybackTableComponent, ReportDetailsTableComponent],
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

    fixture = TestBed.createComponent(AssessmentReportComponent);
    component = fixture.componentInstance;
    component.assessment = getNewIdbAssessment('', '', '', getDefaultUnitSettings());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
