import { Injectable } from '@angular/core';
import { Observable, catchError, concatMap, from, map, of } from 'rxjs';
import { OnSiteVisitIdbService } from './on-site-visit-idb.service';

@Injectable({
  providedIn: 'root'
})
export class OnSiteVisitActivityService {

  private activeVisitGuid: string;

  constructor(private onSiteVisitIdbService: OnSiteVisitIdbService) { }

  setActiveVisit(visitGuid: string) {
    this.activeVisitGuid = visitGuid;
  }

  clearActiveVisit() {
    this.activeVisitGuid = undefined;
  }

  trackActivity<T>(operation: Observable<T>): Observable<T> {
    const visitGuid = this.activeVisitGuid;
    if (!visitGuid) {
      return operation;
    }

    return operation.pipe(
      concatMap(result => {
        return from(this.onSiteVisitIdbService.touchModifiedDate(visitGuid)).pipe(
          map(() => result),
          catchError(error => {
            console.error(`Unable to update activity timestamp for visit ${visitGuid}.`, error);
            return of(result);
          })
        );
      })
    );
  }
}
