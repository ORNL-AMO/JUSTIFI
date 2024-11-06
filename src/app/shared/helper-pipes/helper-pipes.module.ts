import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyNamePipe } from './company-name.pipe';
import { FacilityNamePipe } from './facility-name.pipe';
import { FacilityListPipe } from './facility-list.pipe';
import { AddressDisplayPipe } from './address-display.pipe';
import { AssessmentsListPipe } from './assessments-list.pipe';
import { KpiLabelPipe } from './kpi-label.pipe';
import { UnitsDisplayPipe } from './units-display.pipe';
import { ContactNamePipe } from './contact-name.pipe';
import { EquipmentTypeIconPipe } from './equipment-type-icon.pipe';
import { IncludesContactPipe } from './includes-contact.pipe';
import { AssessmentNameDisplayPipe } from './assessment-name-display.pipe';
import { ProcessEquipmentDisplayPipe } from './process-equipment-display.pipe';
import { NebDisplayPipe } from './neb-display.pipe';
import { OnSiteVisitListPipe } from './on-site-visit-list.pipe';
import { AssessmentListOnSitePipe } from './assessment-list-on-site.pipe';
import { NebListPipe } from './neb-list.pipe';
import { AssociatedContactsPipe } from './associated-contacts.pipe';
import { CompanyKpiListPipe } from './company-kpi-list.pipe';
import { EnergyOpportunityDisplayPipe } from './energy-opportunity-display.pipe';
import { EnergyOpportunityListPipe } from './energy-opportunity-list.pipe';
import { KpiMetricsListPipe } from './kpi-metrics-list.pipe';
import { NebOptionsListPipe } from './neb-options-list.pipe';
import { KpiListFilterPipe } from './kpi-list-filter.pipe';
import { KpiValueDisplayPipe } from './kpi-value-display.pipe';
import { EnergyEquipmentDisplayPipe } from './energy-equipment-display.pipe';
import { EnergyEquipmentListPipe } from './energy-equipment-list.pipe';
import { KeyPerformanceMetricImpactsListPipe } from './key-performance-metric-impacts-list.pipe';
import { ContactNameDisplayPipe } from './contact-name-display.pipe';
import { LinkedUnitOptionsPipe } from './linked-unit-options.pipe';
import { LinkedUtilityOptionsPipe } from './linked-utility-options.pipe';
import { IsStandardUnitPipe } from './is-standard-unit.pipe';
import { UtilityHhvDisplayPipe } from './utility-hhv-display.pipe';

@NgModule({
  declarations: [
    CompanyNamePipe,
    FacilityNamePipe,
    FacilityListPipe,
    AddressDisplayPipe,
    AssessmentsListPipe,
    KpiLabelPipe,
    UnitsDisplayPipe,
    ContactNameDisplayPipe,
    ContactNamePipe,
    EquipmentTypeIconPipe,
    IncludesContactPipe,
    AssessmentNameDisplayPipe,
    ProcessEquipmentDisplayPipe,
    NebDisplayPipe,
    OnSiteVisitListPipe,
    AssessmentListOnSitePipe,
    NebListPipe,
    AssociatedContactsPipe,
    CompanyKpiListPipe,
    EnergyOpportunityDisplayPipe,
    EnergyOpportunityListPipe,
    KpiMetricsListPipe,
    NebOptionsListPipe,
    KpiListFilterPipe,
    KpiValueDisplayPipe,
    EnergyEquipmentDisplayPipe,
    EnergyEquipmentListPipe,
    KeyPerformanceMetricImpactsListPipe,
    LinkedUnitOptionsPipe,
    LinkedUtilityOptionsPipe,
    IsStandardUnitPipe,
    UtilityHhvDisplayPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CompanyNamePipe,
    FacilityNamePipe,
    FacilityListPipe,
    AddressDisplayPipe,
    AssessmentsListPipe,
    KpiLabelPipe,
    UnitsDisplayPipe,
    ContactNameDisplayPipe,
    ContactNamePipe,
    EquipmentTypeIconPipe,
    IncludesContactPipe,
    AssessmentNameDisplayPipe,
    ProcessEquipmentDisplayPipe,
    NebDisplayPipe,
    OnSiteVisitListPipe,
    AssessmentListOnSitePipe,
    NebListPipe,
    AssociatedContactsPipe,
    CompanyKpiListPipe,
    EnergyOpportunityDisplayPipe,
    EnergyOpportunityListPipe,
    KpiMetricsListPipe,
    NebOptionsListPipe,
    KpiListFilterPipe,
    KpiValueDisplayPipe,
    EnergyEquipmentDisplayPipe,
    EnergyEquipmentListPipe,
    KeyPerformanceMetricImpactsListPipe,
    LinkedUnitOptionsPipe,
    LinkedUtilityOptionsPipe,
    IsStandardUnitPipe,
    UtilityHhvDisplayPipe,
  ]
})
export class HelperPipesModule { }
