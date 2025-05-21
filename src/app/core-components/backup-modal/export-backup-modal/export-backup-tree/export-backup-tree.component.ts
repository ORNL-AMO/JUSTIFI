import { Component, Input } from '@angular/core';
import { ExportTreeNode } from '../exportTree';
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
    this.updateChildren(node, node.checked);
    this.updateParent(node.parent);
  }

  updateChildren(node: ExportTreeNode, checked: boolean) {
    // update the checked state of the node and its children recursively
    node.checked = checked;
    node.indeterminate = false;
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => this.updateChildren(child, checked));
    }
  }
  updateParent(parent: ExportTreeNode) {
    if (!parent) return;
    const children = parent.children || [];
    const allChecked = children.every(child => child.checked);
    const anyCheckedOrIndeterminate = children.some(child => child.checked || child.indeterminate);
    parent.checked = allChecked;
    parent.indeterminate = !allChecked && anyCheckedOrIndeterminate;
    this.updateParent(parent.parent);
  }
}
