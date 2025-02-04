import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCopy, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';

@Component({
    selector: 'app-facility-settings',
    templateUrl: './facility-settings.component.html',
    styleUrl: './facility-settings.component.css',
    standalone: false
})
export class FacilitySettingsComponent {


  faTrash: IconDefinition = faTrash;
  faCopy: IconDefinition = faCopy;

  showDeleteFacilityModal: boolean = false;
  showCreateCopyModal: boolean = false;


  name: FormControl;
  facilityName: string;
  facilitySub: Subscription;
  facility: IdbFacility;
  routeGuardWarningModal: boolean = false;

  constructor(private facilityIdbService: FacilityIdbService,
    private loadingService: LoadingService,
    private toastNotificationService: ToastNotificationsService,
    private dbChangesService: DbChangesService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.facilitySub = this.facilityIdbService.selectedFacility.subscribe(facility => {
      this.facility = facility;
      this.name = new FormControl(this.facility.generalInformation.name, [Validators.required]);
    });
  }

  ngOnDestroy() {
    this.facilitySub.unsubscribe();
  }

  async saveChanges() {
    let facility: IdbFacility = this.facilityIdbService.selectedFacility.getValue();
    facility.generalInformation.name = this.name.value;
    await this.facilityIdbService.asyncUpdate(facility);
  }

  canDeactivate(): Observable<boolean> {
    if (this.name && this.name.getError('required')) {
      this.displayWarningModal();
      return of(false);
    }
    return of(true);
  }

  displayWarningModal() {
    this.routeGuardWarningModal = true;
  }
  closeWarningModal() {
    this.routeGuardWarningModal = false;
  }

  openDeleteFacilityModal() {
    this.showDeleteFacilityModal = true;
  }

  closeDeleteFacilityModal() {
    this.showDeleteFacilityModal = false;
  }

  openCreateCopyModal() {
    this.showCreateCopyModal = true;
  }

  closeCreateCopyModal() {
    this.showCreateCopyModal = false;
  }

  confirmCreateCopy() {
    //TODO...
  }

  async confirmDelete() {
    this.showDeleteFacilityModal = false;
    this.loadingService.setLoadingMessage('Deleting ' + this.facility.generalInformation.name + '...');
    this.loadingService.setLoadingStatus(true);
    await this.dbChangesService.deleteFacility(this.facility);
    this.loadingService.setLoadingStatus(false);
    this.toastNotificationService.showToast('Facility Deleted!', undefined, 'bg-success', true, false);
    this.router.navigateByUrl('/portfolio');
  }
}