import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentTreeComponent } from './equipment-tree.component';

describe('EquipmentTreeComponent', () => {
  let component: EquipmentTreeComponent;
  let fixture: ComponentFixture<EquipmentTreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentTreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipmentTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
