import { IdbAssessment } from "src/app/models/assessment";
import { IdbCompany } from "src/app/models/company";
import { IdbFacility } from "src/app/models/facility";
import { IdbOnSiteVisit } from "src/app/models/onSiteVisit";
import _ from "lodash";

export interface ExportTreeNode {
  guid: string;
  name: string;
  item: IdbCompany | IdbFacility | IdbOnSiteVisit | IdbAssessment;
  type: 'company' | 'facility' | 'visit' | 'assessment';
  checked: boolean;
  indeterminate: boolean;
  expanded: boolean;
  children?: ExportTreeNode[];
  parent?: ExportTreeNode | null;
}

export interface SelectedExportGuids {
  companyGuids: string[];
  facilityGuids: string[];
  visitGuids: string[];
  assessmentGuids: string[];
}

export function buildExportTree(
  companies: Array<IdbCompany>,
  facilities: Array<IdbFacility>,
  visits: Array<IdbOnSiteVisit>,
  assessments: Array<IdbAssessment>,
  parent: ExportTreeNode | null = null
  ): ExportTreeNode[] {
  return companies.map(company => {
    const companyNode: ExportTreeNode = {
      guid: company.guid,
      name: company.generalInformation?.name || 'Company',
      item: company,
      type: 'company',
      checked: true,
      indeterminate: false,
      expanded: false,
      parent: parent,
      children: []
    };
    const companyFacilities = facilities.filter(f => f.companyId === company.guid);
    companyNode.children = companyFacilities.map(facility => {
      const facilityNode: ExportTreeNode = {
        guid: facility.guid,
        name: facility.generalInformation?.name || 'Facility',
        item: facility,
        type: 'facility',
        checked: true,
        indeterminate: false,
        expanded: false,
        parent: companyNode,
        children: []
      };
      const facilityVisits = visits.filter(v => v.facilityId === facility.guid);
      facilityNode.children = facilityVisits.map(visit => {
        const visitNode: ExportTreeNode = {
          guid: visit.guid,
          name: visit.visitDate?.toString() || 'Visit',
          item: visit,
          type: 'visit',
          checked: true,
          indeterminate: false,
          expanded: false,
          parent: facilityNode,
          children: []
        };
        const visitAssessments = assessments.filter(a => visit.assessmentIds.includes(a.guid));
        visitNode.children = visitAssessments.map(assessment => ({
          guid: assessment.guid,
          name: assessment.name,
          item: assessment,
          type: 'assessment',
          checked: true,
          indeterminate: false,
          expanded: false,
          parent: visitNode,
          children: []
        }));
        return visitNode;
      });
      return facilityNode;
    });
    return companyNode;
  });
}

export function getSelectedExportGuids(exportTree: ExportTreeNode[]): SelectedExportGuids {
  let selectedGuids: SelectedExportGuids = {
    companyGuids: [],
    facilityGuids: [],
    visitGuids: [],
    assessmentGuids: []
  };

  exportTree.forEach(company => {
    if (company.checked || company.indeterminate) {
      selectedGuids.companyGuids.push(company.guid);
      company.children?.forEach(facility => {
        if (facility.checked || facility.indeterminate) {
          selectedGuids.facilityGuids.push(facility.guid);
          facility.children?.forEach(visit => {
            if (visit.checked || visit.indeterminate) {
              selectedGuids.visitGuids.push(visit.guid);
              visit.children?.forEach(assessment => {
                if (assessment.checked || assessment.indeterminate) {
                  selectedGuids.assessmentGuids.push(assessment.guid);
                }
              });
            }
          });
        }
      });
    }
  });

  selectedGuids.companyGuids = _.uniq(selectedGuids.companyGuids);
  selectedGuids.facilityGuids = _.uniq(selectedGuids.facilityGuids);
  selectedGuids.visitGuids = _.uniq(selectedGuids.visitGuids);
  selectedGuids.assessmentGuids = _.uniq(selectedGuids.assessmentGuids);

  return selectedGuids;
}