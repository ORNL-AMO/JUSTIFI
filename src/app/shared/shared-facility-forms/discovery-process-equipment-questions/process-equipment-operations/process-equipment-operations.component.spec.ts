import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentOperationsComponent } from './process-equipment-operations.component';

describe('ProcessEquipmentOperationsComponent', () => {
  let component: ProcessEquipmentOperationsComponent;
  let fixture: ComponentFixture<ProcessEquipmentOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessEquipmentOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
