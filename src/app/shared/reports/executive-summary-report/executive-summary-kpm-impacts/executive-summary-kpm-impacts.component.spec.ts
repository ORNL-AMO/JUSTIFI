import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveSummaryKpmImpactsComponent } from './executive-summary-kpm-impacts.component';

describe('ExecutiveSummaryKpmImpactsComponent', () => {
  let component: ExecutiveSummaryKpmImpactsComponent;
  let fixture: ComponentFixture<ExecutiveSummaryKpmImpactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExecutiveSummaryKpmImpactsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveSummaryKpmImpactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
