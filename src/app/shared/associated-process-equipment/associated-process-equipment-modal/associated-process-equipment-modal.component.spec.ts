import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedProcessEquipmentModalComponent } from './associated-process-equipment-modal.component';

describe('AssociatedProcessEquipmentModalComponent', () => {
  let component: AssociatedProcessEquipmentModalComponent;
  let fixture: ComponentFixture<AssociatedProcessEquipmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociatedProcessEquipmentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedProcessEquipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
