import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDashboardNavComponent } from './company-dashboard-nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterTestingModule } from '@angular/router/testing';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('CompanyDashboardNavComponent', () => {
  let component: CompanyDashboardNavComponent;
  let fixture: ComponentFixture<CompanyDashboardNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, RouterTestingModule],
      declarations: [CompanyDashboardNavComponent],
      providers: stubServiceProviders
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
