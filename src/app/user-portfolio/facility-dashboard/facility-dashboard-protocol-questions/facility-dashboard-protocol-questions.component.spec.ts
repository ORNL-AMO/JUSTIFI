import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityDashboardProtocolQuestionsComponent } from './facility-dashboard-protocol-questions.component';

describe('FacilityDashboardProtocolQuestionsComponent', () => {
  let component: FacilityDashboardProtocolQuestionsComponent;
  let fixture: ComponentFixture<FacilityDashboardProtocolQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityDashboardProtocolQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityDashboardProtocolQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
