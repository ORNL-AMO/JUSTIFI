import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEnergyOpportunitiesComponent } from './assessment-energy-opportunities.component';

describe('AssessmentEnergyOpportunitiesComponent', () => {
  let component: AssessmentEnergyOpportunitiesComponent;
  let fixture: ComponentFixture<AssessmentEnergyOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentEnergyOpportunitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentEnergyOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
