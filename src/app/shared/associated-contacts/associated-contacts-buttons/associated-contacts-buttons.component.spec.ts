import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedContactsButtonsComponent } from './associated-contacts-buttons.component';

describe('AssociatedContactsButtonsComponent', () => {
  let component: AssociatedContactsButtonsComponent;
  let fixture: ComponentFixture<AssociatedContactsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociatedContactsButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedContactsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
