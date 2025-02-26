import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentOperationsComponent } from './energy-equipment-operations.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('EnergyEquipmentOperationsComponent', () => {
  let component: EnergyEquipmentOperationsComponent;
  let fixture: ComponentFixture<EnergyEquipmentOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [EnergyEquipmentOperationsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
