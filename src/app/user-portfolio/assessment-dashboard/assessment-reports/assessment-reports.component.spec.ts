import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentReportsComponent } from './assessment-reports.component';

describe('AssessmentReportsComponent', () => {
  let component: AssessmentReportsComponent;
  let fixture: ComponentFixture<AssessmentReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentReportsComponent]
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
