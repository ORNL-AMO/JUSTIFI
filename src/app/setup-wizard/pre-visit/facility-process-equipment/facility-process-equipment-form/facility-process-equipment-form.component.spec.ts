import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityProcessEquipmentFormComponent } from './facility-process-equipment-form.component';

describe('FacilityProcessEquipmentFormComponent', () => {
  let component: FacilityProcessEquipmentFormComponent;
  let fixture: ComponentFixture<FacilityProcessEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityProcessEquipmentFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityProcessEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
