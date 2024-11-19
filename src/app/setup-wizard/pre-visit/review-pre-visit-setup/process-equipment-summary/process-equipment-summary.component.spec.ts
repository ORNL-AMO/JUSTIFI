import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentSummaryComponent } from './process-equipment-summary.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/_helper-pipes.module';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { BehaviorSubject } from 'rxjs';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';

describe('ProcessEquipmentSummaryComponent', () => {
  let component: ProcessEquipmentSummaryComponent;
  let fixture: ComponentFixture<ProcessEquipmentSummaryComponent>;

  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  let processEquipmentIdbService: Partial<ProcessEquipmentIdbService> = {
    processEquipments: new BehaviorSubject<Array<IdbProcessEquipment>>([])
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule],
      declarations: [ProcessEquipmentSummaryComponent],
      providers: [
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: ProcessEquipmentIdbService, useValue: processEquipmentIdbService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProcessEquipmentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
