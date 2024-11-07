import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardHomeComponent } from './facility-dashboard-home.component';

describe('FacilityDashboardHomeComponent', () => {
  let component: FacilityDashboardHomeComponent;
  let fixture: ComponentFixture<FacilityDashboardHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityDashboardHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDashboardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
