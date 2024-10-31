import { Component } from '@angular/core';
import { faTrophy, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-acknowledgments',
  templateUrl: './acknowledgments.component.html',
  styleUrl: './acknowledgments.component.css'
})
export class AcknowledgmentsComponent {

  faTrophy: IconDefinition = faTrophy;
}
