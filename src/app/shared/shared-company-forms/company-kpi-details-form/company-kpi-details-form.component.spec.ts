import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyKpiDetailsFormComponent } from './company-kpi-details-form.component';

describe('CompanyKpiDetailsFormComponent', () => {
  let component: CompanyKpiDetailsFormComponent;
  let fixture: ComponentFixture<CompanyKpiDetailsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyKpiDetailsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyKpiDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
