import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpmImpactsTableComponent } from './kpm-impacts-table.component';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { BehaviorSubject } from 'rxjs';
import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';

describe('KpmImpactsTableComponent', () => {
  let component: KpmImpactsTableComponent;
  let fixture: ComponentFixture<KpmImpactsTableComponent>;

  let keyPerformanceMetricImpactsIdbService: Partial<KeyPerformanceMetricImpactsIdbService> = {
    keyPerformanceMetricImpacts: new BehaviorSubject<Array<IdbKeyPerformanceMetricImpact>>([])
  };
  let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([])
  };
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };
  let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [KpmImpactsTableComponent],
      providers: [
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(KpmImpactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
