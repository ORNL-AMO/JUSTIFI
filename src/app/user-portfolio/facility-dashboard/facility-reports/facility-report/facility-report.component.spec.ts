import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityReportComponent } from './facility-report.component';
import { RouterModule } from '@angular/router';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('FacilityReportComponent', () => {
  let component: FacilityReportComponent;
  let fixture: ComponentFixture<FacilityReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule, FontAwesomeModule],
      declarations: [FacilityReportComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
