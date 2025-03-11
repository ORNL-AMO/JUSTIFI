import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentSustainablityComponent } from './process-equipment-sustainablity.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ProcessEquipmentSustainablityComponent', () => {
  let component: ProcessEquipmentSustainablityComponent;
  let fixture: ComponentFixture<ProcessEquipmentSustainablityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [ProcessEquipmentSustainablityComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentSustainablityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
