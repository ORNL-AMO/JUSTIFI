import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentTakeStockComponent } from './process-equipment-take-stock.component';

describe('ProcessEquipmentTakeStockComponent', () => {
  let component: ProcessEquipmentTakeStockComponent;
  let fixture: ComponentFixture<ProcessEquipmentTakeStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessEquipmentTakeStockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentTakeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
