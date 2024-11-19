import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentReportsComponent } from './assessment-reports.component';
import { ReportsModule } from 'src/app/shared/reports/reports.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssessmentReportsComponent', () => {
  let component: AssessmentReportsComponent;
  let fixture: ComponentFixture<AssessmentReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsModule],
      declarations: [AssessmentReportsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
