import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleCellItemComponent } from './single-cell-item/single-cell-item.component';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';



@NgModule({
  declarations: [
    SingleCellItemComponent
  ],
  imports: [
    CommonModule,
    HelperPipesModule
  ],
  exports: [
    SingleCellItemComponent
  ]
})
export class TableEntriesModule { }
