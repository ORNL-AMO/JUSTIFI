import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySettingsComponent } from './facility-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedFacilityFormsModule } from 'src/app/shared/shared-facility-forms/shared-facility-forms.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('FacilitySettingsComponent', () => {
  let component: FacilitySettingsComponent;
  let fixture: ComponentFixture<FacilitySettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, SharedFacilityFormsModule],
      declarations: [FacilitySettingsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
