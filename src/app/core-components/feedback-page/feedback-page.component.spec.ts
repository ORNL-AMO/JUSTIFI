import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackPageComponent } from './feedback-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('FeedbackPageComponent', () => {
  let component: FeedbackPageComponent;
  let fixture: ComponentFixture<FeedbackPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [FeedbackPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
