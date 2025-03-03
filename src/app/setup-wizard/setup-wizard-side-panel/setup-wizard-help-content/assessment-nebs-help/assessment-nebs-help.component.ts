import { Component } from '@angular/core';
import { faAsterisk, faPlus, faSearchPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-assessment-nebs-help',
    templateUrl: './assessment-nebs-help.component.html',
    styleUrl: './assessment-nebs-help.component.css',
    standalone: false
})
export class AssessmentNebsHelpComponent {

  faPlus: IconDefinition = faPlus;
  faSearchPlus: IconDefinition = faSearchPlus;
  faAsterisk: IconDefinition = faAsterisk;
}
