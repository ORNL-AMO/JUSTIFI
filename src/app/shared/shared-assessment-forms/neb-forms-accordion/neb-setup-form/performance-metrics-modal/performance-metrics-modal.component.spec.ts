import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsModalComponent } from './performance-metrics-modal.component';
import { MetricOptionsModalListPipe } from './metric-options-modal-list.pipe';
import { AssociatedMetricIndicatorPipe } from './associated-metric-indicator.pipe';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BehaviorSubject } from 'rxjs';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';

describe('PerformanceMetricsModalComponent', () => {
  let component: PerformanceMetricsModalComponent;
  let fixture: ComponentFixture<PerformanceMetricsModalComponent>;
  let keyPerformanceMetricImpactsIdbService: Partial<KeyPerformanceMetricImpactsIdbService> = {};
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {};
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([])
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [PerformanceMetricsModalComponent, MetricOptionsModalListPipe, AssociatedMetricIndicatorPipe],
      providers: [
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceMetricsModalComponent);
    component = fixture.componentInstance;
    component.nonEnergyBenefit = getNewIdbNonEnergyBenefit('', '', '', '', '', undefined, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
