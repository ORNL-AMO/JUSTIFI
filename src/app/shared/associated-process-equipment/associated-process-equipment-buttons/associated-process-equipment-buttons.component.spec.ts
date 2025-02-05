import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedProcessEquipmentButtonsComponent } from './associated-process-equipment-buttons.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssociatedProcessEquipmentButtonsComponent', () => {
  let component: AssociatedProcessEquipmentButtonsComponent;
  let fixture: ComponentFixture<AssociatedProcessEquipmentButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [AssociatedProcessEquipmentButtonsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedProcessEquipmentButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
