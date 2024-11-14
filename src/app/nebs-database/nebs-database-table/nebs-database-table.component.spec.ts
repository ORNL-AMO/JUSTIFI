import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebsDatabaseTableComponent } from './nebs-database-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { BehaviorSubject } from 'rxjs';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { getNewIdbAssessment, IdbAssessment } from 'src/app/models/assessment';
import { getDefaultUnitSettings } from 'src/app/models/unitSettings';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { getNewIdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { NebOptionsFilterPipe } from './neb-options-filter.pipe';

describe('NebsDatabaseTableComponent', () => {
  let component: NebsDatabaseTableComponent;
  let fixture: ComponentFixture<NebsDatabaseTableComponent>;
  
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([]),
    getCompanyKeyPerformanceMetrics: () => { return [] }
  };
  let nonEnergyBenefitIdbService: Partial<NonEnergyBenefitsIdbService> = {
    getAssessmentNonEnergyBenefits: () => { return [] }
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    selectedAssessment: new BehaviorSubject<IdbAssessment>(getNewIdbAssessment('', '', '', getDefaultUnitSettings())),
    getByGuid: () => { return getNewIdbAssessment('', '', '', getDefaultUnitSettings()) }

  };
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    getByGuid: () => { return getNewIdbEnergyOpportunity('', '', '', '', null) }

  };
  let keyPerformanceMetricImpactsIdbService: Partial<KeyPerformanceMetricImpactsIdbService> = {};
  let companyIdbService: Partial<CompanyIdbService> = {}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [NebsDatabaseTableComponent, NebOptionsFilterPipe],
      providers: [
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NebsDatabaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
