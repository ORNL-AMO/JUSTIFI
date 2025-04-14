import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomReportHelpComponent } from './custom-report-help.component';

describe('CustomReportHelpComponent', () => {
  let component: CustomReportHelpComponent;
  let fixture: ComponentFixture<CustomReportHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomReportHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomReportHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
