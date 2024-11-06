import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityListItemComponent } from './facility-list-item.component';

describe('FacilityListItemComponent', () => {
  let component: FacilityListItemComponent;
  let fixture: ComponentFixture<FacilityListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
