import { Component } from '@angular/core';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { LoadingService } from '../loading/loading.service';
import { IconDefinition, faDownload, faUpload, faInbox, faCog, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { environment } from 'src/environments/environment';
import { BackupModalService } from '../backup-modal/backup-modal.service';
import { firstValueFrom, Subscription } from 'rxjs';
import { localeCurrency, LocaleCurrencyOption } from 'src/app/shared/constants/localeCurrency';
import { IdbUser } from 'src/app/models/user';
import { LocaleService } from 'src/app/shared/shared-services/locale.service';
import { Router } from '@angular/router';
import { ElectronService } from 'src/app/electron/electron.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: false
})
export class NavbarComponent {

  faDownload: IconDefinition = faDownload;
  faUpload: IconDefinition = faUpload;
  faInbox: IconDefinition = faInbox;
  faCog: IconDefinition = faCog;
  faExclamationCircle: IconDefinition = faExclamationCircle;

  version: string = environment.version;
  showResetModal: boolean = false;
  showFeedbackModal: boolean = false;
  showSettingsModal: boolean = false;

  userSub: Subscription;
  user: IdbUser;
  userLocale: string;
  localeCurrency: Array<LocaleCurrencyOption> = localeCurrency;
  isSettingChanged: boolean = false;

  updateAvailable: boolean;
  updateAvailableSub: Subscription;

  environment = environment;
  constructor(private userIdbService: UserIdbService,
    private loadingService: LoadingService,
    private sharedDataService: SharedDataService,
    private backupModalService: BackupModalService,
    private localeService: LocaleService,
    private router: Router,
    private electronService: ElectronService
  ) { }

  ngOnInit() {
    this.userSub = this.userIdbService.user.subscribe(_user => {
      this.user = _user;
      this.userLocale = this.user ? this.user.locale : 'en-US';
    });
    if (this.electronService.isElectron) {
      this.updateAvailableSub = this.electronService.updateAvailable.subscribe(val => {
        this.updateAvailable = val;
      });
    }
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
    this.updateAvailableSub?.unsubscribe();
  }

  openImportDataModal() {
    this.backupModalService.showImportModal.next(true);
  }

  openExportDataModal() {
    this.backupModalService.showExportModal.next(true);
  }

  resetDatabase() {
    this.closeResetDatabaseModal();
    this.router.navigateByUrl('/welcome')
    this.loadingService.setLoadingMessage('Resetting Database... This may take a moment. The page will refresh after the database is reset. If this takes more than a minute, refresh the page.');
    this.loadingService.setLoadingStatus(true);
    this.userIdbService.deleteDatabase();
  }

  openResetDatabaseModal() {
    this.closeSettingsModal();
    this.showResetModal = true;
  }

  closeResetDatabaseModal() {
    this.showResetModal = false;
  }

  openSidebar() {
    this.sharedDataService.sidebarOpen.next(true);
  }

  openFeedbackModal() {
    this.showFeedbackModal = true;
  }

  closeFeedbackModal() {
    this.showFeedbackModal = false;
  }

  openSettingsModal() {
    this.showSettingsModal = true;
  }

  async saveSettings() {
    this.isSettingChanged = true;
    this.localeService.setCurrencyCode(this.userLocale);
  }

  async closeSettingsModal() {
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
