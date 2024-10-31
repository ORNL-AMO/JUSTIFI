import { Component } from '@angular/core';
import { faQuestionCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {

  faQuestionCircle: IconDefinition = faQuestionCircle;
}
