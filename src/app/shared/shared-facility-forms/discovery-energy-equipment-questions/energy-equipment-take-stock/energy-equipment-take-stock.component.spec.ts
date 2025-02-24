import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentTakeStockComponent } from './energy-equipment-take-stock.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('EnergyEquipmentTakeStockComponent', () => {
  let component: EnergyEquipmentTakeStockComponent;
  let fixture: ComponentFixture<EnergyEquipmentTakeStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [EnergyEquipmentTakeStockComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentTakeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
