import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardNavComponent } from './facility-dashboard-nav.component';

describe('FacilityDashboardNavComponent', () => {
  let component: FacilityDashboardNavComponent;
  let fixture: ComponentFixture<FacilityDashboardNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityDashboardNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDashboardNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
