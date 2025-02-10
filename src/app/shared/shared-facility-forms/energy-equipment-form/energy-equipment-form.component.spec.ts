import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyEquipmentFormComponent } from './energy-equipment-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { AssociatedContactsModule } from '../../associated-contacts/associated-contacts.module';

describe('EnergyEquipmentFormComponent', () => {
  let component: EnergyEquipmentFormComponent;
  let fixture: ComponentFixture<EnergyEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, FormsModule, AssociatedContactsModule],
      declarations: [EnergyEquipmentFormComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(EnergyEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
