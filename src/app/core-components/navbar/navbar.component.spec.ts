import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImportBackupModalComponent } from '../import-backup-modal/import-backup-modal.component';
import { FeedbackPageComponent } from '../feedback-page/feedback-page.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FormsModule } from '@angular/forms';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, FormsModule],
      declarations: [NavbarComponent, ImportBackupModalComponent, FeedbackPageComponent],
      providers: stubServiceProviders
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
