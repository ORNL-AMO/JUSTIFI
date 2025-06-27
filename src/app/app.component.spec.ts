import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core-components/navbar/navbar.component';
import { WelcomeComponent } from './core-components/welcome/welcome.component';
import { LoadingComponent } from './core-components/loading/loading.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SetupWizardModalComponent } from './core-components/setup-wizard-modal/setup-wizard-modal.component';
import { ImportBackupModalComponent } from './core-components/backup-modal/import-backup-modal/import-backup-modal.component';
import { FeedbackPageComponent } from './core-components/feedback-page/feedback-page.component';
import { stubServiceProviders } from './spec-helpers/spec-test-service-stub';
import { ExportBackupModalComponent } from './core-components/backup-modal/export-backup-modal/export-backup-modal.component';
import { ExportBackupTreeComponent } from './core-components/backup-modal/export-backup-modal/export-backup-tree/export-backup-tree.component';

describe('AppComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [AppComponent, NavbarComponent, WelcomeComponent, LoadingComponent, SetupWizardModalComponent, ImportBackupModalComponent, FeedbackPageComponent, ExportBackupModalComponent, ExportBackupTreeComponent],
      providers: stubServiceProviders
    })
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
