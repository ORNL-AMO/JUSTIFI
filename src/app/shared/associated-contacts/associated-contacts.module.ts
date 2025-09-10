import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssociatedContactsButtonsComponent } from './associated-contacts-buttons/associated-contacts-buttons.component';
import { AssociatedContactsModalComponent } from './associated-contacts-modal/associated-contacts-modal.component';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedCompanyFormsModule } from '../shared-company-forms/shared-company-forms.module';



@NgModule({
  declarations: [
    AssociatedContactsButtonsComponent,
    AssociatedContactsModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HelperPipesModule,
    SharedCompanyFormsModule
  ],
  exports: [
    AssociatedContactsButtonsComponent
  ]
})
export class AssociatedContactsModule { }
