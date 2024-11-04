import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KpmDatabaseModalComponent } from './kpm-database-modal.component';

describe('KpmDatabaseModalComponent', () => {
  let component: KpmDatabaseModalComponent;
  let fixture: ComponentFixture<KpmDatabaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KpmDatabaseModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KpmDatabaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
