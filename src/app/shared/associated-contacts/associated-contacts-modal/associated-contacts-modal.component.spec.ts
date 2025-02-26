import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedContactsModalComponent } from './associated-contacts-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';

describe('AssociatedContactsModalComponent', () => {
  let component: AssociatedContactsModalComponent;
  let fixture: ComponentFixture<AssociatedContactsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [AssociatedContactsModalComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedContactsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
