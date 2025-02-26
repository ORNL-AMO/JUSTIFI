import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardSidePanelComponent } from './setup-wizard-side-panel.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetupWizardHelpContentComponent } from './setup-wizard-help-content/setup-wizard-help-content.component';
import { SidePanelNebsDiagramComponent } from './side-panel-nebs-diagram/side-panel-nebs-diagram.component';
import { SidePanelSystemDiagramComponent } from './side-panel-system-diagram/side-panel-system-diagram.component';
import { SidePanelResultsComponent } from './side-panel-results/side-panel-results.component';

describe('SetupWizardSidePanelComponent', () => {
  let component: SetupWizardSidePanelComponent;
  let fixture: ComponentFixture<SetupWizardSidePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [SetupWizardSidePanelComponent, SetupWizardHelpContentComponent, SidePanelNebsDiagramComponent, SidePanelSystemDiagramComponent, SidePanelResultsComponent],
      providers: stubServiceProviders
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
