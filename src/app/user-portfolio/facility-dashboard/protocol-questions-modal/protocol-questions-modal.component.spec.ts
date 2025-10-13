import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolQuestionsModalComponent } from './protocol-questions-modal.component';

describe('ProtocolQuestionsModalComponent', () => {
  let component: ProtocolQuestionsModalComponent;
  let fixture: ComponentFixture<ProtocolQuestionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProtocolQuestionsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtocolQuestionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
