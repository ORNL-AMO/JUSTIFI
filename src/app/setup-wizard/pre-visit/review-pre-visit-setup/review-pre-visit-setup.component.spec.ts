import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPreVisitSetupComponent } from './review-pre-visit-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { TeamDetailsSummaryComponent } from './team-details-summary/team-details-summary.component';
import { ProcessEquipmentSummaryComponent } from './process-equipment-summary/process-equipment-summary.component';
import { PreAssessmentSummaryComponent } from './pre-assessment-summary/pre-assessment-summary.component';
import { FacilityDetailsSummaryComponent } from './facility-details-summary/facility-details-summary.component';
import { CompanyKpisSummaryComponent } from './company-kpis-summary/company-kpis-summary.component';
import { CompanyDetailsSummaryComponent } from './company-details-summary/company-details-summary.component';
import { TableEntriesModule } from 'src/app/shared/table-entries/table-entries.module';
import { SystemInventorySummaryComponent } from './system-inventory-summary/system-inventory-summary.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ReviewPreVisitSetupComponent', () => {
  let component: ReviewPreVisitSetupComponent;
  let fixture: ComponentFixture<ReviewPreVisitSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, TableEntriesModule],
      declarations: [ReviewPreVisitSetupComponent, TeamDetailsSummaryComponent, ProcessEquipmentSummaryComponent, PreAssessmentSummaryComponent, FacilityDetailsSummaryComponent, CompanyKpisSummaryComponent, CompanyDetailsSummaryComponent, SystemInventorySummaryComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(ReviewPreVisitSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
