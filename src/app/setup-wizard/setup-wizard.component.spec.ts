import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardComponent } from './setup-wizard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { stubServiceProviders } from '../spec-helpers/spec-test-service-stub';
import { SetupWizardSidebarComponent } from './setup-wizard-sidebar/setup-wizard-sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../shared/helper-pipes/_helper-pipes.module';
import { NavItemActivePipe } from './setup-wizard-sidebar/nav-item-active.pipe';
import { AssociatedContactsModule } from '../shared/associated-contacts/associated-contacts.module';
import { SetupWizardSidePanelModule } from './setup-wizard-side-panel/setup-wizard-side-panel.module';
import { FormsModule } from '@angular/forms';

describe('SetupWizardComponent', () => {
  let component: SetupWizardComponent;
  let fixture: ComponentFixture<SetupWizardComponent>;
  beforeEach(async () => {


    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AssociatedContactsModule, FontAwesomeModule, HelperPipesModule, SetupWizardSidePanelModule, FormsModule],
      declarations: [SetupWizardComponent, SetupWizardSidebarComponent, NavItemActivePipe],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetupWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
