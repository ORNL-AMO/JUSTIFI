import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsTableComponent } from './performance-metrics-table.component';
import { PerformanceMetricsTablePipe } from './performance-metrics-table.pipe';
import { TableEntriesModule } from '../../table-entries/table-entries.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('PerformanceMetricsTableComponent', () => {
  let component: PerformanceMetricsTableComponent;
  let fixture: ComponentFixture<PerformanceMetricsTableComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntriesModule],
      declarations: [PerformanceMetricsTableComponent, PerformanceMetricsTablePipe],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceMetricsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
