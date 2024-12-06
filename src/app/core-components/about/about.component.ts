import { Component } from '@angular/core';
import { faCircleInfo, faInfo, IconDefinition, faScaleBalanced } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  faCircleInfo: IconDefinition = faCircleInfo;
  faScaleBalanced: IconDefinition = faScaleBalanced;
}
