import { ChangeDetectorRef, Component } from '@angular/core';
import { LocalStorageDataService } from '../../shared/shared-services/local-storage-data.service';
import { faChevronLeft, faChevronRight, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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
  constructor(private localStorageDataService: LocalStorageDataService,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.disableWelcomeSlides = this.localStorageDataService.disableWelcomeSlides;
  }

  ngAfterViewInit() {
    if (!this.disableWelcomeSlides) {
      setTimeout(() => {
        console.log('show slides');
        this.showSlides = true;
        this.cd.detectChanges();
      }, 1000)
    }
  }

  hideSlides() {
    this.showSlides = false;
  }

  disableSlides() {
    this.localStorageDataService.setDisableWelcomeSlides(true);
    this.hideSlides();
  }
}
