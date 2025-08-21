import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportBackupModalComponent } from './import-backup-modal.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('ImportBackupModalComponent', () => {
  let component: ImportBackupModalComponent;
  let fixture: ComponentFixture<ImportBackupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ImportBackupModalComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportBackupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
