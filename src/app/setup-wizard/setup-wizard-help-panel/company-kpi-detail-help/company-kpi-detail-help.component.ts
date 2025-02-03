import { Component } from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-company-kpi-detail-help',
    templateUrl: './company-kpi-detail-help.component.html',
    styleUrl: './company-kpi-detail-help.component.css',
    standalone: false
})
export class CompanyKpiDetailHelpComponent {

  faPlus: IconDefinition = faPlus;
}
