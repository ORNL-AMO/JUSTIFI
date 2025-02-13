import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentEmployeeEngagementComponent } from './process-equipment-employee-engagement.component';

describe('ProcessEquipmentEmployeeEngagementComponent', () => {
  let component: ProcessEquipmentEmployeeEngagementComponent;
  let fixture: ComponentFixture<ProcessEquipmentEmployeeEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProcessEquipmentEmployeeEngagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentEmployeeEngagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
