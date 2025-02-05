import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedContactsButtonsComponent } from './associated-contacts-buttons.component';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';

describe('AssociatedContactsButtonsComponent', () => {
  let component: AssociatedContactsButtonsComponent;
  let fixture: ComponentFixture<AssociatedContactsButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [AssociatedContactsButtonsComponent],
      providers: stubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociatedContactsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
