import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastNotificationsComponent } from './toast-notifications.component';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

describe('ToastNotificationsComponent', () => {
  let component: ToastNotificationsComponent;
  let fixture: ComponentFixture<ToastNotificationsComponent>;

  let localStorageDataService: Partial<LocalStorageDataService> = {}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageDataService, useValue: localStorageDataService }
      ],
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
