import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentDiscoveryHelpComponent } from './process-equipment-discovery-help.component';

describe('ProcessEquipmentDiscoveryHelpComponent', () => {
  let component: ProcessEquipmentDiscoveryHelpComponent;
  let fixture: ComponentFixture<ProcessEquipmentDiscoveryHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessEquipmentDiscoveryHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentDiscoveryHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
