import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedEnergyEquipmentButtonsComponent } from './associated-energy-equipment-buttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssociatedEnergyEquipmentButtonsComponent', () => {
  let component: AssociatedEnergyEquipmentButtonsComponent;
  let fixture: ComponentFixture<AssociatedEnergyEquipmentButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [AssociatedEnergyEquipmentButtonsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedEnergyEquipmentButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
