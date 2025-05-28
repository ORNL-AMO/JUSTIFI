import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSlideshowComponent } from './welcome-slideshow.component';

describe('WelcomeSlideshowComponent', () => {
  let component: WelcomeSlideshowComponent;
  let fixture: ComponentFixture<WelcomeSlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WelcomeSlideshowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeSlideshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
