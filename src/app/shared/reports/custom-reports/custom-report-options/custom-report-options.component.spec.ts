import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomReportOptionsComponent } from './custom-report-options.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { EnergyOpportunityReportOptionsListPipe } from './energy-opportunity-report-options-list.pipe';
import { KpmImpactReportOptionsListPipe } from './kpm-impact-report-options-list.pipe';
import { NonEnergyBenefitReportOptionsListPipe } from './non-energy-benefit-report-options-list.pipe';

describe('CustomReportOptionsComponent', () => {
  let component: CustomReportOptionsComponent;
  let fixture: ComponentFixture<CustomReportOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule],
      declarations: [CustomReportOptionsComponent, EnergyOpportunityReportOptionsListPipe, KpmImpactReportOptionsListPipe, NonEnergyBenefitReportOptionsListPipe],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomReportOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
