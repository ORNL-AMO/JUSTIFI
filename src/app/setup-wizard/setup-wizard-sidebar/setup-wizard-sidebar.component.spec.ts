import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupWizardSidebarComponent } from './setup-wizard-sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { NavItemActivePipe } from './nav-item-active.pipe';
import { FormsModule } from '@angular/forms';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';

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

  it('should toggle the reports sidebar without performing a normal visit update', async () => {
    const onSiteVisitIdbService = TestBed.inject(OnSiteVisitIdbService);
    onSiteVisitIdbService.updateSidebarReportsOpen = jasmine.createSpy().and.resolveTo();
    const expectedSidebarState = !component.onSiteVisit.sidebarReportsOpen;

    await component.toggleReportsSidebarOpen();

    expect(onSiteVisitIdbService.updateSidebarReportsOpen).toHaveBeenCalledOnceWith(
      component.onSiteVisit.guid,
      expectedSidebarState
    );
  });
});
