import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoUpdateToastComponent } from './auto-update-toast.component';

describe('AutoUpdateToastComponent', () => {
  let component: AutoUpdateToastComponent;
  let fixture: ComponentFixture<AutoUpdateToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AutoUpdateToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoUpdateToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
