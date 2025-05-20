import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImportBackupModalComponent } from '../backup-modal/import-backup-modal/import-backup-modal.component';
import { FeedbackPageComponent } from '../feedback-page/feedback-page.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { ExportBackupModalComponent } from '../backup-modal/export-backup-modal/export-backup-modal.component';
import { ExportBackupTreeComponent } from '../backup-modal/export-backup-modal/export-backup-tree/export-backup-tree.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule, FormsModule, HelperPipesModule],
      declarations: [NavbarComponent, ImportBackupModalComponent, FeedbackPageComponent, ExportBackupModalComponent, ExportBackupTreeComponent],
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
