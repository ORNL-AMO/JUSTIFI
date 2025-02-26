import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDetailsHelpComponent } from './assessment-details-help.component';

describe('AssessmentDetailsHelpComponent', () => {
  let component: AssessmentDetailsHelpComponent;
  let fixture: ComponentFixture<AssessmentDetailsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentDetailsHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssessmentDetailsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
