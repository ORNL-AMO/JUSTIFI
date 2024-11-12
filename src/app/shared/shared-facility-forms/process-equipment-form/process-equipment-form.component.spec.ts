import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEquipmentFormComponent } from './process-equipment-form.component';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { getNewIdbProcessEquipment, IdbProcessEquipment } from 'src/app/models/processEquipment';
import { BehaviorSubject } from 'rxjs';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';

describe('ProcessEquipmentFormComponent', () => {
  let component: ProcessEquipmentFormComponent;
  let fixture: ComponentFixture<ProcessEquipmentFormComponent>;

  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };
  let processEquipmentIdbService: Partial<ProcessEquipmentIdbService> = {
    processEquipments: new BehaviorSubject<Array<IdbProcessEquipment>>([]),
    getByGuid: () => { return getNewIdbProcessEquipment('', '', '') }
  };
  let dbChangesService: Partial<DbChangesService> = {}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, HelperPipesModule, FormsModule],
      declarations: [ProcessEquipmentFormComponent],
      providers: [
        { provide: DbChangesService, useValue: dbChangesService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: ProcessEquipmentIdbService, useValue: processEquipmentIdbService }
      ]
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
