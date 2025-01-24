import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityEnergyEquipmentFormComponent } from './facility-energy-equipment-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { SharedFacilityFormsModule } from 'src/app/shared/shared-facility-forms/shared-facility-forms.module';

describe('FacilityEnergyEquipmentFormComponent', () => {
  let component: FacilityEnergyEquipmentFormComponent;
  let fixture: ComponentFixture<FacilityEnergyEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedFacilityFormsModule],
      declarations: [FacilityEnergyEquipmentFormComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityEnergyEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
