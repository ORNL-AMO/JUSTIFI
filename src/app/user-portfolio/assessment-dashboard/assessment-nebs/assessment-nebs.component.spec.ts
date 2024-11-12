import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsComponent } from './assessment-nebs.component';

describe('AssessmentNebsComponent', () => {
  let component: AssessmentNebsComponent;
  let fixture: ComponentFixture<AssessmentNebsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentNebsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentNebsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
