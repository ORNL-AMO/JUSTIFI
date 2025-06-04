import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentSustainabilityComponent } from './process-equipment-sustainability.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ProcessEquipmentSustainabilityComponent', () => {
  let component: ProcessEquipmentSustainabilityComponent;
  let fixture: ComponentFixture<ProcessEquipmentSustainabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [ProcessEquipmentSustainabilityComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentSustainabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
