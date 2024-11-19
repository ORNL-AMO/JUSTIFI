import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDashboardNavComponent } from './assessment-dashboard-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssessmentDashboardNavComponent', () => {
  let component: AssessmentDashboardNavComponent;
  let fixture: ComponentFixture<AssessmentDashboardNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [AssessmentDashboardNavComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentDashboardNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
