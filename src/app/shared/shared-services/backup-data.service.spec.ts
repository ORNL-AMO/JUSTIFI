import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';

import { AssessmentIdbService } from 'src/app/indexed-db/assessment-idb.service';
import { CompanyIdbService } from 'src/app/indexed-db/company-idb.service';
import { ContactIdbService } from 'src/app/indexed-db/contact-idb.service';
import { EnergyEquipmentIdbService } from 'src/app/indexed-db/energy-equipment-idb.service';
import { EnergyOpportunityIdbService } from 'src/app/indexed-db/energy-opportunity-idb.service';
import { FacilityIdbService } from 'src/app/indexed-db/facility-idb.service';
import { KeyPerformanceIndicatorsIdbService } from 'src/app/indexed-db/key-performance-indicators-idb.service';
import { KeyPerformanceMetricImpactsIdbService } from 'src/app/indexed-db/key-performance-metric-impacts-idb.service';
import { NonEnergyBenefitsIdbService } from 'src/app/indexed-db/non-energy-benefits-idb.service';
import { OnSiteVisitIdbService } from 'src/app/indexed-db/on-site-visit-idb.service';
import { ProcessEquipmentIdbService } from 'src/app/indexed-db/process-equipment-idb.service';
import { ReportIdbService } from 'src/app/indexed-db/report-idb.service';
import { UserIdbService } from 'src/app/indexed-db/user-idb.service';
import { IdbAssessment } from 'src/app/models/assessment';
import { IdbCompany } from 'src/app/models/company';
import { IdbEnergyOpportunity } from 'src/app/models/energyOpportunity';
import { IdbFacility } from 'src/app/models/facility';
import { IdbKeyPerformanceMetricImpact } from 'src/app/models/keyPerformanceMetricImpact';
import { IdbNonEnergyBenefit } from 'src/app/models/nonEnergyBenefit';
import { IdbOnSiteVisit } from 'src/app/models/onSiteVisit';
import { IdbReport } from 'src/app/models/report';
import { IdbUser } from 'src/app/models/user';
import { LoadingService } from 'src/app/core-components/loading/loading.service';
import { buildExportTree, ExportTreeNode, updateChildren, updateParent } from 'src/app/core-components/backup-modal/export-backup-modal/exportTree';
import { BackupDataService, BackupFile } from './backup-data.service';

describe('BackupDataService', () => {
  let service: BackupDataService;
  let userIdbService: any;
  let companyIdbService: any;
  let facilityIdbService: any;
  let contactIdbService: any;
  let energyOpportunityIdbService: any;
  let assessmentIdbService: any;
  let keyPerformanceIndicatorsIdbService: any;
  let nonEnergyBenefitsIdbService: any;
  let onSiteVisitIdbService: any;
  let loadingService: any;
  let energyEquipmentIdbService: any;
  let processEquipmentIdbService: any;
  let keyPerformanceMetricImpactsIdbService: any;
  let reportIdbService: any;

  let user: IdbUser;
  let company: IdbCompany;
  let facility: IdbFacility;
  let visits: Array<IdbOnSiteVisit>;
  let assessments: Array<IdbAssessment>;
  let energyOpportunities: Array<IdbEnergyOpportunity>;
  let nonEnergyBenefits: Array<IdbNonEnergyBenefit>;
  let kpmImpacts: Array<IdbKeyPerformanceMetricImpact>;
  let reports: Array<IdbReport>;

  beforeEach(() => {
    user = { id: 1, guid: 'user-1' } as IdbUser;
    company = {
      id: 1,
      guid: 'company-1',
      userId: user.guid,
      generalInformation: { name: 'Company 1' }
    } as IdbCompany;
    facility = {
      id: 1,
      guid: 'facility-1',
      userId: user.guid,
      companyId: company.guid,
      generalInformation: { name: 'Facility 1' }
    } as IdbFacility;
    assessments = [
      createAssessment('assessment-1', 'Assessment 1'),
      createAssessment('assessment-2', 'Assessment 2'),
      createAssessment('assessment-3', 'Assessment 3')
    ];
    visits = [
      createVisit('visit-1', [assessments[0].guid, assessments[1].guid]),
      createVisit('visit-2', [assessments[2].guid])
    ];
    energyOpportunities = [
      createEnergyOpportunity('opportunity-1', assessments[0].guid),
      createEnergyOpportunity('opportunity-2', assessments[1].guid),
      createEnergyOpportunity('opportunity-3', assessments[2].guid)
    ];
    nonEnergyBenefits = [
      createNonEnergyBenefit('neb-1', assessments[0].guid, energyOpportunities[0].guid),
      createNonEnergyBenefit('neb-2', assessments[1].guid, energyOpportunities[1].guid),
      createNonEnergyBenefit('neb-3', assessments[2].guid, energyOpportunities[2].guid)
    ];
    kpmImpacts = [
      createKpmImpact('impact-1', assessments[0].guid, energyOpportunities[0].guid, nonEnergyBenefits[0].guid),
      createKpmImpact('impact-2', assessments[1].guid, energyOpportunities[1].guid, nonEnergyBenefits[1].guid),
      createKpmImpact('impact-3', assessments[2].guid, energyOpportunities[2].guid, nonEnergyBenefits[2].guid)
    ];
    reports = [
      createReport('report-1', visits[0], assessments.slice(0, 2), energyOpportunities.slice(0, 2), nonEnergyBenefits.slice(0, 2), kpmImpacts.slice(0, 2)),
      createReport('report-2', visits[1], assessments.slice(2), energyOpportunities.slice(2), nonEnergyBenefits.slice(2), kpmImpacts.slice(2))
    ];

    userIdbService = { user: new BehaviorSubject<IdbUser>(user) };
    companyIdbService = createCollectionService('companies', [company]);
    facilityIdbService = createCollectionService('facilities', [facility]);
    contactIdbService = createCollectionService('contacts', []);
    energyOpportunityIdbService = createCollectionService('energyOpportunities', energyOpportunities);
    assessmentIdbService = createCollectionService('assessments', assessments);
    keyPerformanceIndicatorsIdbService = createCollectionService('keyPerformanceIndicators', []);
    nonEnergyBenefitsIdbService = createCollectionService('nonEnergyBenefits', nonEnergyBenefits);
    onSiteVisitIdbService = createCollectionService('onSiteVisits', visits);
    loadingService = { setLoadingMessage: jasmine.createSpy('setLoadingMessage') };
    energyEquipmentIdbService = createCollectionService('energyEquipments', []);
    processEquipmentIdbService = createCollectionService('processEquipments', []);
    keyPerformanceMetricImpactsIdbService = createCollectionService('keyPerformanceMetricImpacts', kpmImpacts);
    reportIdbService = createCollectionService('reports', reports);
    reportIdbService.setReports = jasmine.createSpy('setReports').and.returnValue(Promise.resolve());

    TestBed.configureTestingModule({
      providers: [
        { provide: CompanyIdbService, useValue: companyIdbService },
        { provide: FacilityIdbService, useValue: facilityIdbService },
        { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
        { provide: AssessmentIdbService, useValue: assessmentIdbService },
        { provide: ContactIdbService, useValue: contactIdbService },
        { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
        { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
        { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorsIdbService },
        { provide: UserIdbService, useValue: userIdbService },
        { provide: LoadingService, useValue: loadingService },
        { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService },
        { provide: ProcessEquipmentIdbService, useValue: processEquipmentIdbService },
        { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactsIdbService },
        { provide: ReportIdbService, useValue: reportIdbService }
      ]
    });
    service = TestBed.inject(BackupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('includes every saved custom report when all data is exported', () => {
    const backupFile = service.getBackupFile(getExportTree());

    expect(backupFile.reports.map(report => report.guid)).toEqual(['report-1', 'report-2']);
  });

  it('includes only reports belonging to selected visits', () => {
    const exportTree = getExportTree();
    const secondVisitNode = exportTree[0].children[0].children[1];
    updateChildren(secondVisitNode, false);
    updateParent(secondVisitNode.parent);

    const backupFile = service.getBackupFile(exportTree);

    expect(backupFile.reports.map(report => report.guid)).toEqual(['report-1']);
  });

  it('filters report options for omitted assessment data without mutating live data', () => {
    const exportTree = getExportTree();
    const firstVisitNode = exportTree[0].children[0].children[0];
    const omittedAssessmentNode = firstVisitNode.children[1];
    updateChildren(omittedAssessmentNode, false);
    updateParent(omittedAssessmentNode.parent);

    const backupFile = service.getBackupFile(exportTree);
    const exportedReport = backupFile.reports.find(report => report.guid === 'report-1');
    const exportedVisit = backupFile.onSiteVisits.find(visit => visit.guid === 'visit-1');

    expect(exportedVisit.assessmentIds).toEqual(['assessment-1']);
    expect(exportedReport.assessmentOptions.map(option => option.assessmentId)).toEqual(['assessment-1']);
    expect(exportedReport.energyOpportunityOptions.map(option => option.energyOpportunityId)).toEqual(['opportunity-1']);
    expect(exportedReport.nonEnergyBenefitOptions.map(option => option.nonEnergyBenefitId)).toEqual(['neb-1']);
    expect(exportedReport.kpmImpactOptions.map(option => option.kpmImpactId)).toEqual(['impact-1']);
    expect(visits[0].assessmentIds).toEqual(['assessment-1', 'assessment-2']);
    expect(reports[0].assessmentOptions.length).toBe(2);
    expect(reports[0].energyOpportunityOptions.length).toBe(2);
    expect(reports[0].nonEnergyBenefitOptions.length).toBe(2);
    expect(reports[0].kpmImpactOptions.length).toBe(2);
  });

  it('imports custom reports with new GUIDs and remapped relationships', async () => {
    const backupFile = createImportBackup();
    const originalReportGuid = backupFile.reports[0].guid;

    await service.importUserBackupFile(backupFile, 'user-2');

    expect(reportIdbService.addWithObservable).toHaveBeenCalledTimes(1);
    const importedReport: IdbReport = reportIdbService.addWithObservable.calls.mostRecent().args[0];
    expect(importedReport.guid).not.toBe(originalReportGuid);
    expect(importedReport.userId).toBe('user-2');
    expect(importedReport.companyId).toBe(backupFile.companies[0].guid);
    expect(importedReport.facilityId).toBe(backupFile.facilities[0].guid);
    expect(importedReport.onSiteVisitId).toBe(backupFile.onSiteVisits[0].guid);
    expect(importedReport.assessmentOptions[0].assessmentId).toBe(backupFile.assessments[0].guid);
    expect(importedReport.energyOpportunityOptions[0].assessmentId).toBe(backupFile.assessments[0].guid);
    expect(importedReport.energyOpportunityOptions[0].energyOpportunityId).toBe(backupFile.energyOpportunities[0].guid);
    expect(importedReport.nonEnergyBenefitOptions[0].assessmentId).toBe(backupFile.assessments[0].guid);
    expect(importedReport.nonEnergyBenefitOptions[0].energyOpportunityId).toBe(backupFile.energyOpportunities[0].guid);
    expect(importedReport.nonEnergyBenefitOptions[0].nonEnergyBenefitId).toBe(backupFile.nonEnergyBenefits[0].guid);
    expect(importedReport.kpmImpactOptions[0].assessmentId).toBe(backupFile.assessments[0].guid);
    expect(importedReport.kpmImpactOptions[0].energyOpportunityId).toBe(backupFile.energyOpportunities[0].guid);
    expect(importedReport.kpmImpactOptions[0].nonEnergyBenefitId).toBe(backupFile.nonEnergyBenefits[0].guid);
    expect(importedReport.kpmImpactOptions[0].kpmImpactId).toBe(backupFile.keyPerformanceMetricImpacts[0].guid);
    expect(importedReport.name).toBe('Report report-1');
    expect(importedReport.notes).toBe('Saved notes');
    expect(importedReport.assessmentOptions[0].include).toBeFalse();
    expect(reportIdbService.setReports).toHaveBeenCalled();
  });

  it('imports legacy backup files without a reports collection', async () => {
    const backupFile = createImportBackup();
    delete backupFile.reports;

    await expectAsync(service.importUserBackupFile(backupFile, 'user-2')).toBeResolved();

    expect(reportIdbService.addWithObservable).not.toHaveBeenCalled();
    expect(reportIdbService.setReports).toHaveBeenCalled();
  });

  function getExportTree(): Array<ExportTreeNode> {
    return buildExportTree([company], [facility], visits, assessments);
  }

  function createImportBackup(): BackupFile {
    return {
      user: { ...user },
      companies: [{ ...company }],
      facilities: [{ ...facility }],
      contacts: [],
      energyOpportunities: [{ ...energyOpportunities[0] }],
      assessments: [{ ...assessments[0] }],
      keyPerformanceIndicators: [],
      nonEnergyBenefits: [{ ...nonEnergyBenefits[0] }],
      onSiteVisits: [{ ...visits[0], assessmentIds: [...visits[0].assessmentIds.slice(0, 1)] }],
      energyEquipment: [],
      processEquipment: [],
      keyPerformanceMetricImpacts: [{ ...kpmImpacts[0] }],
      reports: [{
        ...reports[0],
        assessmentOptions: [{ ...reports[0].assessmentOptions[0] }],
        energyOpportunityOptions: [{ ...reports[0].energyOpportunityOptions[0] }],
        nonEnergyBenefitOptions: [{ ...reports[0].nonEnergyBenefitOptions[0] }],
        kpmImpactOptions: [{ ...reports[0].kpmImpactOptions[0] }],
        assessmentReportOptions: { ...reports[0].assessmentReportOptions }
      }],
      origin: 'JUSTIFI',
      version: '1.0.0',
      backupFileType: 'User',
      timeStamp: new Date(),
      dataBackupId: 'backup-1'
    };
  }

  function createAssessment(guid: string, name: string): IdbAssessment {
    return {
      id: 1,
      guid,
      name,
      userId: user.guid,
      companyId: company.guid,
      facilityId: facility.guid
    } as IdbAssessment;
  }

  function createVisit(guid: string, assessmentIds: Array<string>): IdbOnSiteVisit {
    return {
      id: 1,
      guid,
      userId: user.guid,
      companyId: company.guid,
      facilityId: facility.guid,
      assessmentIds
    } as IdbOnSiteVisit;
  }

  function createEnergyOpportunity(guid: string, assessmentId: string): IdbEnergyOpportunity {
    return {
      id: 1,
      guid,
      userId: user.guid,
      companyId: company.guid,
      facilityId: facility.guid,
      assessmentId
    } as IdbEnergyOpportunity;
  }

  function createNonEnergyBenefit(guid: string, assessmentId: string, energyOpportunityId: string): IdbNonEnergyBenefit {
    return {
      id: 1,
      guid,
      userId: user.guid,
      companyId: company.guid,
      facilityId: facility.guid,
      assessmentId,
      energyOpportunityId
    } as IdbNonEnergyBenefit;
  }

  function createKpmImpact(guid: string, assessmentId: string, energyOpportunityId: string, nebId: string): IdbKeyPerformanceMetricImpact {
    return {
      id: 1,
      guid,
      userId: user.guid,
      companyId: company.guid,
      facilityId: facility.guid,
      assessmentId,
      energyOpportunityId,
      nebId,
      kpiGuid: 'kpi-1',
      kpmGuid: 'kpm-1'
    } as IdbKeyPerformanceMetricImpact;
  }

  function createReport(
    guid: string,
    visit: IdbOnSiteVisit,
    reportAssessments: Array<IdbAssessment>,
    reportEnergyOpportunities: Array<IdbEnergyOpportunity>,
    reportNonEnergyBenefits: Array<IdbNonEnergyBenefit>,
    reportKpmImpacts: Array<IdbKeyPerformanceMetricImpact>
  ): IdbReport {
    return {
      id: 1,
      guid,
      name: `Report ${guid}`,
      notes: 'Saved notes',
      userId: user.guid,
      companyId: company.guid,
      facilityId: facility.guid,
      onSiteVisitId: visit.guid,
      reportType: 'assessment',
      assessmentOptions: reportAssessments.map(assessment => ({
        assessmentId: assessment.guid,
        include: false,
        reportOptionType: 'assessment'
      })),
      energyOpportunityOptions: reportEnergyOpportunities.map(energyOpportunity => ({
        assessmentId: energyOpportunity.assessmentId,
        energyOpportunityId: energyOpportunity.guid,
        include: true,
        reportOptionType: 'energyOpportunity'
      })),
      nonEnergyBenefitOptions: reportNonEnergyBenefits.map(nonEnergyBenefit => ({
        assessmentId: nonEnergyBenefit.assessmentId,
        energyOpportunityId: nonEnergyBenefit.energyOpportunityId,
        nonEnergyBenefitId: nonEnergyBenefit.guid,
        include: true,
        reportOptionType: 'nonEnergyBenefit'
      })),
      kpmImpactOptions: reportKpmImpacts.map(kpmImpact => ({
        assessmentId: kpmImpact.assessmentId,
        energyOpportunityId: kpmImpact.energyOpportunityId,
        nonEnergyBenefitId: kpmImpact.nebId,
        kpmImpactId: kpmImpact.guid,
        include: true,
        reportOptionType: 'kpmImpact'
      })),
      assessmentReportOptions: {
        includeIndividualAssessments: true,
        includeRollupReport: false
      }
    } as IdbReport;
  }

  function createCollectionService(collectionName: string, values: Array<any>): any {
    return {
      [collectionName]: new BehaviorSubject(values),
      addWithObservable: jasmine.createSpy('addWithObservable').and.callFake(value => of(value)),
      updateWithObservable: jasmine.createSpy('updateWithObservable').and.callFake(value => of(value)),
      getAll: jasmine.createSpy('getAll').and.returnValue(of(values))
    };
  }
});
