import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomReportComponent } from './custom-report.component';

describe('CustomReportComponent', () => {
  let component: CustomReportComponent;
  let fixture: ComponentFixture<CustomReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
