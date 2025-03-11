import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentOperationsComponent } from './process-equipment-operations.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ProcessEquipmentOperationsComponent', () => {
  let component: ProcessEquipmentOperationsComponent;
  let fixture: ComponentFixture<ProcessEquipmentOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [ProcessEquipmentOperationsComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
