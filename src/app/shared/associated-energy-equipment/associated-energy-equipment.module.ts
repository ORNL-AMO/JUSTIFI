import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociatedEnergyEquipmentButtonsComponent } from './associated-energy-equipment-buttons/associated-energy-equipment-buttons.component';
import { AssociatedEnergyEquipmentModalComponent } from './associated-energy-equipment-modal/associated-energy-equipment-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';



@NgModule({
  declarations: [
    AssociatedEnergyEquipmentButtonsComponent,
    AssociatedEnergyEquipmentModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HelperPipesModule
  ],
  exports: [
    AssociatedEnergyEquipmentButtonsComponent
  ]
})
export class AssociatedEnergyEquipmentModule { }
