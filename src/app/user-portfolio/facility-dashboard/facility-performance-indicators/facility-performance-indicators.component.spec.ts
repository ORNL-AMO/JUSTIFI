import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityPerformanceIndicatorsComponent } from './facility-performance-indicators.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedCompanyFormsModule } from 'src/app/shared/shared-company-forms/shared-company-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { RouterModule } from '@angular/router';

describe('CompanyPerformanceIndicatorsComponent', () => {
  let component: FacilityPerformanceIndicatorsComponent;
  let fixture: ComponentFixture<FacilityPerformanceIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedCompanyFormsModule, RouterModule],
      declarations: [FacilityPerformanceIndicatorsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityPerformanceIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
