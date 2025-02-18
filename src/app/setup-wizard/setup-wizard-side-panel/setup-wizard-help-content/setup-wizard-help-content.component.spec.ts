import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardHelpContentComponent } from './setup-wizard-help-content.component';

describe('SetupWizardHelpContentComponent', () => {
  let component: SetupWizardHelpContentComponent;
  let fixture: ComponentFixture<SetupWizardHelpContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupWizardHelpContentComponent]
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
