import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentSustainablityComponent } from './process-equipment-sustainablity.component';

describe('ProcessEquipmentSustainablityComponent', () => {
  let component: ProcessEquipmentSustainablityComponent;
  let fixture: ComponentFixture<ProcessEquipmentSustainablityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessEquipmentSustainablityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentSustainablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
