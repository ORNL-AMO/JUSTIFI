import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablePaginationComponent } from './table-pagination.component';



@NgModule({
  declarations: [
    TablePaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TablePaginationComponent
  ]
})
export class TablePaginationModule { }
