import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardSidePanelComponent } from './setup-wizard-side-panel.component';

describe('SetupWizardSidePanelComponent', () => {
  let component: SetupWizardSidePanelComponent;
  let fixture: ComponentFixture<SetupWizardSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetupWizardSidePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetupWizardSidePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
