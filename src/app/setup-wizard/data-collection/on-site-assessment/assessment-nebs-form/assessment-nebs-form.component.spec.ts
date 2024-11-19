import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentNebsFormComponent } from './assessment-nebs-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NebSetupFormComponent } from 'src/app/shared/shared-assessment-forms/neb-forms-accordion/neb-setup-form/neb-setup-form.component';
import { NebFormsAccordionComponent } from 'src/app/shared/shared-assessment-forms/neb-forms-accordion/neb-forms-accordion.component';
import { SharedAssessmentFormsModule } from 'src/app/shared/shared-assessment-forms/shared-assessment-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssessmentNebsFormComponent', () => {
  let component: AssessmentNebsFormComponent;
  let fixture: ComponentFixture<AssessmentNebsFormComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule, SharedAssessmentFormsModule],
      declarations: [AssessmentNebsFormComponent, NebSetupFormComponent, NebFormsAccordionComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentNebsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
