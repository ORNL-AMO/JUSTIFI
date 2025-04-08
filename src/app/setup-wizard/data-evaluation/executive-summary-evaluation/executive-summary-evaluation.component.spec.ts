import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSummaryEvaluationComponent } from './executive-summary-evaluation.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReportsModule } from 'src/app/shared/reports/reports.module';

describe('ExecutiveSummaryEvaluationComponent', () => {
  let component: ExecutiveSummaryEvaluationComponent;
  let fixture: ComponentFixture<ExecutiveSummaryEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, ReportsModule],
      declarations: [ExecutiveSummaryEvaluationComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveSummaryEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
