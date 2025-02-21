import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryEnergyEquipmentQuestionsComponent } from './discovery-energy-equipment-questions.component';

describe('DiscoveryEnergyEquipmentQuestionsComponent', () => {
  let component: DiscoveryEnergyEquipmentQuestionsComponent;
  let fixture: ComponentFixture<DiscoveryEnergyEquipmentQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoveryEnergyEquipmentQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoveryEnergyEquipmentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
