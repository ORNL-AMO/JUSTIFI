import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDetailsSummaryComponent } from './facility-details-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('FacilityDetailsSummaryComponent', () => {
  let component: FacilityDetailsSummaryComponent;
  let fixture: ComponentFixture<FacilityDetailsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [FacilityDetailsSummaryComponent],
      providers: stubServiceProviders
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
