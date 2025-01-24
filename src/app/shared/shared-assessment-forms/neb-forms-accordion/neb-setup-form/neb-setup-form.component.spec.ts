import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebSetupFormComponent } from './neb-setup-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { getNewIdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { PerformanceMetricsModalComponent } from './performance-metrics-modal/performance-metrics-modal.component';
import { PerformanceMetricImpactFormComponent } from './performance-metric-impact-form/performance-metric-impact-form.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { LabelWithTooltipModule } from 'src/app/shared/label-with-tooltip/label-with-tooltip.module';

describe('NebSetupFormComponent', () => {
  let component: NebSetupFormComponent;
  let fixture: ComponentFixture<NebSetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, HelperPipesModule, LabelWithTooltipModule],
      declarations: [NebSetupFormComponent, PerformanceMetricsModalComponent, PerformanceMetricImpactFormComponent ],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(NebSetupFormComponent);
    component = fixture.componentInstance;
    component.nonEnergyBenefit = getNewIdbNonEnergyBenefit('', '', '', '', undefined, undefined, false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
