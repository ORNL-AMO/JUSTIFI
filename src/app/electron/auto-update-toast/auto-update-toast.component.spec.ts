import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoUpdateToastComponent } from './auto-update-toast.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AutoUpdateToastComponent', () => {
  let component: AutoUpdateToastComponent;
  let fixture: ComponentFixture<AutoUpdateToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [AutoUpdateToastComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoUpdateToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
