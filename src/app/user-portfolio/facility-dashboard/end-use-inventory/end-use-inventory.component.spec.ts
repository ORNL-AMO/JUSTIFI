import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUseInventoryComponent } from './end-use-inventory.component';

describe('EndUseInventoryComponent', () => {
  let component: EndUseInventoryComponent;
  let fixture: ComponentFixture<EndUseInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndUseInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EndUseInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
