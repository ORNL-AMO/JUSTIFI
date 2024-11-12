import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsHomeComponent } from './assessment-nebs-home.component';

describe('AssessmentNebsHomeComponent', () => {
  let component: AssessmentNebsHomeComponent;
  let fixture: ComponentFixture<AssessmentNebsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentNebsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentNebsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
