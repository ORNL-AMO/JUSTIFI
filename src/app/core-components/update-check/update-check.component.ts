import { Component, ElementRef, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UpdateCheckService } from './update-check.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-update-check',
  standalone: false,
  templateUrl: './update-check.component.html',
  styleUrl: './update-check.component.css',
})
export class UpdateCheckComponent {

  @ViewChild('updateCheckItem', { static: false }) updateCheckItem: ElementRef;
  toast: any;

  updateAvailableSub: Subscription;
  forcedClose: boolean = false;
  constructor(private updateCheckService: UpdateCheckService) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    //Bootstrap toast initialization
    if (bootstrap) {
      this.toast = new bootstrap.Toast(this.updateCheckItem.nativeElement);
    }
    this.updateAvailableSub = this.updateCheckService.updateAvailable.subscribe(isAvailable => {
      if (!this.forcedClose) {
        if (isAvailable) {
          this.showToast();
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.updateAvailableSub) {
      this.updateAvailableSub.unsubscribe();
    }
    if (this.toast) {
      this.toast.dispose();
    }
  }

  closeToast() {
    this.toast.hide();
    this.forcedClose = true;
  }

  reloadPage() {
    window.location.reload();
  }

  showToast() {
    this.toast.show();
  }
}
