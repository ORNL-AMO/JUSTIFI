import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreAssessmentFormComponent } from './pre-assessment-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { SharedAssessmentFormsModule } from 'src/app/shared/shared-assessment-forms/shared-assessment-forms.module';

describe('PreAssessmentFormComponent', () => {
  let component: PreAssessmentFormComponent;
  let fixture: ComponentFixture<PreAssessmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedAssessmentFormsModule],
      declarations: [PreAssessmentFormComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreAssessmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
