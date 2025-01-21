import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySetupComponent } from './facility-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedSettingsFormsModule } from 'src/app/shared/shared-settings-forms/shared-settings-forms.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedFacilityFormsModule } from 'src/app/shared/shared-facility-forms/shared-facility-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('FacilitySetupComponent', () => {
  let component: FacilitySetupComponent;
  let fixture: ComponentFixture<FacilitySetupComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedSettingsFormsModule, FormsModule, ReactiveFormsModule, SharedFacilityFormsModule],
      declarations: [FacilitySetupComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilitySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
