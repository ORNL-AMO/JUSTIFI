import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDashboardNavComponent } from './assessment-dashboard-nav.component';

describe('AssessmentDashboardNavComponent', () => {
  let component: AssessmentDashboardNavComponent;
  let fixture: ComponentFixture<AssessmentDashboardNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentDashboardNavComponent]
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
