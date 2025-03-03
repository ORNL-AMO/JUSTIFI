import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiSelectHelpComponent } from './company-kpi-select-help.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('CompanyKpiSelectHelpComponent', () => {
  let component: CompanyKpiSelectHelpComponent;
  let fixture: ComponentFixture<CompanyKpiSelectHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CompanyKpiSelectHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompanyKpiSelectHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
