import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingService } from '../loading/loading.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BackupDataService } from 'src/app/shared/shared-services/backup-data.service';
import { ImportBackupModalComponent } from '../import-backup-modal/import-backup-modal.component';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FeedbackPageComponent } from '../feedback-page/feedback-page.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    let userDbService: Partial<UserIdbService> = {};
    let loadingService: Partial<LoadingService> = {};
    let backupDataService: Partial<BackupDataService> = {};
    let dbChangesService: Partial<DbChangesService> = {};
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FontAwesomeModule],
      declarations: [NavbarComponent, ImportBackupModalComponent, FeedbackPageComponent],
      providers: [
        { provide: UserIdbService, useValue: userDbService },
        { provide: LoadingService, useValue: loadingService },
        { provide: BackupDataService, useValue: backupDataService},
        { provide: DbChangesService, useValue: dbChangesService}
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
