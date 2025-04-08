import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityReportsComponent } from './facility-reports.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('FacilityReportsComponent', () => {
  let component: FacilityReportsComponent;
  let fixture: ComponentFixture<FacilityReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, FontAwesomeModule],
      declarations: [FacilityReportsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
