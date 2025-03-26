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
import { NebItemPipe } from './neb-item.pipe';
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
import { ContactInvalidPipe } from './contact-invalid.pipe';
import { AssociatedPerformanceMetricImpactsPipe } from './associated-performance-metric-impacts.pipe';
import { KpmLabelPipe } from './kpm-label.pipe';
import { NebTotalSavingsPipe } from './neb-total-savings.pipe';
import { FacilityKpiListPipe } from './facility-kpi-list.pipe';
import { ProcessEquipmentListPipe } from './process-equipment-list.pipe';
import { AssessmentItemPipe } from './assessment-item.pipe';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { CurrencyPipe } from '@angular/common';
import { IncludesProcessEquipmentPipe } from './includes-process-equipment.pipe';
import { IncludesEnergyEquipmentPipe } from './includes-energy-equipment.pipe';
import { UtilityTrackedFacilityPipe } from './utility-tracked-facility.pipe';
import { UtilityTrackedAssessmentPipe } from './utility-tracked-assessment.pipe';
import { IncludedInAssessmentPipe } from './included-in-assessment.pipe';
import { FormatPlaceholderTextPipe } from './format-placeholder-text.pipe';
import { OnSiteReportsListPipe } from './on-site-reports-list.pipe';
import { KpmImpactLabelPipe } from './kpm-impact-label.pipe';

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
    NebItemPipe,
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
    ContactInvalidPipe,
    AssociatedPerformanceMetricImpactsPipe,
    KpmLabelPipe,
    NebTotalSavingsPipe,
    FacilityKpiListPipe,
    ProcessEquipmentListPipe,
    AssessmentItemPipe,
    CurrencySymbolPipe,
    IncludesProcessEquipmentPipe,
    IncludesEnergyEquipmentPipe,
    UtilityTrackedFacilityPipe,
    UtilityTrackedAssessmentPipe,
    IncludedInAssessmentPipe,
    FormatPlaceholderTextPipe,
    OnSiteReportsListPipe,
    KpmImpactLabelPipe
  ],
  imports: [
    CommonModule
  ],
  providers: [
    CurrencyPipe,
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
    NebItemPipe,
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
    ContactInvalidPipe,
    AssociatedPerformanceMetricImpactsPipe,
    KpmLabelPipe,
    NebTotalSavingsPipe,
    FacilityKpiListPipe,
    ProcessEquipmentListPipe,
    AssessmentItemPipe,
    CurrencySymbolPipe,
    IncludesProcessEquipmentPipe,
    IncludesEnergyEquipmentPipe,
    UtilityTrackedFacilityPipe,
    UtilityTrackedAssessmentPipe,
    IncludedInAssessmentPipe,
    FormatPlaceholderTextPipe,
    OnSiteReportsListPipe,
    KpmImpactLabelPipe
  ]
})
export class HelperPipesModule { }
