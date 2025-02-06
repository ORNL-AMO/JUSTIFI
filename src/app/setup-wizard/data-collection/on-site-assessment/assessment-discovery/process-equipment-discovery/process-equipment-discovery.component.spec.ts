import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentDiscoveryComponent } from './process-equipment-discovery.component';

describe('ProcessEquipmentDiscoveryComponent', () => {
  let component: ProcessEquipmentDiscoveryComponent;
  let fixture: ComponentFixture<ProcessEquipmentDiscoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessEquipmentDiscoveryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentDiscoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
