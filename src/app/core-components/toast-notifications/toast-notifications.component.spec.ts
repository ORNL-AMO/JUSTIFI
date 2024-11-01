import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastNotificationsComponent } from './toast-notifications.component';

describe('ToastNotificationsComponent', () => {
  let component: ToastNotificationsComponent;
  let fixture: ComponentFixture<ToastNotificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastNotificationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
