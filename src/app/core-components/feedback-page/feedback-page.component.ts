import { Component } from '@angular/core';
import { faBug, faDownload, faInbox, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-feedback-page',
  templateUrl: './feedback-page.component.html',
  styleUrl: './feedback-page.component.css'
})
export class FeedbackPageComponent {

  faInbox: IconDefinition = faInbox;
  faBug: IconDefinition = faBug;
  faDownload: IconDefinition = faDownload;
}
