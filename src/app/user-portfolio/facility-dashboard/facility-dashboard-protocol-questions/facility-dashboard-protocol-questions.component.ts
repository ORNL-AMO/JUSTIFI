import { Component } from '@angular/core';
import { faClipboardQuestion, faFileExcel, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FacilityProtocolHelp } from 'src/app/shared/help-content/facility-protocol-help';
import { ProtocolQuestionsExcelWriterService } from 'src/app/shared/shared-services/protocol-questions-excel-writer.service';

@Component({
  selector: 'app-facility-dashboard-protocol-questions',
  standalone: false,

  templateUrl: './facility-dashboard-protocol-questions.component.html',
  styleUrl: './facility-dashboard-protocol-questions.component.css'
})
export class FacilityDashboardProtocolQuestionsComponent {
  faClipboardQuestion: IconDefinition = faClipboardQuestion;
  FacilityProtocolHelp = FacilityProtocolHelp;
  faFileExcel: IconDefinition = faFileExcel;
  selectedModule = 'facility';

  constructor(private protocolQuestionsExcelWriterService: ProtocolQuestionsExcelWriterService
  ) {
  }

  openExportModal() {
    this.protocolQuestionsExcelWriterService.displayProtocolQuestionsModal.next(true);
  }
}
