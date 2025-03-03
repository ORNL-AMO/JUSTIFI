import { Component } from '@angular/core';
import { faAsterisk, faPlus, faSearchPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-energy-opportunities-help',
    templateUrl: './energy-opportunities-help.component.html',
    styleUrl: './energy-opportunities-help.component.css',
    standalone: false
})
export class EnergyOpportunitiesHelpComponent {

  faPlus: IconDefinition = faPlus;
  faSearchPlus: IconDefinition = faSearchPlus;
  faAsterisk: IconDefinition = faAsterisk;
}
