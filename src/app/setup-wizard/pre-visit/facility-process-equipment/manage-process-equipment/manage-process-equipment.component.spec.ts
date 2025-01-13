import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProcessEquipmentComponent } from './manage-process-equipment.component';

describe('ManageProcessEquipmentComponent', () => {
  let component: ManageProcessEquipmentComponent;
  let fixture: ComponentFixture<ManageProcessEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageProcessEquipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageProcessEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
