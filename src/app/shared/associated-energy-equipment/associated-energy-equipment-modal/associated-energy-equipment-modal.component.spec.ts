import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedEnergyEquipmentModalComponent } from './associated-energy-equipment-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssociatedEnergyEquipmentModalComponent', () => {
  let component: AssociatedEnergyEquipmentModalComponent;
  let fixture: ComponentFixture<AssociatedEnergyEquipmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [AssociatedEnergyEquipmentModalComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedEnergyEquipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
