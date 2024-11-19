import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactsSetupComponent } from './company-contacts-setup.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbUser, getNewIdbUser } from 'src/app/models/user';
import { BehaviorSubject } from 'rxjs';
import { IdbCompany, getNewIdbCompany } from 'src/app/models/company';
import { IdbFacility, getNewIdbFacility } from 'src/app/models/facility';
import { FormsModule } from '@angular/forms';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit, getNewIdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { ChangeDetectorRef } from '@angular/core';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';
import { SharedCompanyFormsModule } from 'src/app/shared/shared-company-forms/shared-company-forms.module';
import { CompanyContactsSetupFormComponent } from './company-contacts-setup-form/company-contacts-setup-form.component';

describe('CompanyContactsSetupComponent', () => {
  let component: CompanyContactsSetupComponent;
  let fixture: ComponentFixture<CompanyContactsSetupComponent>;
  let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(getNewIdbUser())
  };
  let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([]),
    selectedCompany: new BehaviorSubject<IdbCompany>(getNewIdbCompany(''))
  };
  let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([]),
    selectedFacility: new BehaviorSubject<IdbFacility>(getNewIdbFacility('', ''))
  };

  let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(getNewIdbOnSiteVisit('', '', ''))
  };

  let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([])
  };

  let localStorageDataService: Partial<LocalStorageDataService> = {};
  let cd: Partial<ChangeDetectorRef> = {};
  let bootstrapService: Partial<BootstrapService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, SharedCompanyFormsModule],
      declarations: [CompanyContactsSetupComponent, CompanyContactsSetupFormComponent],
      providers: [
        { provide: UserIdbService, useValue: userIdbService },
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: LocalStorageDataService, useValue: localStorageDataService },
        { provide: ChangeDetectorRef, useValue: cd },
        { provide: BootstrapService, useValue: bootstrapService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CompanyContactsSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
