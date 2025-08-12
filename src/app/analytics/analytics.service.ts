import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { ElectronService } from '../electron/electron.service';
import { catchError, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnalyticsDataDbService, AppAnalyticsData } from '../indexed-db/analytics-data-db.service';
declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private clientId: string;
  analyticsSessionId: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient,
    private analyticsDataDbService: AnalyticsDataDbService,
    private electronService: ElectronService) {
    this.analyticsSessionId = uuidv4();
  }

  async setClientAnalyticsId() {
    let appAnalyticsData: Array<AppAnalyticsData> = await firstValueFrom(this.analyticsDataDbService.getAppAnalyticsData());
    let clientId: string;
    if (appAnalyticsData.length == 0) {
      clientId = uuidv4();
      await firstValueFrom(this.analyticsDataDbService.addWithObservable({
        clientId: clientId,
        modifiedDate: new Date()
      }));
    } else {
      clientId = appAnalyticsData[0].clientId;
    }
    this.setClientId(clientId);
  }

  async initAnalyticsSession(path: string) {
    await this.setClientAnalyticsId();
    let justifiOpenEvent: GAEvent = {
      name: 'justifi_app_open',
      params: {
        justifi_platform: 'justifi-desktop',
        session_id: this.analyticsSessionId,
        // engagement_time_msec required to begin an analytics session but not used again
        engagement_time_msec: '100',
      }
    };
    this.postEventToMeasurementProtocol(justifiOpenEvent);
    if (path) {
      this.sendAnalyticsPageView(path);
    }
  }

  async sendAnalyticsPageView(path: string) {
    if (!this.clientId) {
      await this.initAnalyticsSession(path);
    } else {
      let pageViewEvent: GAEvent = {
        name: 'page_view',
        params: {
          justifi_platform: 'justifi-desktop',
          page_path: path,
          session_id: this.analyticsSessionId
        }
      }
      this.postEventToMeasurementProtocol(pageViewEvent)
    }
  }

  async sendAnalyticsEvent(eventName: AnalyticsEventString, eventParams: EventParameters) {
    if (!this.clientId) {
      await this.initAnalyticsSession(undefined);
    } else {
      eventParams.session_id = this.analyticsSessionId;
      let pageViewEvent: GAEvent = {
        name: eventName,
        params: eventParams
      }
      this.postEventToMeasurementProtocol(pageViewEvent)
    }
  }

  postEventToMeasurementProtocol(gaEvent: GAEvent) {
    if (gaEvent.name === 'page_view') {
      this.setPageViewEventUrl(gaEvent);
    }

    let callDebuggingEndpoint = environment.production ? false : true;
    let postBody = {
      isDebugging: callDebuggingEndpoint,
      isJustifi: true,
      analyticsPayload: {
        client_id: this.clientId,
        non_personalized_ads: true,
        events: [
          gaEvent
        ]
      }
    }

    let url: string = environment.measurUtilitiesApi + 'gamp';
    if (environment.production) {
      this.httpClient.post<any>(url, postBody, this.httpOptions)
        .pipe(catchError(error => [])).subscribe({
          next: (resp) => {
            // GA Debugging endpoint returns response
            // GA prod endpoint returns null on success
          },
          error: (error: AnalyticsHttpError) => {
            // for now all errors fail silently
          }
        });
    }
  }

  setClientId(uuid: string) {
    this.clientId = uuid;
  }

  setPageViewEventUrl(pageViewEvent: GAEvent) {
    pageViewEvent.params.page_path = this.getPageWithoutId(pageViewEvent.params.page_path);
    // Never send real paths while in dev
    if (!environment.production) {
      pageViewEvent.params.page_path = '/testing'
    }
  }

  getPageWithoutId(pagePath: string) {
    // Replace segments that match the custom ID pattern: 9 chars, lowercase letters and digits, with ':id'
    return pagePath
      .split('/')
      .map(segment => /^[a-z0-9]{9}$/.test(segment) ? ':id' : segment)
      .join('/') || '/';
  }

  sendEvent(eventName: AnalyticsEventString, options?: { path?: string, kpi_name?: string, kpm_name?: string, neb_name?: string, kpm_impact_name?: string }) {
    if (environment.production) {
      if (!this.electronService.isElectron) {
        let eventParams: EventParameters = {
          page_path: options?.path || '',
          justifi_platform: 'justifi-web',
          session_id: undefined,
          neb_name: this.formatEventName(options?.neb_name),
          kpi_name: this.formatEventName(options?.kpi_name),
          kpm_name: this.formatEventName(options?.kpm_name),
          kpm_impact_name: options?.kpm_impact_name
        }
        gtag('event', eventName, eventParams);
      } else if (options?.path) {
        this.sendAnalyticsPageView(options.path)
      } else {
        let eventParams: EventParameters = {
          page_path: options?.path || '',
          justifi_platform: 'justifi-desktop',
          session_id: undefined,
          neb_name: this.formatEventName(options?.neb_name),
          kpi_name: this.formatEventName(options?.kpi_name),
          kpm_name: this.formatEventName(options?.kpm_name),
          kpm_impact_name: options?.kpm_impact_name
        }
        this.sendAnalyticsEvent(eventName, eventParams);
      }
    }
  }

  formatEventName(eventName: string): string {
    if (eventName) {
      //remove commas and replace spaces with underscores
      return eventName.replace(/,/g, '').replace(/\s+/g, '_').toLowerCase();
    } else {
      return undefined
    }

  }

}

export class AnalyticsHttpError extends Error { }

export interface AnalyticsPayload {
  client_id: string,
  user_id?: string,
  non_personalized_ads: boolean,
  events: Array<{ name: string, params: object }>
}

export interface GAEvent {
  name: AnalyticsEventString,
  params: EventParameters
}

export interface EventParameters {
  page_path?: string,
  justifi_platform?: JustifiPlatformString,
  session_id: string,
  engagement_time_msec?: string,
  kpi_name?: string,
  kpm_name?: string,
  neb_name?: string,
  kpm_impact_name?: string
}

export type AnalyticsEventString = 'page_view' | 'justifi_app_open' | 'add_kpi' | 'add_neb' | 'add_kpm' | 'add_assessment' | 'add_contact' | 'add_energy_equipment' | 'add_process_equipment' | 'add_energy_opportunity' | 'add_on_site_visit' | 'add_report' | 'add_company' | 'add_facility' | 'add_kpm_impact';
export type JustifiPlatformString = 'justifi-desktop' | 'justifi-web';
