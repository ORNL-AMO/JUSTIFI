import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { UpdateCheckService } from './update-check.service';

@Component({
  selector: 'app-update-check',
  standalone: false,
  templateUrl: './update-check.component.html',
  styleUrl: './update-check.component.css',
})
export class UpdateCheckComponent {

  updateAvailableSub: Subscription;
  updateAvailable: boolean = false;
  forcedClose: boolean = false;
  constructor(private updateCheckService: UpdateCheckService) {
  }

  ngOnInit() {
    this.updateAvailableSub = this.updateCheckService.updateAvailable.subscribe(isAvailable => {
      if (!this.forcedClose) {
        this.updateAvailable = isAvailable;
      }
    });
  }

  ngOnDestroy() {
    if (this.updateAvailableSub) {
      this.updateAvailableSub.unsubscribe();
    }
  }

  closeToast(){
    this.forcedClose = true;
    this.updateAvailable = false;
  }

  reloadPage(){
    window.location.reload();
  }
}
