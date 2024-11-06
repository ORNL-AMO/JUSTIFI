import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnSiteVisitSavingsChartComponent } from './on-site-visit-savings-chart.component';

describe('OnSiteVisitSavingsChartComponent', () => {
  let component: OnSiteVisitSavingsChartComponent;
  let fixture: ComponentFixture<OnSiteVisitSavingsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OnSiteVisitSavingsChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnSiteVisitSavingsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
