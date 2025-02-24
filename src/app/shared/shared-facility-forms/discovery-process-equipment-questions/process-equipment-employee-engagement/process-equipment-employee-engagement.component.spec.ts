import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentEmployeeEngagementComponent } from './process-equipment-employee-engagement.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ProcessEquipmentEmployeeEngagementComponent', () => {
  let component: ProcessEquipmentEmployeeEngagementComponent;
  let fixture: ComponentFixture<ProcessEquipmentEmployeeEngagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, FontAwesomeModule],
      declarations: [ProcessEquipmentEmployeeEngagementComponent],
      providers: stubServiceProviders
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
