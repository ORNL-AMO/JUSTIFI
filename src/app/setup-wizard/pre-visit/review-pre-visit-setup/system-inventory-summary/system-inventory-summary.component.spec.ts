import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInventorySummaryComponent } from './system-inventory-summary.component';

describe('SystemInventorySummaryComponent', () => {
  let component: SystemInventorySummaryComponent;
  let fixture: ComponentFixture<SystemInventorySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemInventorySummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemInventorySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
