import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentSustainabilityComponent } from './energy-equipment-sustainability.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('EnergyEquipmentSustainabilityComponent', () => {
  let component: EnergyEquipmentSustainabilityComponent;
  let fixture: ComponentFixture<EnergyEquipmentSustainabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [EnergyEquipmentSustainabilityComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentSustainabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
