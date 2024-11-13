import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcknowledgmentsComponent } from './acknowledgments.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('AcknowledgmentsComponent', () => {
  let component: AcknowledgmentsComponent;
  let fixture: ComponentFixture<AcknowledgmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [AcknowledgmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcknowledgmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
