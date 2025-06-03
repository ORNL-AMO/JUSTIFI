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
      expanded: true,
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
        expanded: true,
        parent: companyNode,
        children: []
      };
      const facilityVisits = visits.filter(v => v.facilityId === facility.guid);
      let visitName = 'On-site Visit';
      facilityNode.children = facilityVisits.map(visit => {
        if (visit.visitDate) {
          visitName += ': ' + new Date(visit.visitDate).toLocaleDateString();
        }
        const visitNode: ExportTreeNode = {
          guid: visit.guid,
          name: visitName,
          item: visit,
          type: 'visit',
          checked: true,
          indeterminate: false,
          expanded: true,
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
          expanded: true,
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

export function  updateChildren(node: ExportTreeNode, checked: boolean) {
  // update the checked state of the node and its children recursively
  node.checked = checked;
  node.indeterminate = false;
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => updateChildren(child, checked));
  }
}
export function updateParent(parent: ExportTreeNode) {
  if (!parent) return;
  const children = parent.children || [];
  const allChecked = children.every(child => child.checked);
  const anyCheckedOrIndeterminate = children.some(child => child.checked || child.indeterminate);
  parent.checked = allChecked;
  parent.indeterminate = !allChecked && anyCheckedOrIndeterminate;
  updateParent(parent.parent);
}

export function setExportNodeByGuid(exportTree: ExportTreeNode[], guid: string) {
  const node = exportTree.find(node => node.guid === guid);
  if (node) {
    node.checked = true;
    node.indeterminate = false;
    updateChildren(node, true);
    updateParent(node.parent);
    return;
  } else {
    exportTree.forEach(node => {
      if (node.children && node.children.length > 0) {
        setExportNodeByGuid(node.children, guid);
      }
    });
  }
}