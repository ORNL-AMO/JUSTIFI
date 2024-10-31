import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponent } from './help.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [HelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
