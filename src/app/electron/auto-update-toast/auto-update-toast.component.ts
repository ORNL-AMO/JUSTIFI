import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { ElectronService } from '../electron.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import * as bootstrap from 'bootstrap';
import { faDownload, faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-auto-update-toast',
  standalone: false,
  templateUrl: './auto-update-toast.component.html',
  styleUrl: './auto-update-toast.component.css'
})
export class AutoUpdateToastComponent {

  faExclamationCircle: IconDefinition = faExclamationCircle;
  faDownload: IconDefinition = faDownload;

  @ViewChild('updateToastElement', { static: false }) updateToastElement: ElementRef;
  updateToast: any;

  updateAvailable: boolean;
  updateAvailableSub: Subscription;

  updateInfo: { releaseName: string, releaseNotes: string };
  updateInfoSub: Subscription;
  downloading: boolean;

  updateError: boolean;
  updateErrorSub: Subscription;
  constructor(private electronService: ElectronService, private cd: ChangeDetectorRef,
    private loadingService: LoadingService) {
  }

  ngOnInit() {
    if (this.electronService.isElectron) {
      this.electronService.sendAppReady('ready');
      this.updateAvailableSub = this.electronService.updateAvailable.subscribe(val => {
        this.updateAvailable = val;
        this.cd.detectChanges();
        if (this.updateAvailable) {
          this.showToast();
        }
      });

      this.updateInfoSub = this.electronService.updateInfo.subscribe(val => {
        this.updateInfo = val;
      });

      this.updateErrorSub = this.electronService.updateError.subscribe(val => {
        this.updateError = val;
        if (this.updateError) {
          this.loadingService.setLoadingStatus(false);
          this.loadingService.setLoadingMessage(undefined);
          this.cd.detectChanges();
        }
      });
    }
  }

  ngAfterViewInit() {
    if (bootstrap) {
      this.updateToast = new bootstrap.Toast(this.updateToastElement.nativeElement);
    }

    if (this.updateAvailable) {
      this.showToast();
    }
  }

  ngOnDestroy() {
    if (this.electronService.isElectron) {
      this.updateAvailableSub.unsubscribe();
      this.updateInfoSub.unsubscribe();
      this.updateErrorSub.unsubscribe();
    }
    if (this.updateToast) {
      this.updateToast.dispose();
    }
  }

  showToast() {
    if (this.updateToast) {
      this.updateToast.show();
    }
  }

  update() {
    this.downloading = true;
    this.loadingService.setLoadingMessage('Downloading update. Application will close when download is completed. This may take a moment.');
    this.loadingService.setLoadingStatus(true);
    this.electronService.sendUpdateSignal();
  }

  closeUpdateAvailable() {
    this.updateToast.hide();
    setTimeout(() => {
      this.updateAvailable = false;
    }, 500)
  }
}
