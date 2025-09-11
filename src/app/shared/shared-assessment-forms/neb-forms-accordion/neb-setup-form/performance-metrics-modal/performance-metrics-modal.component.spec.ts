import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsModalComponent } from './performance-metrics-modal.component';
import { MetricOptionsModalListPipe } from './metric-options-modal-list.pipe';
import { AssociatedMetricIndicatorPipe } from './associated-metric-indicator.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('PerformanceMetricsModalComponent', () => {
  let component: PerformanceMetricsModalComponent;
  let fixture: ComponentFixture<PerformanceMetricsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [PerformanceMetricsModalComponent, MetricOptionsModalListPipe, AssociatedMetricIndicatorPipe],
      providers: stubServiceProviders
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
