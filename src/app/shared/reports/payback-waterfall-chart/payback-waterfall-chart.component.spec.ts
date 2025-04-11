import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaybackWaterfallChartComponent } from './payback-waterfall-chart.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('PaybackWaterfallChartComponent', () => {
  let component: PaybackWaterfallChartComponent;
  let fixture: ComponentFixture<PaybackWaterfallChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaybackWaterfallChartComponent],
      providers: stubServiceProviders
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
