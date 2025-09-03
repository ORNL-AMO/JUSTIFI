import { Component, Input } from '@angular/core';
import { faBug, faDownload, faInbox, faHammer, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-feedback-page',
    templateUrl: './feedback-page.component.html',
    styleUrl: './feedback-page.component.css',
    standalone: false
})
export class FeedbackPageComponent {
  @Input()
  inModal: boolean;

  faInbox: IconDefinition = faInbox;
  faBug: IconDefinition = faBug;
  faDownload: IconDefinition = faDownload;
  faHammer: IconDefinition = faHammer;
}
