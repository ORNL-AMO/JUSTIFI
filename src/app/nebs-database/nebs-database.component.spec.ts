import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebsDatabaseComponent } from './nebs-database.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NebsDatabaseTableComponent } from './nebs-database-table/nebs-database-table.component';
import { KeyPerformanceIndicatorsIdbService } from '../indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from '../models/keyPerformanceIndicator';
import { BehaviorSubject } from 'rxjs';
import { NonEnergyBenefitsIdbService } from '../indexed-db/non-energy-benefits-idb.service';
import { AssessmentIdbService } from '../indexed-db/assessment-idb.service';
import { getNewIdbAssessment, IdbAssessment } from '../models/assessment';
import { getDefaultUnitSettings } from '../models/unitSettings';
import { EnergyOpportunityIdbService } from '../indexed-db/energy-opportunity-idb.service';
import { getNewIdbEnergyOpportunity } from '../models/energyOpportunity';
import { KeyPerformanceMetricImpactsIdbService } from '../indexed-db/key-performance-metric-impacts-idb.service';
import { CompanyIdbService } from '../indexed-db/company-idb.service';
import { NebOptionsFilterPipe } from './nebs-database-table/neb-options-filter.pipe';
import { FormsModule } from '@angular/forms';
import { LoadingService } from '../core-components/loading/loading.service';

describe('NebsDatabaseComponent', () => {
  let component: NebsDatabaseComponent;
  let fixture: ComponentFixture<NebsDatabaseComponent>;
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
      declarations: [NebsDatabaseComponent, NebsDatabaseTableComponent, NebOptionsFilterPipe],
      providers: [
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: LoadingService, useValue: {}}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NebsDatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
