import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDashboardHomeComponent } from './assessment-dashboard-home.component';

describe('AssessmentDashboardHomeComponent', () => {
  let component: AssessmentDashboardHomeComponent;
  let fixture: ComponentFixture<AssessmentDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentDashboardHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
