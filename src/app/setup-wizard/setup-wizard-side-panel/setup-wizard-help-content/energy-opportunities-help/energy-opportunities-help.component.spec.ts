import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyOpportunitiesHelpComponent } from './energy-opportunities-help.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('EnergyOpportunitiesHelpComponent', () => {
  let component: EnergyOpportunitiesHelpComponent;
  let fixture: ComponentFixture<EnergyOpportunitiesHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [EnergyOpportunitiesHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnergyOpportunitiesHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
