import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StakeholderReportComponent } from './stakeholder-report.component';

describe('StakeholderReportComponent', () => {
  let component: StakeholderReportComponent;
  let fixture: ComponentFixture<StakeholderReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StakeholderReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StakeholderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
