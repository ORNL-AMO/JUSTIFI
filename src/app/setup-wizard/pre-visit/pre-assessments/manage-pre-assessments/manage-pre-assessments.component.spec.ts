import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePreAssessmentsComponent } from './manage-pre-assessments.component';

describe('ManagePreAssessmentsComponent', () => {
  let component: ManagePreAssessmentsComponent;
  let fixture: ComponentFixture<ManagePreAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePreAssessmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagePreAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
