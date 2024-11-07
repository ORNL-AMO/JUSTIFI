import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyReportsComponent } from './company-reports.component';

describe('CompanyReportsComponent', () => {
  let component: CompanyReportsComponent;
  let fixture: ComponentFixture<CompanyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompanyReportsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
