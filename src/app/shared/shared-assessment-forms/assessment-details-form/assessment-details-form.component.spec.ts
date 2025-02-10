import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDetailsFormComponent } from './assessment-details-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { AssociatedContactsModule } from '../../associated-contacts/associated-contacts.module';

describe('AssessmentDetailsFormComponent', () => {
  let component: AssessmentDetailsFormComponent;
  let fixture: ComponentFixture<AssessmentDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, RouterTestingModule, HelperPipesModule, AssociatedContactsModule],
      declarations: [AssessmentDetailsFormComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssessmentDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
