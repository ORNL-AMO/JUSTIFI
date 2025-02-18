import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollupReportHelpComponent } from './rollup-report-help.component';

describe('RollupReportHelpComponent', () => {
  let component: RollupReportHelpComponent;
  let fixture: ComponentFixture<RollupReportHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RollupReportHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RollupReportHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
