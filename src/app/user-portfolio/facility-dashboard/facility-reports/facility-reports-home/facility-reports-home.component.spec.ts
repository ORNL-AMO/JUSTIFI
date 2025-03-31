import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityReportsHomeComponent } from './facility-reports-home.component';

describe('FacilityReportsHomeComponent', () => {
  let component: FacilityReportsHomeComponent;
  let fixture: ComponentFixture<FacilityReportsHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityReportsHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityReportsHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
