import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentHelpComponent } from './energy-equipment-help.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('EnergyEquipmentHelpComponent', () => {
  let component: EnergyEquipmentHelpComponent;
  let fixture: ComponentFixture<EnergyEquipmentHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [EnergyEquipmentHelpComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyEquipmentHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
