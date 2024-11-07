import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyPerformanceIndicatorsComponent } from './company-performance-indicators.component';

describe('CompanyPerformanceIndicatorsComponent', () => {
  let component: CompanyPerformanceIndicatorsComponent;
  let fixture: ComponentFixture<CompanyPerformanceIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyPerformanceIndicatorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyPerformanceIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
