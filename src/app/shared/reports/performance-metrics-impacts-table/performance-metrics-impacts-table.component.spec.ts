import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsImpactsTableComponent } from './performance-metrics-impacts-table.component';

describe('PerformanceMetricsImpactsTableComponent', () => {
  let component: PerformanceMetricsImpactsTableComponent;
  let fixture: ComponentFixture<PerformanceMetricsImpactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerformanceMetricsImpactsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceMetricsImpactsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
