import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaybackWaterfallChartComponent } from './payback-waterfall-chart.component';

describe('PaybackWaterfallChartComponent', () => {
  let component: PaybackWaterfallChartComponent;
  let fixture: ComponentFixture<PaybackWaterfallChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaybackWaterfallChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaybackWaterfallChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
