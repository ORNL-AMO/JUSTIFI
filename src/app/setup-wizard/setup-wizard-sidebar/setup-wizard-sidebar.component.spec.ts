import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardSidebarComponent } from './setup-wizard-sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { NavItemActivePipe } from './nav-item-active.pipe';
import { FormsModule } from '@angular/forms';

describe('SetupWizardSidebarComponent', () => {
  let component: SetupWizardSidebarComponent;
  let fixture: ComponentFixture<SetupWizardSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, HelperPipesModule, FormsModule],
      declarations: [SetupWizardSidebarComponent, NavItemActivePipe],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(SetupWizardSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
