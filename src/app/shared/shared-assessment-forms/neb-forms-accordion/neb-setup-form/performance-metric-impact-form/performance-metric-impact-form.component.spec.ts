import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceMetricImpactFormComponent } from './performance-metric-impact-form.component';
import { getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PrimaryKpiBadgeModule } from 'src/app/shared/primary-kpi-badge/primary-kpi-badge.module';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FormsModule } from '@angular/forms';
import { KpmDetailsFormModule } from 'src/app/shared/kpm-details-form/kpm-details-form.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('PerformanceMetricImpactFormComponent', () => {
  let component: PerformanceMetricImpactFormComponent;
  let fixture: ComponentFixture<PerformanceMetricImpactFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, PrimaryKpiBadgeModule, HelperPipesModule, FormsModule, KpmDetailsFormModule],
      declarations: [PerformanceMetricImpactFormComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(PerformanceMetricImpactFormComponent);
    component = fixture.componentInstance;
    component.impactGuid = '';
    component.nonEnergyBenefit = getNewIdbNonEnergyBenefit('', '', '', '', '', undefined, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
