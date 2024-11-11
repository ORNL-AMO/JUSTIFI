import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilitySetupFormComponent } from './facility-setup-form.component';

describe('FacilitySetupFormComponent', () => {
  let component: FacilitySetupFormComponent;
  let fixture: ComponentFixture<FacilitySetupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilitySetupFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilitySetupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
