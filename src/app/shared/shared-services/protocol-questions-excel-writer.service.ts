import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { IdbFacility } from 'src/app/models/facility';
import { FacilityProtocolHelp } from '../help-content/facility-protocol-help';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { EnergyEquipmentEmployeeEngagementHelp, EnergyEquipmentOperationsHelp, EnergyEquipmentSustainabilityHelp, EnergyEquipmentTakeStockHelp } from '../help-content/energy-equipment-help';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { ProcessEquipmentEmployeeEngagementHelp, ProcessEquipmentOperationsHelp, ProcessEquipmentSustainabilityHelp, ProcessEquipmentTakeStockHelp } from '../help-content/process-equipment-help';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtocolQuestionsExcelWriterService {

  displayProtocolQuestionsModal: BehaviorSubject<boolean>;
  takeStockDataRows: Array<{ question: string, help: string, responseField: string }> = [];
  operationsDataRows: Array<{ question: string, help: string, responseField: string }> = [];
  sustainabilityDataRows: Array<{ question: string, help: string, responseField: string }> = [];
  employeeEngagementDataRows: Array<{ question: string, help: string, responseField: string }> = [];
  endUseTakeStockDataRows: Array<{ question: string, help: string, responseField: string }> = [];
  endUseOperationsDataRows: Array<{ question: string, help: string, responseField: string }> = [];
  endUseSustainabilityDataRows: Array<{ question: string, help: string, responseField: string }> = [];
  endUseEmployeeEngagementDataRows: Array<{ question: string, help: string, responseField: string }> = [];
  workbook: ExcelJS.Workbook;

  constructor(
    private loadingService: LoadingService
  ) {
    this.displayProtocolQuestionsModal = new BehaviorSubject<boolean>(false);
  }

  exportProtocolQuestionsToExcel(facility: IdbFacility, energyEquipments: Array<IdbEnergyEquipment>, processEquipments: Array<IdbProcessEquipment>, isFacilitySelected: boolean, selectedIndustrialSysIds: Array<string>, selectedEndUseIds: Array<string>) {
    this.loadingService.setLoadingStatus(true);
    this.workbook = new ExcelJS.Workbook();

    if (isFacilitySelected) {
      this.exportFacilityProtocolQuestionsToExcel(facility);
    }
    if (selectedIndustrialSysIds.length > 0) {
      this.exportIndustrialSystemInventoryQuestionsToExcel(
        energyEquipments.filter(equipment => selectedIndustrialSysIds.includes(equipment.guid))
      );
    }
    if (selectedEndUseIds.length > 0) {
      this.exportEndUseInventoryQuestionsToExcel(
        processEquipments.filter(equipment => selectedEndUseIds.includes(equipment.guid))
      );
    }

    this.workbook.xlsx.writeBuffer().then(excelData => {
      let blob: Blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      let a = document.createElement("a");
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = 'Protocol_Questions_JUSTIFI';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      this.loadingService.setLoadingStatus(false);
      this.displayProtocolQuestionsModal.next(false);
    });
  }

  exportFacilityProtocolQuestionsToExcel(facility: IdbFacility) {
    const headers = ['Question', 'Help Text', 'Response'];
    const dataRows = [
      {
        question: 'What key performance metrics (KPMs) does the facility track?',
        help: FacilityProtocolHelp.howCostsTracked,
        response: facility.howCostsTracked
      },
      {
        question: 'What tools or resources does the facility utilize to track and understand its operational costs and other KPMs?',
        help: FacilityProtocolHelp.financialMetricsUsed,
        response: facility.financialMetricsUsed
      },
      {
        question: 'Are there any external pressures?',
        help: FacilityProtocolHelp.outsidePressures,
        response: facility.outsidePressures
      },
      {
        question: 'What other considerations are used when making equipment acquisitions (lifecycle, performance, costs)?',
        help: FacilityProtocolHelp.equipmentAcquisition,
        response: facility.equipmentAcquisition
      },
      {
        question: 'Are there rules or guidelines for decision making for energy-related projects, such as payback period?',
        help: FacilityProtocolHelp.financialCriteria,
        response: facility.financialCriteria
      },
      {
        question: 'How does the facility fund energy-related projects - internal budgets (Operations or Capital), alternative external funding, a combination?',
        help: FacilityProtocolHelp.dependentFunding,
        response: facility.dependentFunding
      },
      {
        question: 'What energy efficiency incentives is your facility eligible for?',
        help: FacilityProtocolHelp.efficiencyIncentives,
        response: facility.efficiencyIncentives
      }
    ]

    let worksheet: ExcelJS.Worksheet = this.workbook.addWorksheet('Facility Protocol Questions');
    worksheet.properties.tabColor = { argb: 'bb3162' };

    headers.forEach((header, index) => {
      const cell = worksheet.getCell(1, index + 1);
      cell.value = header;
      cell.font = {
        size: 14,
        bold: true,
        italic: true
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center',
      };
    });
    worksheet.getRow(1).height = 30;

    worksheet.getColumn(1).width = 60;
    worksheet.getColumn(2).width = 80;
    worksheet.getColumn(3).width = 80;

    dataRows.forEach((row, rowIndex) => {
      worksheet.getCell(rowIndex + 2, 1).value = row.question;
      worksheet.getCell(rowIndex + 2, 2).value = row.help;
      worksheet.getCell(rowIndex + 2, 3).value = row.response;
      [1, 2, 3].forEach(colIndex => {
        worksheet.getCell(rowIndex + 2, colIndex).alignment = {
          vertical: 'middle',
          wrapText: true
        };
      });
    });
  }

  exportIndustrialSystemInventoryQuestionsToExcel(energyEquipments: Array<IdbEnergyEquipment>) {
    const headers = ['Question', 'Help Text', 'Response'];

    this.getSystemInventoryData();

    energyEquipments.forEach(energyEquipment => {
      const worksheet: ExcelJS.Worksheet = this.workbook.addWorksheet(energyEquipment.equipmentName);
      worksheet.properties.tabColor = { argb: '75a45e' };

      worksheet.mergeCells(1, 1, 1, 3);
      const takeStockCell = worksheet.getCell(1, 1);
      takeStockCell.value = 'Take Stock';
      takeStockCell.font = { size: 16, bold: true };
      takeStockCell.alignment = { vertical: 'middle', horizontal: 'center' };
      takeStockCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '98bfc3' } };
      worksheet.getRow(1).height = 30;

      headers.forEach((header, index) => {
        const cell = worksheet.getCell(2, index + 1);
        cell.value = header;
        cell.font = {
          size: 14,
          bold: true,
          italic: true
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });
      worksheet.getRow(2).height = 30;

      worksheet.getColumn(1).width = 60;
      worksheet.getColumn(2).width = 80;
      worksheet.getColumn(3).width = 80;

      this.takeStockDataRows.forEach((row, rowIndex) => {
        worksheet.getCell(rowIndex + 3, 1).value = row.question;
        worksheet.getCell(rowIndex + 3, 2).value = row.help;
        worksheet.getCell(rowIndex + 3, 3).value = energyEquipment[row.responseField];
        [1, 2, 3].forEach(colIndex => {
          worksheet.getCell(rowIndex + 3, colIndex).alignment = {
            vertical: 'middle',
            wrapText: true
          };
        });
      });

      worksheet.mergeCells(8, 1, 8, 3);
      const operationsCell = worksheet.getCell(8, 1);
      operationsCell.value = 'Operations';
      operationsCell.font = { size: 16, bold: true };
      operationsCell.alignment = { vertical: 'middle', horizontal: 'center' };
      operationsCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '98bfc3' } };
      worksheet.getRow(8).height = 30;

      headers.forEach((header, index) => {
        const cell = worksheet.getCell(9, index + 1);
        cell.value = header;
        cell.font = {
          size: 14,
          bold: true,
          italic: true
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });
      worksheet.getRow(9).height = 30;

      this.operationsDataRows.forEach((row, rowIndex) => {
        worksheet.getCell(rowIndex + 10, 1).value = row.question;
        worksheet.getCell(rowIndex + 10, 2).value = row.help;
        worksheet.getCell(rowIndex + 10, 3).value = energyEquipment[row.responseField];
        [1, 2, 3].forEach(colIndex => {
          worksheet.getCell(rowIndex + 10, colIndex).alignment = {
            vertical: 'middle',
            wrapText: true
          };
        });
      });

      worksheet.mergeCells(15, 1, 15, 3);
      const sustainabilityCell = worksheet.getCell(15, 1);
      sustainabilityCell.value = 'Energy and Material Efficiency';
      sustainabilityCell.font = { size: 16, bold: true };
      sustainabilityCell.alignment = { vertical: 'middle', horizontal: 'center' };
      sustainabilityCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '98bfc3' } };
      worksheet.getRow(15).height = 30;

      headers.forEach((header, index) => {
        const cell = worksheet.getCell(16, index + 1);
        cell.value = header;
        cell.font = {
          size: 14,
          bold: true,
          italic: true
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });
      worksheet.getRow(16).height = 30;

      this.sustainabilityDataRows.forEach((row, rowIndex) => {
        worksheet.getCell(rowIndex + 17, 1).value = row.question;
        worksheet.getCell(rowIndex + 17, 2).value = row.help;
        worksheet.getCell(rowIndex + 17, 3).value = energyEquipment[row.responseField];
        [1, 2, 3].forEach(colIndex => {
          worksheet.getCell(rowIndex + 17, colIndex).alignment = {
            vertical: 'middle',
            wrapText: true
          };
        });
      });

      worksheet.mergeCells(22, 1, 22, 3);
      const employeeEngagementCell = worksheet.getCell(22, 1);
      employeeEngagementCell.value = 'Employee and Workplace Environment';
      employeeEngagementCell.font = { size: 16, bold: true };
      employeeEngagementCell.alignment = { vertical: 'middle', horizontal: 'center' };
      employeeEngagementCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '98bfc3' } };
      worksheet.getRow(22).height = 30;

      headers.forEach((header, index) => {
        const cell = worksheet.getCell(23, index + 1);
        cell.value = header;
        cell.font = {
          size: 14,
          bold: true,
          italic: true
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });
      worksheet.getRow(23).height = 30;

      this.employeeEngagementDataRows.forEach((row, rowIndex) => {
        worksheet.getCell(rowIndex + 24, 1).value = row.question;
        worksheet.getCell(rowIndex + 24, 2).value = row.help;
        worksheet.getCell(rowIndex + 24, 3).value = energyEquipment[row.responseField];
        [1, 2, 3].forEach(colIndex => {
          worksheet.getCell(rowIndex + 24, colIndex).alignment = {
            vertical: 'middle',
            wrapText: true
          };
        });
      });
    });
  }

  stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '');
  }

  getSystemInventoryData() {
    this.takeStockDataRows = [
      {
        question: 'How does this system support the plant?',
        help: this.stripHtml(EnergyEquipmentTakeStockHelp.howSupportPlant) + '\n' + this.stripHtml(EnergyEquipmentTakeStockHelp.howSupportPlantQs),
        responseField: 'howSupportPlant'
      },
      {
        question: 'How would any recommendations to improve energy efficiency improve other areas within the facility?',
        help: this.stripHtml(EnergyEquipmentTakeStockHelp.adverseEffects),
        responseField: 'adverseEffects'
      },
      {
        question: 'Where is the equipment in its lifecycle? Are you considering replacement?',
        help: this.stripHtml(EnergyEquipmentTakeStockHelp.equipmentFinancialStatus) + '\n' + this.stripHtml(EnergyEquipmentTakeStockHelp.equipmentFinancialStatusQs),
        responseField: 'equipmentFinancialStatus'
      },
      {
        question: 'What financial metrics are used to understand the output of the system (/gpm, /scfm)?',
        help: this.stripHtml(EnergyEquipmentTakeStockHelp.financialMetricsUsed) + '\n' + this.stripHtml(EnergyEquipmentTakeStockHelp.financialMetricsUsedQs),
        responseField: 'financialMetricsUsed'
      }
    ];

    this.operationsDataRows = [
      {
        question: 'Describe the output of the system and how it aligns with plant needs',
        help: this.stripHtml(EnergyEquipmentOperationsHelp.describeOutputOfSystem) + '\n' + this.stripHtml(EnergyEquipmentOperationsHelp.describeOutputOfSystemQs),
        responseField: 'describeOutputOfSystem'
      },
      {
        question: 'Describe the maintenance and servicing needs of this system',
        help: this.stripHtml(EnergyEquipmentOperationsHelp.describeServicingNeeds) + '\n' + this.stripHtml(EnergyEquipmentOperationsHelp.describeServicingNeedsQs),
        responseField: 'describeServicingNeeds'
      },
      {
        question: 'Describe the labor requirements of this system.',
        help: this.stripHtml(EnergyEquipmentOperationsHelp.describeLaborRequirements) + '\n' + this.stripHtml(EnergyEquipmentOperationsHelp.describeLaborRequirementsQs),
        responseField: 'describeLaborRequirements'
      },
      {
        question: 'Describe the materials that are required by this system (raw materials, intermediate goods, treatment chemicals)?',
        help: this.stripHtml(EnergyEquipmentOperationsHelp.describeSystemMaterials) + '\n' + this.stripHtml(EnergyEquipmentOperationsHelp.describeSystemMaterialsQs),
        responseField: 'describeSystemMaterials'
      }
    ];

    this.sustainabilityDataRows = [
      {
        question: 'Describe the waste streams that result from this system',
        help: this.stripHtml(EnergyEquipmentSustainabilityHelp.describeWasteStreams),
        responseField: 'describeWasteStreams'
      },
      {
        question: 'Describe water input or discharge streams that result from this system',
        help: this.stripHtml(EnergyEquipmentSustainabilityHelp.describeWaterInputDischarge),
        responseField: 'describeWaterInputDischarge'
      },
      {
        question: 'Describe any refrigerant, process, or dust emissions that may come from this system',
        help: this.stripHtml(EnergyEquipmentSustainabilityHelp.describeRefrigerantProcessDustEmissions),
        responseField: 'describeRefrigerantProcessDustEmissions'
      },
      {
        question: 'Describe any environmental regulations or considerations impacting this system',
        help: this.stripHtml(EnergyEquipmentSustainabilityHelp.describeRegulations),
        responseField: 'describeRegulations'
      }
    ];

    this.employeeEngagementDataRows = [
      {
        question: 'Describe any safety concerns related to this system',
        help: this.stripHtml(EnergyEquipmentEmployeeEngagementHelp.describeSafetyConcerns),
        responseField: 'describeSafetyConcerns'
      },
      {
        question: 'Describe any other workplace environment details related to the system',
        help: this.stripHtml(EnergyEquipmentEmployeeEngagementHelp.describeWorkplaceEnvironment),
        responseField: 'describeWorkplaceEnvironment'
      }
    ];
  }

  exportEndUseInventoryQuestionsToExcel(processEquipments: Array<IdbProcessEquipment>) {
    const headers = ['Question', 'Help Text', 'Response'];

    this.getEndUseInventoryData();

    processEquipments.forEach(processEquipment => {
      const worksheet: ExcelJS.Worksheet = this.workbook.addWorksheet(processEquipment.equipmentName);
      worksheet.properties.tabColor = { argb: '334d89' };

      worksheet.mergeCells(1, 1, 1, 3);
      const takeStockCell = worksheet.getCell(1, 1);
      takeStockCell.value = 'Take Stock';
      takeStockCell.font = { size: 16, bold: true };
      takeStockCell.alignment = { vertical: 'middle', horizontal: 'center' };
      takeStockCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '98bfc3' } };
      worksheet.getRow(1).height = 30;

      headers.forEach((header, index) => {
        const cell = worksheet.getCell(2, index + 1);
        cell.value = header;
        cell.font = {
          size: 14,
          bold: true,
          italic: true
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });
      worksheet.getRow(2).height = 30;

      worksheet.getColumn(1).width = 60;
      worksheet.getColumn(2).width = 80;
      worksheet.getColumn(3).width = 80;

      this.endUseTakeStockDataRows.forEach((row, rowIndex) => {
        worksheet.getCell(rowIndex + 3, 1).value = row.question;
        worksheet.getCell(rowIndex + 3, 2).value = row.help;
        worksheet.getCell(rowIndex + 3, 3).value = processEquipment[row.responseField];
        [1, 2, 3].forEach(colIndex => {
          worksheet.getCell(rowIndex + 3, colIndex).alignment = {
            vertical: 'middle',
            wrapText: true
          };
        });
      });

      worksheet.mergeCells(8, 1, 8, 3);
      const operationsCell = worksheet.getCell(8, 1);
      operationsCell.value = 'Operations';
      operationsCell.font = { size: 16, bold: true };
      operationsCell.alignment = { vertical: 'middle', horizontal: 'center' };
      operationsCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '98bfc3' } };
      worksheet.getRow(8).height = 30;

      headers.forEach((header, index) => {
        const cell = worksheet.getCell(9, index + 1);
        cell.value = header;
        cell.font = {
          size: 14,
          bold: true,
          italic: true
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });
      worksheet.getRow(9).height = 30;

      this.endUseOperationsDataRows.forEach((row, rowIndex) => {
        worksheet.getCell(rowIndex + 10, 1).value = row.question;
        worksheet.getCell(rowIndex + 10, 2).value = row.help;
        worksheet.getCell(rowIndex + 10, 3).value = processEquipment[row.responseField];
        [1, 2, 3].forEach(colIndex => {
          worksheet.getCell(rowIndex + 10, colIndex).alignment = {
            vertical: 'middle',
            wrapText: true
          };
        });
      });

      worksheet.mergeCells(16, 1, 16, 3);
      const sustainabilityCell = worksheet.getCell(16, 1);
      sustainabilityCell.value = 'Energy and Material Efficiency';
      sustainabilityCell.font = { size: 16, bold: true };
      sustainabilityCell.alignment = { vertical: 'middle', horizontal: 'center' };
      sustainabilityCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '98bfc3' } };
      worksheet.getRow(16).height = 30;

      headers.forEach((header, index) => {
        const cell = worksheet.getCell(17, index + 1);
        cell.value = header;
        cell.font = {
          size: 14,
          bold: true,
          italic: true
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });
      worksheet.getRow(17).height = 30;

      this.endUseSustainabilityDataRows.forEach((row, rowIndex) => {
        worksheet.getCell(rowIndex + 18, 1).value = row.question;
        worksheet.getCell(rowIndex + 18, 2).value = row.help;
        worksheet.getCell(rowIndex + 18, 3).value = processEquipment[row.responseField];
        [1, 2, 3].forEach(colIndex => {
          worksheet.getCell(rowIndex + 18, colIndex).alignment = {
            vertical: 'middle',
            wrapText: true
          };
        });
      });

      worksheet.mergeCells(23, 1, 23, 3);
      const employeeEngagementCell = worksheet.getCell(23, 1);
      employeeEngagementCell.value = 'Employee and Workplace Environment';
      employeeEngagementCell.font = { size: 16, bold: true };
      employeeEngagementCell.alignment = { vertical: 'middle', horizontal: 'center' };
      employeeEngagementCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '98bfc3' } };
      worksheet.getRow(23).height = 30;

      headers.forEach((header, index) => {
        const cell = worksheet.getCell(24, index + 1);
        cell.value = header;
        cell.font = {
          size: 14,
          bold: true,
          italic: true
        };
        cell.alignment = {
          vertical: 'middle',
          horizontal: 'center',
        };
      });
      worksheet.getRow(24).height = 30;

      this.endUseEmployeeEngagementDataRows.forEach((row, rowIndex) => {
        worksheet.getCell(rowIndex + 25, 1).value = row.question;
        worksheet.getCell(rowIndex + 25, 2).value = row.help;
        worksheet.getCell(rowIndex + 25, 3).value = processEquipment[row.responseField];
        [1, 2, 3].forEach(colIndex => {
          worksheet.getCell(rowIndex + 25, colIndex).alignment = {
            vertical: 'middle',
            wrapText: true
          };
        });
      });
    });
  }

  getEndUseInventoryData() {
    this.endUseTakeStockDataRows = [
      {
        question: 'What is the output of this process? Is it an intermediate or final product of the facility?',
        help: this.stripHtml(ProcessEquipmentTakeStockHelp.whatIsTheOutput),
        responseField: 'whatIsTheOutput'
      },
      {
        question: 'How does the process or manufacturing technology work?',
        help: this.stripHtml(ProcessEquipmentTakeStockHelp.howDoesTheProcessWork),
        responseField: 'howDoesTheProcessWork'
      },
      {
        question: 'Where is the process and its equipment in its lifecycle? Are you considering replacement?',
        help: this.stripHtml(ProcessEquipmentTakeStockHelp.financialStatusOfEquipment) + '\n' + this.stripHtml(ProcessEquipmentTakeStockHelp.financialStatusOfEquipmentQs),
        responseField: 'financialStatusOfEquipment'
      },
      {
        question: 'What financial metrics are used to understand the output of the process (/unit, /ton, $/batch)?',
        help: this.stripHtml(ProcessEquipmentTakeStockHelp.financialMetricsUsed),
        responseField: 'financialMetricsUsed'
      }
    ];

    this.endUseOperationsDataRows = [
      {
        question: 'Describe the output rate of the process and how it aligns with plant needs',
        help: this.stripHtml(ProcessEquipmentOperationsHelp.describeOutputRate) + '\n' + this.stripHtml(ProcessEquipmentOperationsHelp.describeOutputRateQs),
        responseField: 'describeOutputRate'
      },
      {
        question: 'Describe the measurement of output quality and how it aligns with plant or company needs',
        help: this.stripHtml(ProcessEquipmentOperationsHelp.describeOutputQualityMeasurement) + '\n' + this.stripHtml(ProcessEquipmentOperationsHelp.describeOutputQualityMeasurementQs),
        responseField: 'describeOutputQualityMeasurement'
      },
      {
        question: 'Describe the maintenance and servicing needs of this process',
        help: this.stripHtml(ProcessEquipmentOperationsHelp.describeMaintenanceNeeds) + '\n' + this.stripHtml(ProcessEquipmentOperationsHelp.describeMaintenanceNeedsQs),
        responseField: 'describeMaintenanceNeeds'
      },
      {
        question: 'Describe the labor requirements of this process.',
        help: this.stripHtml(ProcessEquipmentOperationsHelp.describeLaborRequirements) + '\n' + this.stripHtml(ProcessEquipmentOperationsHelp.describeLaborRequirementsQs),
        responseField: 'describeLaborRequirements'
      },
      {
        question: 'Describe the materials that are required by this process (raw materials, intermediate goods, treatment chemicals)?',
        help: this.stripHtml(ProcessEquipmentOperationsHelp.describeRequiredMaterials) + '\n' + this.stripHtml(ProcessEquipmentOperationsHelp.describeRequiredMaterialsQs),
        responseField: 'describeRequiredMaterials'
      }
    ];

    this.endUseSustainabilityDataRows = [
      {
        question: 'Describe any refrigerant, process, or dust emissions that may come from this system',
        help: this.stripHtml(ProcessEquipmentSustainabilityHelp.describeRefrigerantProcessDustEmissions) + '\n' + this.stripHtml(ProcessEquipmentSustainabilityHelp.describeRefrigerantProcessDustEmissionsQs),
        responseField: 'describeRefrigerantProcessDustEmissions'
      },
      {
        question: 'Describe the waste streams that result from this process',
        help: this.stripHtml(ProcessEquipmentSustainabilityHelp.describeWasteStreams) + '\n' + this.stripHtml(ProcessEquipmentSustainabilityHelp.describeWasteStreamsQs),
        responseField: 'describeWasteStreams'
      },
      {
        question: 'Describe water input or discharge streams that result from this process',
        help: this.stripHtml(ProcessEquipmentSustainabilityHelp.describeWaterInputDischarge) + '\n' + this.stripHtml(ProcessEquipmentSustainabilityHelp.describeWaterInputDischargeQs),
        responseField: 'describeWaterInputDischarge'
      },
      {
        question: 'Describe any environmental regulations or considerations impacting this process',
        help: this.stripHtml(ProcessEquipmentSustainabilityHelp.describeRegulations) + '\n' + this.stripHtml(ProcessEquipmentSustainabilityHelp.describeRegulationsQs),
        responseField: 'describeRegulations'
      }
    ];

    this.endUseEmployeeEngagementDataRows = [
      {
        question: 'Describe any safety concerns related to this system',
        help: this.stripHtml(ProcessEquipmentEmployeeEngagementHelp.describeSafetyConcerns) + '\n' + this.stripHtml(ProcessEquipmentEmployeeEngagementHelp.describeSafetyConcernsQs),
        responseField: 'describeSafetyConcerns'
      },
      {
        question: 'Describe any other workplace environment details related to the system',
        help: this.stripHtml(ProcessEquipmentEmployeeEngagementHelp.describeWorkplaceEnvironment) + '\n' + this.stripHtml(ProcessEquipmentEmployeeEngagementHelp.describeWorkplaceEnvironmentQs),
        responseField: 'describeWorkplaceEnvironment'
      }
    ];
  }
}
