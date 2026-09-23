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
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { EmailListSubscribeComponent } from './core-components/email-list-subscribe/email-list-subscribe.component';
import {
  EmailListSubscribeService,
  EmailSubscriptionStatus
} from './core-components/email-list-subscribe/email-list-subscribe.service';

describe('AppComponent', () => {

  beforeEach(() => {
    const submittedStatus = new BehaviorSubject<EmailSubscriptionStatus>(undefined);
    const emailListSubscribeService = jasmine.createSpyObj<EmailListSubscribeService>(
      'EmailListSubscribeService',
      ['checkEmailValid', 'submitSubscriberEmail'],
      { submittedStatus }
    );

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, FormsModule],
      declarations: [
        AppComponent,
        NavbarComponent,
        WelcomeComponent,
        LoadingComponent,
        SetupWizardModalComponent,
        ImportBackupModalComponent,
        FeedbackPageComponent,
        ExportBackupModalComponent,
        ExportBackupTreeComponent,
        EmailListSubscribeComponent
      ],
      providers: [
        ...stubServiceProviders,
        { provide: EmailListSubscribeService, useValue: emailListSubscribeService }
      ]
    })
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
