import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBackupModalComponent } from './export-backup-modal.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { ExportBackupTreeComponent } from './export-backup-tree/export-backup-tree.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';

describe('ExportBackupModalComponent', () => {
  let component: ExportBackupModalComponent;
  let fixture: ComponentFixture<ExportBackupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [ExportBackupModalComponent, ExportBackupTreeComponent],
      providers: stubServiceProviders,
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportBackupModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
