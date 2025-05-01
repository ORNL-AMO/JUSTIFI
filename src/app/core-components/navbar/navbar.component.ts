import { Component } from '@angular/core';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { LoadingService } from '../loading/loading.service';
import { IconDefinition, faDownload, faUpload, faInbox, faCog } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { environment } from 'src/environments/environment';
import { ImportBackupModalService } from '../import-backup-modal/import-backup-modal.service';
import { BackupDataService } from 'src/app/shared/shared-services/backup-data.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { localeCurrency, LocaleCurrencyOption } from 'src/app/shared/constants/localeCurrency';
import { IdbUser } from 'src/app/models/user';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    standalone: false
})
export class NavbarComponent{

  faDownload: IconDefinition =faDownload;
  faUpload: IconDefinition = faUpload;
  faInbox: IconDefinition = faInbox;
  faCog: IconDefinition = faCog;

  version: string = environment.version;
  showResetModal: boolean = false;
  showBackupDataModal: boolean = false;
  showFeedbackModal: boolean = false;
  showSettingsModal: boolean = false;

  userSub: Subscription;
  user: IdbUser;
  userLocale: string;
  localeCurrency: Array<LocaleCurrencyOption> = localeCurrency;
  isSettingChanged: boolean = false;

  constructor(private userIdbService: UserIdbService,
    private loadingService: LoadingService,
    private sharedDataService: SharedDataService,
    private importBackupModalService: ImportBackupModalService,
    private backupDataService: BackupDataService,
    private localeService: LocaleService,
    private router: Router
  ) {}

  ngOnInit(){
    this.userSub = this.userIdbService.user.subscribe(_user => {
      this.user = _user;
      this.userLocale = this.user ? this.user.locale : 'en-US';
    });
  }

  ngOnDestroy(){
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  backupData() {
    this.backupDataService.backupData();
    // to do: update lastBackup property for selectedUser
    // let selectedUser = this.userIdbService.user.getValue();
    this.closeBackupDataModal();
  }

  openImportDataModal() {
    this.importBackupModalService.showImportModal.next(true);
  }

  resetDatabase() {
    this.closeResetDatabaseModal();
    this.router.navigateByUrl('/welcome')
    this.loadingService.setLoadingMessage('Resetting Database... This may take a moment. The page will refresh after the database is reset. If this takes more than a minute, refresh the page.');
    this.loadingService.setLoadingStatus(true);
    this.userIdbService.deleteDatabase();
  }

  openResetDatabaseModal() {
    this.showResetModal = true;
  }

  closeResetDatabaseModal() {
    this.showResetModal = false;
  }

  openSidebar(){
    this.sharedDataService.sidebarOpen.next(true);
  }

  openBackupDataModal(){
    this.showBackupDataModal = true;
  }

  closeBackupDataModal(){
    this.showBackupDataModal = false;
  }

  openFeedbackModal(){
    this.showFeedbackModal = true;
  }

  closeFeedbackModal(){
    this.showFeedbackModal = false;
  }

  openSettingsModal(){
    this.showSettingsModal = true;
  }

  async saveSettings(){
    this.isSettingChanged = true;
    this.localeService.setCurrencyCode(this.userLocale);
  }

  async closeSettingsModal(){
    if (this.isSettingChanged) {
      if (this.user) {
        this.user.locale = this.userLocale;
        this.user = await firstValueFrom(this.userIdbService.updateWithObservable(this.user));
      }
      this.isSettingChanged = false;
    }
    this.showSettingsModal = false;
  }
}
