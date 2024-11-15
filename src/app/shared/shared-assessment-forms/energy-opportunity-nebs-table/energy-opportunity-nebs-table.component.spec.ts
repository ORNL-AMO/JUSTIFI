import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyOpportunityNebsTableComponent } from './energy-opportunity-nebs-table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('EnergyOpportunityNebsTableComponent', () => {
  let component: EnergyOpportunityNebsTableComponent;
  let fixture: ComponentFixture<EnergyOpportunityNebsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [EnergyOpportunityNebsTableComponent],
      providers: stubServiceProviders
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
