import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySetupHelpComponent } from './facility-setup-help.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('FacilitySetupHelpComponent', () => {
  let component: FacilitySetupHelpComponent;
  let fixture: ComponentFixture<FacilitySetupHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [FacilitySetupHelpComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacilitySetupHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
