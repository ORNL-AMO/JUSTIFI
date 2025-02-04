import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faContactBook, faTrash, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { IdbContact } from 'src/app/models/contact';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';

@Component({
    selector: 'app-process-equipment-form',
    templateUrl: './process-equipment-form.component.html',
    styleUrl: './process-equipment-form.component.css',
    standalone: false
})
export class ProcessEquipmentFormComponent {
  @Input({ required: true })
  processEquipmentGuid: string;
  @Output('emitInitialized')
  emitInitialized = new EventEmitter<boolean>();

  faTrash: IconDefinition = faTrash;
  faUser: IconDefinition = faUser;
  faContactBook: IconDefinition = faContactBook;

  processEquipment: IdbProcessEquipment;
  displayDeleteModal: boolean = false;
  contacts: Array<IdbContact>;
  contactSub: Subscription;
  constructor(private processEquipmentIdbService: ProcessEquipmentIdbService,
    private dbChangesService: DbChangesService,
    private contactIdbService: ContactIdbService,
    private sharedDataService: SharedDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastNotificationService: ToastNotificationsService
  ) { }

  ngOnInit() {
    if (!this.processEquipmentGuid) {
      this.activatedRoute.params.subscribe(params => {
        this.processEquipmentGuid = params['id'];
        this.processEquipment = this.processEquipmentIdbService.getByGuid(this.processEquipmentGuid);
      });
    } else {
      this.processEquipment = this.processEquipmentIdbService.getByGuid(this.processEquipmentGuid);
    }
    this.contactSub = this.contactIdbService.contacts.subscribe(_contacts => {
      this.contacts = _contacts;
    });
  }

  ngOnDestroy() {
    this.contactSub.unsubscribe();
  }

  ngAfterViewInit() {
    //emit after intialized. 
    //When adding new process equipment this will trigger the form to open
    this.emitInitialized.emit(true);
  }

  async saveChanges() {
    await this.processEquipmentIdbService.asyncUpdate(this.processEquipment);
  }

  openDeleteModal() {
    this.displayDeleteModal = true;
  }

  closeDeleteModal() {
    this.displayDeleteModal = false;
  }

  async deleteEquipment() {
    await this.dbChangesService.deleteProcessEquipment(this.processEquipment);
    this.toastNotificationService.showToast("End Use Deleted!", "End use item has been removed from the facility inventory.", 'bg-success', true, false);
    if (this.router.url.includes('portfolio')) {
      this.router.navigateByUrl('/portfolio/facility/' + this.processEquipment.facilityId + '/end-use-inventory');
    }
    this.closeDeleteModal();
  }

  openContactModal(viewContact: IdbContact) {
    this.sharedDataService.displayContactModal.next({ context: 'processEquipment', viewContact: viewContact, contextGuid: this.processEquipment.guid, companyId: this.processEquipment.companyId });
  }

  closeContactModal() {
    this.sharedDataService.displayContactModal.next(undefined)
  }
}
