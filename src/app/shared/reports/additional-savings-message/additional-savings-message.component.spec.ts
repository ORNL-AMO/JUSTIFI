import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalSavingsMessageComponent } from './additional-savings-message.component';

describe('AdditionalSavingsMessageComponent', () => {
  let component: AdditionalSavingsMessageComponent;
  let fixture: ComponentFixture<AdditionalSavingsMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdditionalSavingsMessageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalSavingsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
