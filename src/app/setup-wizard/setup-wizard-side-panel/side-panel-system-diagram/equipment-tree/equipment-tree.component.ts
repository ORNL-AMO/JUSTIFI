import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-equipment-tree',
  standalone: false,
  
  templateUrl: './equipment-tree.component.html',
  styleUrl: './equipment-tree.component.css'
})
export class EquipmentTreeComponent {
  @Input({required: true})
  equipmentId: string;
  @Input({required: true})
  equipmentContext: 'energyEquipment' | 'processEquipment';

  constructor(){
    
  }
}
