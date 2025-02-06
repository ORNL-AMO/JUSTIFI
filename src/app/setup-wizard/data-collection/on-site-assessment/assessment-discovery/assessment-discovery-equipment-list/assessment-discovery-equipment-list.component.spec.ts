import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentDiscoveryEquipmentListComponent } from './assessment-discovery-equipment-list.component';

describe('AssessmentDiscoveryEquipmentListComponent', () => {
  let component: AssessmentDiscoveryEquipmentListComponent;
  let fixture: ComponentFixture<AssessmentDiscoveryEquipmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentDiscoveryEquipmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentDiscoveryEquipmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
