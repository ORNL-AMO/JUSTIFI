import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteAssessmentComponent } from './on-site-assessment.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AssessmentNebsFormComponent } from './assessment-nebs-form/assessment-nebs-form.component';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { SharedAssessmentFormsModule } from 'src/app/shared/shared-assessment-forms/shared-assessment-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('OnSiteAssessmentComponent', () => {
  let component: OnSiteAssessmentComponent;
  let fixture: ComponentFixture<OnSiteAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule, HelperPipesModule, SharedAssessmentFormsModule],
      declarations: [OnSiteAssessmentComponent, AssessmentNebsFormComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(OnSiteAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
