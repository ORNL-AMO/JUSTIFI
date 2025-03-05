import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAssessmentHelpComponent } from './pre-assessment-help.component';

describe('PreAssessmentHelpComponent', () => {
  let component: PreAssessmentHelpComponent;
  let fixture: ComponentFixture<PreAssessmentHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PreAssessmentHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreAssessmentHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
