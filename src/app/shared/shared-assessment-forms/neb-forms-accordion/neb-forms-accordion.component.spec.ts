import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebFormsAccordionComponent } from './neb-forms-accordion.component';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { BehaviorSubject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';
import { ChangeDetectorRef } from '@angular/core';
import { BootstrapService } from 'src/app/shared/shared-services/bootstrap.service';

describe('NebFormsAccordionComponent', () => {
  let component: NebFormsAccordionComponent;
  let fixture: ComponentFixture<NebFormsAccordionComponent>;

  let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([])
  };

  let localStorageDataService: Partial<LocalStorageDataService> = {};
  let cd: Partial<ChangeDetectorRef> = {};
  let bootstrapService: Partial<BootstrapService> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [NebFormsAccordionComponent],
      providers: [
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: LocalStorageDataService, useValue: localStorageDataService },
        { provide: ChangeDetectorRef, useValue: cd },
        { provide: BootstrapService, useValue: bootstrapService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NebFormsAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
