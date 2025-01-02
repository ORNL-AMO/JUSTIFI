import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKpiSearchComponent } from './add-kpi-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { SelectedKpiOptionPipe } from './selected-kpi-option.pipe';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { IdbKeyPerformanceIndicator } from 'src/app/models/keyPerformanceIndicator';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { PrimaryKpiBadgeModule } from 'src/app/shared/primary-kpi-badge/primary-kpi-badge.module';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { getNewIdbFacility, IdbFacility } from 'src/app/models/facility';

describe('AddKpiSearchComponent', () => {
  let component: AddKpiSearchComponent;
  let fixture: ComponentFixture<AddKpiSearchComponent>;
  let facilityIdbService: Partial<FacilityIdbService> = {
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  let keyPerformanceIndicatorIdbService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([])
  };
  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, HelperPipesModule, PrimaryKpiBadgeModule],
      declarations: [AddKpiSearchComponent, SelectedKpiOptionPipe],
      providers: [
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddKpiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
