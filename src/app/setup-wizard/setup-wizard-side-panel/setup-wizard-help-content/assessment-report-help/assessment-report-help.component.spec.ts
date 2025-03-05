import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentReportHelpComponent } from './assessment-report-help.component';

describe('AssessmentReportHelpComponent', () => {
  let component: AssessmentReportHelpComponent;
  let fixture: ComponentFixture<AssessmentReportHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentReportHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentReportHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
