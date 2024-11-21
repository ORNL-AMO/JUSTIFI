import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPerformanceIndicatorsComponent } from './company-performance-indicators.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedCompanyFormsModule } from 'src/app/shared/shared-company-forms/shared-company-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { RouterModule } from '@angular/router';

describe('CompanyPerformanceIndicatorsComponent', () => {
  let component: CompanyPerformanceIndicatorsComponent;
  let fixture: ComponentFixture<CompanyPerformanceIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedCompanyFormsModule, RouterModule],
      declarations: [CompanyPerformanceIndicatorsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPerformanceIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
