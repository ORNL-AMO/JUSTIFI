import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityProtocolQuestionsComponent } from './facility-protocol-questions.component';

describe('FacilityProtocolQuestionsComponent', () => {
  let component: FacilityProtocolQuestionsComponent;
  let fixture: ComponentFixture<FacilityProtocolQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityProtocolQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityProtocolQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
