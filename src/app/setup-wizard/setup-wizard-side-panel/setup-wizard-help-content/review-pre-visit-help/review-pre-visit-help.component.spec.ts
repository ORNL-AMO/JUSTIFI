import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPreVisitHelpComponent } from './review-pre-visit-help.component';

describe('ReviewPreVisitHelpComponent', () => {
  let component: ReviewPreVisitHelpComponent;
  let fixture: ComponentFixture<ReviewPreVisitHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewPreVisitHelpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewPreVisitHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
