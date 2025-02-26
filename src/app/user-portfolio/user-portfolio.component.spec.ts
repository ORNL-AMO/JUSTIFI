import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPortfolioComponent } from './user-portfolio.component';
import { SharedAssessmentFormsModule } from '../shared/shared-assessment-forms/shared-assessment-forms.module';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from '../spec-helpers/spec-test-service-stub';
import { AssociatedContactsModule } from '../shared/associated-contacts/associated-contacts.module';

describe('UserPortfolioComponent', () => {
  let component: UserPortfolioComponent;
  let fixture: ComponentFixture<UserPortfolioComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedAssessmentFormsModule, RouterTestingModule, FontAwesomeModule, AssociatedContactsModule],
      declarations: [UserPortfolioComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(UserPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
