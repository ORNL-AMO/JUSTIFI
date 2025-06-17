import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeSlideshowComponent } from './welcome-slideshow.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('WelcomeSlideshowComponent', () => {
  let component: WelcomeSlideshowComponent;
  let fixture: ComponentFixture<WelcomeSlideshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [WelcomeSlideshowComponent],
      providers: stubServiceProviders
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
