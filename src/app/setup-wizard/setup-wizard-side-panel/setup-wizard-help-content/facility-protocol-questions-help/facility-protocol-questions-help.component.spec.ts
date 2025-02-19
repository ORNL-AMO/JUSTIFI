import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityProtocolQuestionsHelpComponent } from './facility-protocol-questions-help.component';

describe('FacilityProtocolQuestionsHelpComponent', () => {
  let component: FacilityProtocolQuestionsHelpComponent;
  let fixture: ComponentFixture<FacilityProtocolQuestionsHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacilityProtocolQuestionsHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityProtocolQuestionsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
