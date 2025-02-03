import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbChangesService } from 'src/app/indexed-db/db-changes.service';

@Component({
    selector: 'app-data-collection',
    templateUrl: './data-collection.component.html',
    styleUrl: './data-collection.component.css',
    standalone: false
})
export class DataCollectionComponent {

  constructor(private activatedRoute: ActivatedRoute,
    private dbChangesService: DbChangesService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      let visitGUID: string = params['id'];
      let visitExists: boolean = this.dbChangesService.selectOnSiteVisit(visitGUID);
      if (!visitExists) {
        console.log('visit does not exist. Nav back to getting started..');
        this.router.navigateByUrl('/welcome');
      }
    });
  }
}
