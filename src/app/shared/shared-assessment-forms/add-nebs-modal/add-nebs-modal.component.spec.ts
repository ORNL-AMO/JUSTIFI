import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNebsModalComponent } from './add-nebs-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { NebsDatabaseModule } from 'src/app/nebs-database/nebs-database.module';
import { stubServiceProviders } from 'src/app/spec-helpers/spec-test-service-stub';
import { SharedDataService } from '../../shared-services/shared-data.service';
import { ContactContext, IdbContact } from 'src/app/models/contact';

describe('AddNebsModalComponent', () => {
  let component: AddNebsModalComponent;
  let fixture: ComponentFixture<AddNebsModalComponent>;


  let sharedDataService: Partial<SharedDataService> = {
    createAssessmentModalOpen: new BehaviorSubject<boolean>(false),
    sidebarOpen: new BehaviorSubject<boolean>(false),
    displayAddNebsModal: new BehaviorSubject<{ assessmentId: string, energyOpportunityId: string }>({
      assessmentId: '123',
      energyOpportunityId: '123'
    }),
    displayContactModal: new BehaviorSubject<{ context: ContactContext, viewContact: IdbContact, contextGuid: string, companyId: string }>({
      context: 'assessment',
      viewContact: undefined,
      contextGuid: '123',
      companyId: '123'
    })
  }
  let tmpStubServiceProviders: Array<{ provide: any, useValue: any }> = new Array();
  stubServiceProviders.forEach(serviceProvider => {
    if (serviceProvider.provide == SharedDataService) {
      tmpStubServiceProviders.push({
        provide: SharedDataService,
        useValue: sharedDataService
      });
    } else {
      tmpStubServiceProviders.push(serviceProvider);
    }
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontAwesomeModule, FormsModule, NebsDatabaseModule],
      declarations: [AddNebsModalComponent],
      providers: tmpStubServiceProviders
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddNebsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
