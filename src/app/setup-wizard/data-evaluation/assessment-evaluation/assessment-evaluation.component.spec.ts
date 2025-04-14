import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEvaluationComponent } from './assessment-evaluation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { ReportsModule } from 'src/app/shared/reports/reports.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssessmentEvaluationComponent', () => {
  let component: AssessmentEvaluationComponent;
  let fixture: ComponentFixture<AssessmentEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule, ReportsModule],
      declarations: [AssessmentEvaluationComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
