import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebContributionsBarChartComponent } from './neb-contributions-bar-chart.component';

describe('NebContributionsBarChartComponent', () => {
  let component: NebContributionsBarChartComponent;
  let fixture: ComponentFixture<NebContributionsBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NebContributionsBarChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NebContributionsBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
