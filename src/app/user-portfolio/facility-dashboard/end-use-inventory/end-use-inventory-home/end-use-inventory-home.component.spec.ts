import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUseInventoryHomeComponent } from './end-use-inventory-home.component';

describe('EndUseInventoryHomeComponent', () => {
  let component: EndUseInventoryHomeComponent;
  let fixture: ComponentFixture<EndUseInventoryHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndUseInventoryHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndUseInventoryHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
