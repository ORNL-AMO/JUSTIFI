import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiSearchFormComponent } from './company-kpi-search-form.component';

describe('CompanyKpiSearchFormComponent', () => {
  let component: CompanyKpiSearchFormComponent;
  let fixture: ComponentFixture<CompanyKpiSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyKpiSearchFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyKpiSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
