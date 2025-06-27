import { ChangeDetectorRef, Component } from '@angular/core';
import { LocalStorageDataService } from '../../shared/shared-services/local-storage-data.service';
import { faChevronLeft, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SharedDataService } from 'src/app/shared/shared-services/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome-slideshow',
  standalone: false,

  templateUrl: './welcome-slideshow.component.html',
  styleUrl: './welcome-slideshow.component.css'
})
export class WelcomeSlideshowComponent {
  faChevronRight: IconDefinition = faChevronRight;
  faChevronLeft: IconDefinition = faChevronLeft;

  showSlides: boolean = false;
  disableWelcomeSlides: boolean;

  showSlidesSubscription: Subscription;
  forceShowSlides: boolean = false;
  constructor(private localStorageDataService: LocalStorageDataService,
    private cd: ChangeDetectorRef,
    private sharedDataService: SharedDataService
  ) {
  }

  ngOnInit() {
    this.disableWelcomeSlides = this.localStorageDataService.disableWelcomeSlides;
    this.showSlidesSubscription = this.sharedDataService.showSlideShow.subscribe(show => {
      this.forceShowSlides = show;
      if (this.forceShowSlides) {
        this.showSlides = true;
      }
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    if (this.showSlidesSubscription) {
      this.showSlidesSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    if (!this.disableWelcomeSlides) {
      setTimeout(() => {
        this.showSlides = true;
        this.cd.detectChanges();
      }, 1000)
    }
  }

  hideSlides() {
    this.showSlides = false;
    this.sharedDataService.showSlideShow.next(false);
  }

  disableSlides() {
    this.localStorageDataService.setDisableWelcomeSlides(true);
    this.hideSlides();
  }
}
