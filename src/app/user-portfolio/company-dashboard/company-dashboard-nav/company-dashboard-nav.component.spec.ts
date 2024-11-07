import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardNavComponent } from './company-dashboard-nav.component';

describe('CompanyDashboardNavComponent', () => {
  let component: CompanyDashboardNavComponent;
  let fixture: ComponentFixture<CompanyDashboardNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyDashboardNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyDashboardNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
