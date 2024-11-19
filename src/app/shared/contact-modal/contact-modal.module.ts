import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactModalComponent } from './contact-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HelperPipesModule } from '../helper-pipes/_helper-pipes.module';



@NgModule({
  declarations: [
    ContactModalComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    HelperPipesModule
  ],
  exports: [ContactModalComponent]
})
export class ContactModalModule { }
