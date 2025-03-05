import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentTakeStockComponent } from './process-equipment-take-stock.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ProcessEquipmentTakeStockComponent', () => {
  let component: ProcessEquipmentTakeStockComponent;
  let fixture: ComponentFixture<ProcessEquipmentTakeStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule],
      declarations: [ProcessEquipmentTakeStockComponent],
      providers: stubServiceProviders
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentTakeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
