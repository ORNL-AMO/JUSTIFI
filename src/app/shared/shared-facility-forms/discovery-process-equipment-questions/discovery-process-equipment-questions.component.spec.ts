import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoveryProcessEquipmentQuestionsComponent } from './discovery-process-equipment-questions.component';

describe('DiscoveryProcessEquipmentQuestionsComponent', () => {
  let component: DiscoveryProcessEquipmentQuestionsComponent;
  let fixture: ComponentFixture<DiscoveryProcessEquipmentQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DiscoveryProcessEquipmentQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscoveryProcessEquipmentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
