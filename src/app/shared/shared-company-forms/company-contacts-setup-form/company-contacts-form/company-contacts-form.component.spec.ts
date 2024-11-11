import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsFormComponent } from './company-contacts-form.component';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact, getNewIdbContact } from 'src/app/models/contact';
import { BehaviorSubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from 'src/app/shared/helper-pipes/helper-pipes.module';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { ChangeDetectorRef } from '@angular/core';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';

describe('CompanyContactsFormComponent', () => {
  let component: CompanyContactsFormComponent;
  let fixture: ComponentFixture<CompanyContactsFormComponent>;


  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([]),
    getContactByGuid: () => {
      return getNewIdbContact('', '')
    }
  };
  let localStorageDataService: Partial<LocalStorageDataService> = {};
  let cd: Partial<ChangeDetectorRef> = {};
  let bootstrapService: Partial<BootstrapService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, HelperPipesModule],
      declarations: [CompanyContactsFormComponent],
      providers: [
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: LocalStorageDataService, useValue: localStorageDataService },
        { provide: ChangeDetectorRef, useValue: cd },
        { provide: BootstrapService, useValue: bootstrapService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyContactsFormComponent);
    component = fixture.componentInstance;
    component.contactGuid = '';
    component.accordionGuid = '';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
