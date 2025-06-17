import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NebsDatabaseComponent } from './nebs-database.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NebOptionsFilterPipe } from './nebs-database-table/neb-options-filter.pipe';
import { FormsModule } from '@angular/forms';
import { NebsDatabaseTableComponent } from './nebs-database-table/nebs-database-table.component';
import { HelperPipesModule } from '../shared/helper-pipes/_helper-pipes.module';
import { KeywordHighlightPipe } from '../shared/helper-pipes/keyword-highlight.pipe';



@NgModule({
  declarations: [
    NebsDatabaseComponent,
    NebOptionsFilterPipe,
    NebsDatabaseTableComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HelperPipesModule
  ],
  exports: [
    NebsDatabaseTableComponent
  ]
})
export class NebsDatabaseModule { }
