import { BehaviorSubject } from "rxjs";
import { UserIdbService } from "../indexed-db/user-idb.service"
import { CompanyIdbService } from "../indexed-db/company-idb.service";
import { getNewIdbCompany, IdbCompany } from "../models/company";
import { FacilityIdbService } from "../indexed-db/facility-idb.service";
import { getNewIdbFacility, IdbFacility } from "../models/facility";
import { getNewIdbUser, IdbUser } from "../models/user";
import { EnergyOpportunityIdbService } from "../indexed-db/energy-opportunity-idb.service";
import { getNewIdbEnergyOpportunity, IdbEnergyOpportunity } from "../models/energyOpportunity";
import { AssessmentIdbService } from "../indexed-db/assessment-idb.service";
import { getNewIdbAssessment, IdbAssessment } from "../models/assessment";
import { ContactIdbService } from "../indexed-db/contact-idb.service";
import { ContactContext, getNewIdbContact, IdbContact } from "../models/contact";
import { NonEnergyBenefitsIdbService } from "../indexed-db/non-energy-benefits-idb.service";
import { getNewIdbNonEnergyBenefit, IdbNonEnergyBenefit } from "../models/nonEnergyBenefit";
import { OnSiteVisitIdbService } from "../indexed-db/on-site-visit-idb.service";
import { getNewIdbOnSiteVisit, IdbOnSiteVisit } from "../models/onSiteVisit";
import { SetupWizardService } from "../setup-wizard/setup-wizard.service";
import { KeyPerformanceIndicatorsIdbService } from "../indexed-db/key-performance-indicators-idb.service";
import { getNewKeyPerformanceIndicator, IdbKeyPerformanceIndicator } from "../models/keyPerformanceIndicator";
import { EnergyEquipmentIdbService } from "../indexed-db/energy-equipment-idb.service";
import { getNewIdbEnergyEquipment, IdbEnergyEquipment } from "../models/energyEquipment";
import { ProcessEquipmentIdbService } from "../indexed-db/process-equipment-idb.service";
import { getNewIdbProcessEquipment, IdbProcessEquipment } from "../models/processEquipment";
import { KeyPerformanceMetricImpactsIdbService } from "../indexed-db/key-performance-metric-impacts-idb.service";
import { getNewIdbKeyPerformanceMetricImpact, IdbKeyPerformanceMetricImpact } from "../models/keyPerformanceMetricImpact";
import { LocalStorageDataService } from "../shared/shared-services/local-storage-data.service";
import { ActivatedRoute } from "@angular/router";
import { getDefaultUnitSettings } from "../models/unitSettings";
import { KeyPerformanceIndicatorOption } from "../shared/constants/keyPerformanceIndicatorOptions";
import { SharedDataService } from "../shared/shared-services/shared-data.service";
import { CompanyContactsFormService } from "../shared/shared-company-forms/company-contacts-form/company-contacts-form.service";
import { FormControl, FormGroup } from "@angular/forms";

let stubCompany: IdbCompany = getNewIdbCompany('123');
stubCompany.guid = '123';

let companyIdbService: Partial<CompanyIdbService> = {
    companies: new BehaviorSubject<Array<IdbCompany>>([stubCompany]),
    selectedCompany: new BehaviorSubject<IdbCompany>(stubCompany),
    getByGUID: () => { return stubCompany }
};

let stubFacility: IdbFacility = getNewIdbFacility('123', '123');
stubFacility.guid = '123';

let facilityIdbService: Partial<FacilityIdbService> = {
    facilities: new BehaviorSubject<Array<IdbFacility>>([stubFacility]),
    selectedFacility: new BehaviorSubject<IdbFacility>(stubFacility),
    getByGUID: () => { return stubFacility },
    getByOtherGuid: () => { return [stubFacility] }
};

let stubUser: IdbUser = getNewIdbUser();
stubUser.guid = '123';
let userIdbService: Partial<UserIdbService> = {
    user: new BehaviorSubject<IdbUser>(stubUser)
};


let stubEnergyOpp: IdbEnergyOpportunity = getNewIdbEnergyOpportunity('123', '123', '123', '123', []);
stubEnergyOpp.guid = '123';
let energyOpportunityIdbService: Partial<EnergyOpportunityIdbService> = {
    energyOpportunities: new BehaviorSubject<Array<IdbEnergyOpportunity>>([stubEnergyOpp]),
    getByGuid: () => { return stubEnergyOpp },
    getByOtherGuid: () => { return [stubEnergyOpp] }
};

let stubAssessment: IdbAssessment = getNewIdbAssessment('123', '123', '123', getDefaultUnitSettings());
stubAssessment.guid = '123';
let assessmentIdbService: Partial<AssessmentIdbService> = {
    assessments: new BehaviorSubject<Array<IdbAssessment>>([stubAssessment]),
    selectedAssessment: new BehaviorSubject<IdbAssessment>(stubAssessment),
    getByGuid: () => { return stubAssessment },
    getByOtherGuid: () => { return [stubAssessment] }
};

let stubContact: IdbContact = getNewIdbContact('123', '123');
stubContact.guid = '123';
let contactIdbService: Partial<ContactIdbService> = {
    contacts: new BehaviorSubject<Array<IdbContact>>([stubContact]),
    getContactByGuid: () => { return stubContact }
};

let stubNeb: IdbNonEnergyBenefit = getNewIdbNonEnergyBenefit('123', '123', '123', '123', '123', undefined, false);
stubNeb.guid = '123';
let nonEnergyBenefitsIdbService: Partial<NonEnergyBenefitsIdbService> = {
    nonEnergyBenefits: new BehaviorSubject<Array<IdbNonEnergyBenefit>>([stubNeb]),
    getEnergyOpportunityNonEnergyBenefits: () => { return [stubNeb] }
};

let stubOnSiteVisit: IdbOnSiteVisit = getNewIdbOnSiteVisit('123', '123', '123');
stubOnSiteVisit.guid = '123';
let onSiteVisitIdbService: Partial<OnSiteVisitIdbService> = {
    onSiteVisits: new BehaviorSubject<Array<IdbOnSiteVisit>>([stubOnSiteVisit]),
    selectedVisit: new BehaviorSubject<IdbOnSiteVisit>(stubOnSiteVisit)
};

let setupWizardService: Partial<SetupWizardService> = {
    sidebarOpen: new BehaviorSubject<boolean>(true),
    helpPanelOpen: new BehaviorSubject<boolean>(true)
};

let option: KeyPerformanceIndicatorOption =
{
    primaryKPI: 'Operations',
    label: 'Expense Cost',
    htmlLabel: 'Expense Cost',
    optionValue: 'reduceExpenseCost'
}
let stubKpi: IdbKeyPerformanceIndicator = getNewKeyPerformanceIndicator('123', '123', option, false);
stubKpi.guid = '123';
let keyPerformanceIndicatorService: Partial<KeyPerformanceIndicatorsIdbService> = {
    keyPerformanceIndicators: new BehaviorSubject<Array<IdbKeyPerformanceIndicator>>([stubKpi]),
    getByCompanyGuid: () => { return [stubKpi] },
    getByGuid: () => { return stubKpi },
    getCompanyKeyPerformanceMetrics: () => { return [] }
}

let stubEnergyEquipment: IdbEnergyEquipment = getNewIdbEnergyEquipment('123', '123', '123', getDefaultUnitSettings());
stubEnergyEquipment.guid = '123';
let energyEquipmentIdbService: Partial<EnergyEquipmentIdbService> = {
    energyEquipments: new BehaviorSubject<Array<IdbEnergyEquipment>>([stubEnergyEquipment]),
    getByOtherGuid: () => { return [stubEnergyEquipment] },
    getByGuid: () => { return stubEnergyEquipment }
};

let stubProcessEquipment: IdbProcessEquipment = getNewIdbProcessEquipment('123', '123', '123');
stubProcessEquipment.guid = '123';
let processEquipmentIdbService: Partial<ProcessEquipmentIdbService> = {
    processEquipments: new BehaviorSubject<Array<IdbProcessEquipment>>([stubProcessEquipment]),
    getByGuid: () => { return stubProcessEquipment }
}

let stubKpiImpact: IdbKeyPerformanceMetricImpact = getNewIdbKeyPerformanceMetricImpact('123', '123', '123', '123', '123', 'TRIR', '123', '123', '123');
stubKpiImpact.guid = '123';
let keyPerformanceMetricImpactIdbService: Partial<KeyPerformanceMetricImpactsIdbService> = {
    keyPerformanceMetricImpacts: new BehaviorSubject<Array<IdbKeyPerformanceMetricImpact>>([stubKpiImpact])
}

let sharedDataService: Partial<SharedDataService> = {
    createAssessmentModalOpen: new BehaviorSubject<boolean>(false),
    sidebarOpen: new BehaviorSubject<boolean>(false),
    displayAddNebsModal: new BehaviorSubject<{ assessmentId: string, energyOpportunityId: string }>(undefined),
    displayContactModal: new BehaviorSubject<{ context: ContactContext, viewContact: IdbContact, contextGuid: string, companyId: string }>(undefined)
}

let companyContactsFormService: Partial<CompanyContactsFormService> = {
    getFormFromIdbContact: () => {
        return new FormGroup({
            'firstname': new FormControl(),
            'lastname': new FormControl(),
            'phone': new FormControl(),
            'ext': new FormControl(),
            'email': new FormControl(),
            'role': new FormControl(),
            'team': new FormControl(),
            'notes': new FormControl()
        })
    }
}

export const stubServiceProviders: Array<{ provide: any, useValue: any }> = [
    { provide: CompanyIdbService, useValue: companyIdbService },
    { provide: FacilityIdbService, useValue: facilityIdbService },
    { provide: UserIdbService, useValue: userIdbService },
    { provide: EnergyOpportunityIdbService, useValue: energyOpportunityIdbService },
    { provide: AssessmentIdbService, useValue: assessmentIdbService },
    { provide: ContactIdbService, useValue: contactIdbService },
    { provide: NonEnergyBenefitsIdbService, useValue: nonEnergyBenefitsIdbService },
    { provide: OnSiteVisitIdbService, useValue: onSiteVisitIdbService },
    { provide: SetupWizardService, useValue: setupWizardService },
    { provide: KeyPerformanceIndicatorsIdbService, useValue: keyPerformanceIndicatorService },
    { provide: EnergyEquipmentIdbService, useValue: energyEquipmentIdbService },
    { provide: ProcessEquipmentIdbService, useValue: processEquipmentIdbService },
    { provide: KeyPerformanceMetricImpactsIdbService, useValue: keyPerformanceMetricImpactIdbService },
    { provide: LocalStorageDataService, useValue: {} },
    { provide: SharedDataService, useValue: sharedDataService },
    { provide: CompanyContactsFormService, useValue: companyContactsFormService },
    {
        provide: ActivatedRoute,
        useValue: {
            params: new BehaviorSubject({ 'id': '123' })
        }
    }
]