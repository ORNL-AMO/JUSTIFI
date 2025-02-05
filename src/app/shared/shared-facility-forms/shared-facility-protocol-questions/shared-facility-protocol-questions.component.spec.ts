import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedFacilityProtocolQuestionsComponent } from './shared-facility-protocol-questions.component';

describe('SharedFacilityProtocolQuestionsComponent', () => {
  let component: SharedFacilityProtocolQuestionsComponent;
  let fixture: ComponentFixture<SharedFacilityProtocolQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SharedFacilityProtocolQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedFacilityProtocolQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
