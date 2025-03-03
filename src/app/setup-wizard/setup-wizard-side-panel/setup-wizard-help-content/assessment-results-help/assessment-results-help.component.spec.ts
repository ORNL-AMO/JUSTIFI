import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentResultsHelpComponent } from './assessment-results-help.component';

describe('AssessmentResultsHelpComponent', () => {
  let component: AssessmentResultsHelpComponent;
  let fixture: ComponentFixture<AssessmentResultsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentResultsHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentResultsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
