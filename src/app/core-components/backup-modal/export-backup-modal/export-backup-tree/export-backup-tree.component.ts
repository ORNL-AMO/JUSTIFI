import { Component, Input } from '@angular/core';
import { ExportTreeNode, updateChildren, updateParent } from '../exportTree';
import { IconDefinition, faAngleDown, faAngleRight, faBuilding, faIndustry, faCalendar, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-export-backup-tree',
  standalone: false,
  
  templateUrl: './export-backup-tree.component.html',
  styleUrl: './export-backup-tree.component.css'
})
export class ExportBackupTreeComponent {
  @Input()
  nodes: ExportTreeNode[] = [];

  faAngleRight: IconDefinition = faAngleRight;
  faAngleDown: IconDefinition = faAngleDown;
  faBuilding: IconDefinition = faBuilding;
  faIndustry: IconDefinition = faIndustry;
  faCalendar: IconDefinition = faCalendar;
  faScrewdriverWrench: IconDefinition = faScrewdriverWrench;
  
  constructor() { }

  toggleNode(node: ExportTreeNode) {
    node.expanded = !node.expanded;
  }

  onCheckboxChange(node: ExportTreeNode) {
    updateChildren(node, node.checked);
    updateParent(node.parent);
  }
}
