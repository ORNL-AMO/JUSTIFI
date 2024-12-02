import { Component } from '@angular/core';
import { faDatabase, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nebs-database',
  templateUrl: './nebs-database.component.html',
  styleUrl: './nebs-database.component.css'
})
export class NebsDatabaseComponent {

  faDatabase: IconDefinition = faDatabase;

}
