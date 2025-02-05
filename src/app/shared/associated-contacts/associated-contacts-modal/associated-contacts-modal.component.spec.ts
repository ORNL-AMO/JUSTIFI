import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedContactsModalComponent } from './associated-contacts-modal.component';

describe('AssociatedContactsModalComponent', () => {
  let component: AssociatedContactsModalComponent;
  let fixture: ComponentFixture<AssociatedContactsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociatedContactsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedContactsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
