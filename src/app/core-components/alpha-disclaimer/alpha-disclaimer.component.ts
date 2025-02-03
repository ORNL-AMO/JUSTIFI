import { ChangeDetectorRef, Component } from '@angular/core';
import { LocalStorageDataService } from 'src/app/shared/shared-services/local-storage-data.service';

@Component({
    selector: 'app-alpha-disclaimer',
    templateUrl: './alpha-disclaimer.component.html',
    styleUrl: './alpha-disclaimer.component.css',
    standalone: false
})
export class AlphaDisclaimerComponent {


  showDisclaimer: boolean = false;
  disableAlphaDisclaimer: boolean;
  constructor(private localStorageDataService: LocalStorageDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.disableAlphaDisclaimer = this.localStorageDataService.disableAlphaDisclaimer;
  }

  ngAfterViewInit() {
    if (!this.disableAlphaDisclaimer) {
      this.showDisclaimer = true;
      this.cd.detectChanges();
    }
  }

  hideDisclaimer() {
    this.showDisclaimer = false;
  }

  disableDisclaimer() {
    this.localStorageDataService.setDisableAlphaDisclaimer(true);
    this.hideDisclaimer();
  }
}
