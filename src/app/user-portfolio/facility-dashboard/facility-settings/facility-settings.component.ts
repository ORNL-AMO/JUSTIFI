import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faBoxArchive, faTrash, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { ToastNotificationsService } from 'src/app/core-components/toast-notifications/toast-notifications.service';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { IdbFacility } from 'src/app/models/facility';
import { BackupDataService } from 'src/app/shared/shared-services/backup-data.service';

@Component({
    selector: 'app-facility-settings',
    templateUrl: './facility-settings.component.html',
    styleUrl: './facility-settings.component.css',
    standalone: false
})
export class FacilitySettingsComponent {


  faTrash: IconDefinition = faTrash;
  faBoxArchive: IconDefinition = faBoxArchive;

  showDeleteFacilityModal: boolean = false;
  showArchiveModal: boolean = false;
  archiveFacilityName: string = '';
  currentDate: string = new Date().toISOString().split('T')[0];


  name: FormControl;
  facilityName: string;
  facilitySub: Subscription;
  facility: IdbFacility;
  routeGuardWarningModal: boolean = false;

  constructor(private facilityIdbService: FacilityIdbService,
    private loadingService: LoadingService,
    private toastNotificationService: ToastNotificationsService,
    private dbChangesService: DbChangesService,
    private router: Router,
    private backupDataService: BackupDataService
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

  openArchiveModal() {
    this.archiveFacilityName = ''; // Reset to use default naming
    this.showArchiveModal = true;
  }

  closeArchiveModal() {
    this.showArchiveModal = false;
    this.archiveFacilityName = '';
  }

  async confirmArchive() {
    try {
      this.closeArchiveModal();
      const archiveName = this.archiveFacilityName.trim() || undefined;
      const archivedFacility = await this.backupDataService.createFacilityArchive(
        this.facility.guid,
        archiveName
      );
      this.toastNotificationService.showToast('Facility Archived', undefined, 'bg-success', true, false);
    } catch (error) {
      console.error('Error archiving facility:', error);
      this.toastNotificationService.showToast('Archive Failed', undefined, 'bg-danger', true, false);
    }
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