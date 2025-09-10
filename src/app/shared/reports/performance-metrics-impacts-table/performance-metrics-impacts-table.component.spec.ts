import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsImpactsTableComponent } from './performance-metrics-impacts-table.component';
import { TableEntriesModule } from '../../table-entries/table-entries.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('PerformanceMetricsImpactsTableComponent', () => {
  let component: PerformanceMetricsImpactsTableComponent;
  let fixture: ComponentFixture<PerformanceMetricsImpactsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntriesModule],
      declarations: [PerformanceMetricsImpactsTableComponent],
      providers: stubServiceProviders
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
