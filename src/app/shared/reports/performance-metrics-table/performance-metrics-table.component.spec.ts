import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricsTableComponent } from './performance-metrics-table.component';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { PerformanceMetricsTablePipe } from './performance-metrics-table.pipe';
import { TableEntriesModule } from '../../table-entries/table-entries.module';
import { BehaviorSubject } from 'rxjs';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

describe('PerformanceMetricsTableComponent', () => {
  let component: PerformanceMetricsTableComponent;
  let fixture: ComponentFixture<PerformanceMetricsTableComponent>;

  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableEntriesModule],
      declarations: [PerformanceMetricsTableComponent, PerformanceMetricsTablePipe],
      providers: [
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
      ]
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
