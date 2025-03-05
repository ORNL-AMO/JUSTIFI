import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociatedProcessEquipmentButtonsComponent } from './associated-process-equipment-buttons/associated-process-equipment-buttons.component';
import { AssociatedProcessEquipmentModalComponent } from './associated-process-equipment-modal/associated-process-equipment-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';



@NgModule({
  declarations: [
    AssociatedProcessEquipmentButtonsComponent,
    AssociatedProcessEquipmentModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HelperPipesModule
  ],
  exports: [AssociatedProcessEquipmentButtonsComponent]
})
export class AssociatedProcessEquipmentModule { }
