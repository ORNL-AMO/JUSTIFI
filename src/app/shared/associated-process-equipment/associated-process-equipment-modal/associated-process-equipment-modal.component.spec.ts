import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedProcessEquipmentModalComponent } from './associated-process-equipment-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../../helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('AssociatedProcessEquipmentModalComponent', () => {
  let component: AssociatedProcessEquipmentModalComponent;
  let fixture: ComponentFixture<AssociatedProcessEquipmentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [AssociatedProcessEquipmentModalComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatedProcessEquipmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
