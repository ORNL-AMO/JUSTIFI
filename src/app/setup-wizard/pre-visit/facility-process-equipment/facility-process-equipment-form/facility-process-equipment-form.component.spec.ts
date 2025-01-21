import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityProcessEquipmentFormComponent } from './facility-process-equipment-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedFacilityFormsModule } from 'src/app/shared/shared-facility-forms/shared-facility-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('FacilityProcessEquipmentFormComponent', () => {
  let component: FacilityProcessEquipmentFormComponent;
  let fixture: ComponentFixture<FacilityProcessEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedFacilityFormsModule],
      declarations: [FacilityProcessEquipmentFormComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityProcessEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
