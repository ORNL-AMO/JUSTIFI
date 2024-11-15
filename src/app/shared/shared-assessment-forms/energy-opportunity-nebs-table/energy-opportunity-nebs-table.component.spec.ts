import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyOpportunityNebsTableComponent } from './energy-opportunity-nebs-table.component';

describe('EnergyOpportunityNebsTableComponent', () => {
  let component: EnergyOpportunityNebsTableComponent;
  let fixture: ComponentFixture<EnergyOpportunityNebsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnergyOpportunityNebsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnergyOpportunityNebsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
