import { Component } from '@angular/core';
import { faDatabase, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as ExcelJS from 'exceljs';
import { LoadingService } from '../core-components/loading/loading.service';
import { KeyPerformanceIndicatorOptions } from '../shared/constants/keyPerformanceIndicatorOptions';
import { KeyPerformanceMetricOption, KeyPerformanceMetricOptions } from '../shared/constants/keyPerformanceMetrics';
import { NebOption, NebOptions } from '../shared/constants/nonEnergyBenefitOptions';

@Component({
  selector: 'app-nebs-database',
  templateUrl: './nebs-database.component.html',
  styleUrl: './nebs-database.component.css',
  standalone: false
})
export class NebsDatabaseComponent {

  faDatabase: IconDefinition = faDatabase;
  constructor(private loadingService: LoadingService
  ) {
  }

  exportNebs() {
    this.loadingService.setLoadingMessage('Exporting NEBs Data');
    this.loadingService.setLoadingStatus(true);
    let workbook = new ExcelJS.Workbook();
    this.writeToWorkbook(workbook);
    workbook.xlsx.writeBuffer().then(excelData => {
      let blob: Blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let a = document.createElement("a");
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'JUSTIFI_NEB_Database';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      this.loadingService.setLoadingStatus(false);
    });
  }


  writeToWorkbook(workbook: ExcelJS.Workbook) {
    let alpha = Array.from(Array(26)).map((e, i) => i + 65);
    let alphabet: Array<string> = alpha.map(x => { return String.fromCharCode(x) });
    let additionalAlphabet: Array<string> = alpha.map(x => { return 'A' + String.fromCharCode(x) });
    alphabet = alphabet.concat(additionalAlphabet);
    additionalAlphabet = alpha.map(x => { return 'B' + String.fromCharCode(x) });
    alphabet = alphabet.concat(additionalAlphabet);

    KeyPerformanceIndicatorOptions.forEach(kpiOption => {
      let label: string = kpiOption.label;
      label = label.replace(':', '-');
      let worksheet = workbook.addWorksheet(label);
      worksheet.getCell('A1').value = label;
      worksheet.getCell('A1').font = {
        size: 18,
        bold: true
      }


      let metrics: Array<KeyPerformanceMetricOption> = KeyPerformanceMetricOptions.filter(kpmOption => {
        return kpmOption.kpiValue == kpiOption.optionValue
      });
      let metricIndex: number = 2;
      metrics.forEach(metric => {
        worksheet.getCell('A' + metricIndex).value = metric.label;
        worksheet.getCell('A' + metricIndex).font = {
          bold: true
        }
        let nebs: Array<NebOption> = NebOptions.filter(nebOption => {
          return nebOption.KPM.includes(metric.value);
        });
        let nebIndex: number = 1;
        nebs.forEach(neb => {
          let alphaLetter = alphabet[nebIndex];
          let cellCode: string = alphaLetter + metricIndex;
          worksheet.getCell(cellCode).value = neb.label;
          nebIndex++;
        })
        metricIndex++;
      })

    })
  }

}
