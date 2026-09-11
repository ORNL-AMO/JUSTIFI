import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot } from '@angular/router';
import { DEFAULT_SEO_ROUTE_DATA, SeoRouteData } from '../constants/seoRouteData';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly siteUrl: string = 'https://justifi.ornl.gov';

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) { }

  updateSeoTags(routeSnapshot: ActivatedRouteSnapshot) {
    const seoRouteData: SeoRouteData = this.getSeoRouteData(routeSnapshot);
    const canonicalUrl: string | undefined = this.getCanonicalUrl(seoRouteData.canonicalPath);

    this.titleService.setTitle(seoRouteData.title);
    this.metaService.updateTag({ name: 'description', content: seoRouteData.description });
    this.metaService.updateTag({ name: 'robots', content: seoRouteData.robots });
    this.metaService.updateTag({ property: 'og:title', content: seoRouteData.title }, "property='og:title'");
    this.metaService.updateTag(
      { property: 'og:description', content: seoRouteData.description },
      "property='og:description'"
    );
    this.metaService.updateTag({ property: 'og:type', content: 'website' }, "property='og:type'");

    if (canonicalUrl) {
      this.setCanonicalUrl(canonicalUrl);
      this.metaService.updateTag({ property: 'og:url', content: canonicalUrl }, "property='og:url'");
    } else {
      this.removeCanonicalUrl();
      this.metaService.removeTag("property='og:url'");
    }
  }

  private getSeoRouteData(routeSnapshot: ActivatedRouteSnapshot): SeoRouteData {
    let seoRouteData: SeoRouteData = { ...DEFAULT_SEO_ROUTE_DATA };
    let currentSnapshot: ActivatedRouteSnapshot | null = routeSnapshot;

    while (currentSnapshot) {
      const routeSeoData: Partial<SeoRouteData> | undefined = currentSnapshot.data?.['seo'];
      if (routeSeoData) {
        seoRouteData = {
          ...seoRouteData,
          ...routeSeoData
        };
      }
      currentSnapshot = currentSnapshot.firstChild;
    }

    return seoRouteData;
  }

  private getCanonicalUrl(canonicalPath: string | undefined): string | undefined {
    if (!canonicalPath) {
      return undefined;
    }

    return `${this.siteUrl}${canonicalPath}`;
  }

  private setCanonicalUrl(canonicalUrl: string) {
    let canonicalLink: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute('href', canonicalUrl);
  }

  private removeCanonicalUrl() {
    const canonicalLink: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    canonicalLink?.remove();
  }
}
