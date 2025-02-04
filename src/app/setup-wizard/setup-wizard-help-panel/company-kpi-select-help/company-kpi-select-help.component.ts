import { Component } from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-company-kpi-select-help',
    templateUrl: './company-kpi-select-help.component.html',
    styleUrl: './company-kpi-select-help.component.css',
    standalone: false
})
export class CompanyKpiSelectHelpComponent {


  faPlus: IconDefinition = faPlus;
}
