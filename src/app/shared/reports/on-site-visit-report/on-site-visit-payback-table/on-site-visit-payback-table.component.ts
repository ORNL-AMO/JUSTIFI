import { Component, Input } from '@angular/core';
import { OnSiteVisitReport } from '../../calculations/visitReport';

@Component({
  selector: 'app-on-site-visit-payback-table',
  templateUrl: './on-site-visit-payback-table.component.html',
  styleUrl: './on-site-visit-payback-table.component.css'
})
export class OnSiteVisitPaybackTableComponent {
  @Input({ required: true })
  onSiteVisitReport: OnSiteVisitReport;


}
