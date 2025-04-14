import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOnSiteVisitsComponent } from './manage-on-site-visits.component';

describe('ManageOnSiteVisitsComponent', () => {
  let component: ManageOnSiteVisitsComponent;
  let fixture: ComponentFixture<ManageOnSiteVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageOnSiteVisitsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageOnSiteVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
