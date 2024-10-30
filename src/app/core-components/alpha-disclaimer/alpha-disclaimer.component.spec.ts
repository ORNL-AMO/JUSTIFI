import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlphaDisclaimerComponent } from './alpha-disclaimer.component';

describe('AlphaDisclaimerComponent', () => {
  let component: AlphaDisclaimerComponent;
  let fixture: ComponentFixture<AlphaDisclaimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlphaDisclaimerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlphaDisclaimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
