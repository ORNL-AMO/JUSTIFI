import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentSettingsComponent } from './assessment-settings.component';

describe('AssessmentSettingsComponent', () => {
  let component: AssessmentSettingsComponent;
  let fixture: ComponentFixture<AssessmentSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
