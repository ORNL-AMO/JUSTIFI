import { Component } from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-manage-assessments-help',
    templateUrl: './manage-assessments-help.component.html',
    styleUrl: './manage-assessments-help.component.css',
    standalone: false
})
export class ManageAssessmentsHelpComponent {

  faPlus: IconDefinition = faPlus;
  
}
