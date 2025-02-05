import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedProcessEquipmentButtonsComponent } from './associated-process-equipment-buttons.component';

describe('AssociatedProcessEquipmentButtonsComponent', () => {
  let component: AssociatedProcessEquipmentButtonsComponent;
  let fixture: ComponentFixture<AssociatedProcessEquipmentButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociatedProcessEquipmentButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedProcessEquipmentButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
