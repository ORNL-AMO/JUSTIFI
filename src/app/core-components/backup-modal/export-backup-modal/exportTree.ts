import { IdbAssessment } from "src/app/models/assessment";
import { IdbCompany } from "src/app/models/company";
import { IdbFacility } from "src/app/models/facility";
import { IdbOnSiteVisit } from "src/app/models/onSiteVisit";

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