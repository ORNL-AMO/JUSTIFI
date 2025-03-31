import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryKpiBadgeComponent } from './primary-kpi-badge.component';
import { KpiCategoryClassPipe } from './kpi-category-class.pipe';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { getNewKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';

describe('PrimaryKpiBadgeComponent', () => {
  let component: PrimaryKpiBadgeComponent;
  let fixture: ComponentFixture<PrimaryKpiBadgeComponent>;

  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    getKpiFromKpm: () => {
      return getNewKeyPerformanceIndicator('', '', {
        primaryKPI: 'Other',
        label: 'other',
        htmlLabel: 'other',
        optionValue: 'other'
      }, true, '')
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrimaryKpiBadgeComponent, KpiCategoryClassPipe],
      providers: [
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrimaryKpiBadgeComponent);
    component = fixture.componentInstance;
    component.kpiValue = 'other';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
