import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { AnalyticsService } from 'src/app/analytics/analytics.service';
import { environment } from 'src/environments/environment';

export type EmailSubscriptionStatus = 'error' | 'success' | 'sending' | undefined;

@Injectable({
  providedIn: 'root'
})
export class EmailListSubscribeService {
  readonly submittedStatus = new BehaviorSubject<EmailSubscriptionStatus>(undefined);

  private readonly apiUrl = environment.measurUtilitiesApi + 'justifi-email-subscriber';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'json' as const
  };

  constructor(
    private httpClient: HttpClient,
    private analyticsService: AnalyticsService
  ) { }

  checkEmailValid(subscriberEmail: string | undefined): string | undefined {
    const email = subscriberEmail?.trim();
    const emailControl = new FormControl(email, Validators.email);

    if (email && emailControl.valid) {
      return undefined;
    }

    return 'Please enter a valid email address.';
  }

  submitSubscriberEmail(email: string): Observable<void> {
    this.submittedStatus.next('sending');

    const subscriber: Subscriber = {
      email,
      name: email
    };

    return this.httpClient.post<SubscriberResponse>(
      this.apiUrl,
      subscriber,
      { ...this.httpOptions, observe: 'response' as const }
    ).pipe(
      tap((response: HttpResponse<SubscriberResponse>) => {
        if (response.status === 200 || response.status === 201) {
          this.analyticsService.sendEvent('email-list-subscribe');
          this.submittedStatus.next('success');
        } else {
          this.submittedStatus.next('error');
        }
      }),
      map(() => undefined),
      catchError(() => {
        this.submittedStatus.next('error');
        return of(undefined);
      })
    );
  }
}

interface Subscriber {
  email: string;
  name: string;
}

interface SubscriberResponse {
  id: number;
}
