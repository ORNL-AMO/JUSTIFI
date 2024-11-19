import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetailsSummaryComponent } from './facility-details-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { BehaviorSubject } from 'rxjs';

describe('FacilityDetailsSummaryComponent', () => {
  let component: FacilityDetailsSummaryComponent;
  let fixture: ComponentFixture<FacilityDetailsSummaryComponent>;

  let facilityIdbService: Partial<FacilityIdbService> = {
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [FacilityDetailsSummaryComponent],
      providers: [
        { provide: FacilityIdbService, useValue: facilityIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FacilityDetailsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
