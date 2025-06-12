import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faAsterisk, faCube, faFileExcel, faFileLines, faRefresh, faSave, faScrewdriverWrench, faSplotch, faUpload, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';
import * as ExcelJS from 'exceljs';
import { ParseExcelTemplateService } from 'src/app/shared/shared-services/parse-excel-template.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbFacility } from 'src/app/models/facility';
import { IdbEnergyEquipment } from 'src/app/models/energyEquipment';
import { IdbProcessEquipment } from 'src/app/models/processEquipment';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';

@Component({
  selector: 'app-upload-template',
  standalone: false,

  templateUrl: './upload-template.component.html',
  styleUrl: './upload-template.component.css'
})
export class UploadTemplateComponent {
  faUpload: IconDefinition = faUpload;
  faFileExcel: IconDefinition = faFileExcel;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  faFileLines: IconDefinition = faFileLines;
  faSave: IconDefinition = faSave;
  faAsterisk: IconDefinition = faAsterisk;
  faCube: IconDefinition = faCube;
  faSplotch: IconDefinition = faSplotch;
  faRefresh: IconDefinition = faRefresh;

  workbook: ExcelJS.Workbook;
  fileUploadError: string = '';
  parsedResults: boolean = false;
  facility: IdbFacility;
  industrialSystems: Array<IdbEnergyEquipment>;
  endUses: Array<IdbProcessEquipment>;
  mappedAssessments: Array<{
    assessment: IdbAssessment,
    energyEfficiencyMeasures: Array<IdbEnergyOpportunity>
  }>;
  assessments: Array<IdbAssessment>;
  energyEfficiencyMeasures: Array<IdbEnergyOpportunity>;
  constructor(private activatedRoute: ActivatedRoute,
    private dbChangesService: DbChangesService,
    private router: Router,
    private parseExcelTemplateService: ParseExcelTemplateService,
    private onSiteVisitIdbService: OnSiteVisitIdbService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let visitGUID: string = params['id'];
      let visitExists: boolean = this.dbChangesService.selectOnSiteVisit(visitGUID);
      if (!visitExists) {
        console.log('visit does not exist. Nav back to getting started..');
        this.router.navigateByUrl('/welcome');
      }
    });
  }

  onFileSelected(event: EventTarget) {
    let files: FileList = (event as HTMLInputElement).files;
    if (files) {
      if (files.length !== 0) {
        let regex3 = /.xlsx$/;
        for (let index = 0; index < files.length; index++) {
          if (regex3.test(files[index].name)) {
            this.addFile(files[index]);
          }
        }
      }
    }
  }

  addFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = async (e: any) => {
      const bstr: ArrayBuffer = e.target.result;
      // let workBook: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary', cellDates: true, dateNF: 'mm/dd/yyyy' });
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(bstr);
      try {
        let isTemplate: boolean = workbook.getWorksheet('JUSTIFI_UPLOAD_V1') !== undefined;
        if (isTemplate) {
          this.workbook = workbook;
        } else {
          this.fileUploadError = 'Only template files from JUSTIFI can be uploaded.'
        }
      } catch (err) {
        console.log(err);
        this.fileUploadError = 'An Error Occured Parsing The File.'
      }
    };
    reader.readAsBinaryString(file);
  }


  async parseWorkbook() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    let results: {
      facility: IdbFacility;
      industrialSystems: Array<IdbEnergyEquipment>
      endUses: Array<IdbProcessEquipment>
      assessments: Array<IdbAssessment>
      energyEfficiencyMeasures: Array<IdbEnergyOpportunity>
    } = await this.parseExcelTemplateService.parseWorkbookFromWizard(this.workbook, onSiteVisit);
    this.facility = results.facility;
    this.industrialSystems = results.industrialSystems;
    this.endUses = results.endUses;
    this.assessments = results.assessments;
    this.energyEfficiencyMeasures = results.energyEfficiencyMeasures;
    this.mappedAssessments = new Array();
    results.assessments.forEach(assessment => {
      let energyEfficiencyMeasures: Array<IdbEnergyOpportunity> = results.energyEfficiencyMeasures.filter(eem => eem.assessmentId === assessment.guid);
      this.mappedAssessments.push({
        assessment: assessment,
        energyEfficiencyMeasures: energyEfficiencyMeasures
      });
    });
    this.parsedResults = true;
    this.workbook = undefined;
    this.fileUploadError = '';
  }

  async save() {
    let onSiteVisit: IdbOnSiteVisit = this.onSiteVisitIdbService.selectedVisit.getValue();
    await this.parseExcelTemplateService.importData(this.facility, this.industrialSystems, this.endUses, this.assessments, this.energyEfficiencyMeasures, onSiteVisit);
    this.startOver();
  }

  startOver(){
    this.parsedResults = false;
    this.workbook = undefined;
    this.fileUploadError = '';
    this.industrialSystems = [];
    this.endUses = [];
    this.mappedAssessments = [];
    this.assessments = [];
    this.energyEfficiencyMeasures = [];
  }

}
