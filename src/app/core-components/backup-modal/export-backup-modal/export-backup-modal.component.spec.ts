import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBackupModalComponent } from './export-backup-modal.component';

describe('ExportBackupModalComponent', () => {
  let component: ExportBackupModalComponent;
  let fixture: ComponentFixture<ExportBackupModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportBackupModalComponent]
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
