import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDashboardComponent } from './assessment-dashboard.component';
import { AssessmentDashboardNavComponent } from './assessment-dashboard-nav/assessment-dashboard-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AssessmentDashboardComponent', () => {
  let component: AssessmentDashboardComponent;
  let fixture: ComponentFixture<AssessmentDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [AssessmentDashboardComponent, AssessmentDashboardNavComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
