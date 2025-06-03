import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportBackupTreeComponent } from './export-backup-tree.component';

describe('ExportBackupTreeComponent', () => {
  let component: ExportBackupTreeComponent;
  let fixture: ComponentFixture<ExportBackupTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExportBackupTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportBackupTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
