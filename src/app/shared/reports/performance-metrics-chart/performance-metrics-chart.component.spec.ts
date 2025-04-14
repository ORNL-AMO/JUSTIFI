import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsChartComponent } from './performance-metrics-chart.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('PerformanceMetricsChartComponent', () => {
  let component: PerformanceMetricsChartComponent;
  let fixture: ComponentFixture<PerformanceMetricsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceMetricsChartComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PerformanceMetricsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
