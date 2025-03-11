import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardHelpContentComponent } from './setup-wizard-help-content.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('SetupWizardHelpContentComponent', () => {
  let component: SetupWizardHelpContentComponent;
  let fixture: ComponentFixture<SetupWizardHelpContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [SetupWizardHelpContentComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupWizardHelpContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
