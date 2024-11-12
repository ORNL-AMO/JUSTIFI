import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentEnergyOpportunitiesHomeComponent } from './assessment-energy-opportunities-home.component';

describe('AssessmentEnergyOpportunitiesHomeComponent', () => {
  let component: AssessmentEnergyOpportunitiesHomeComponent;
  let fixture: ComponentFixture<AssessmentEnergyOpportunitiesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessmentEnergyOpportunitiesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssessmentEnergyOpportunitiesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
