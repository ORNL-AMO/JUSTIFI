import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentFormComponent } from './process-equipment-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';

describe('ProcessEquipmentFormComponent', () => {
  let component: ProcessEquipmentFormComponent;
  let fixture: ComponentFixture<ProcessEquipmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, FormsModule],
      declarations: [ProcessEquipmentFormComponent],
      providers: stubServiceProviders
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProcessEquipmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
