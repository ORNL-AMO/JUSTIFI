import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebsDatabaseComponent } from './nebs-database.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NebOptionsFilterPipe } from './nebs-database-table/neb-options-filter.pipe';
import { FormsModule } from '@angular/forms';
import { NebsDatabaseTableComponent } from './nebs-database-table/nebs-database-table.component';



@NgModule({
  declarations: [
    NebsDatabaseComponent,
    NebOptionsFilterPipe,
    NebsDatabaseTableComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule
  ]
})
export class NebsDatabaseModule { }
