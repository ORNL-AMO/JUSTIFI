import { TestBed } from '@angular/core/testing';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot } from '@angular/router';
import { NO_INDEX_SEO_ROUTE_DATA } from '../constants/seoRouteData';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  let service: SeoService;
  let metaService: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    metaService = TestBed.inject(Meta);
  });

  afterEach(() => {
    document.querySelector('link[rel="canonical"]')?.remove();
    metaService.removeTag("name='description'");
    metaService.removeTag("name='robots'");
    metaService.removeTag("property='og:title'");
    metaService.removeTag("property='og:description'");
    metaService.removeTag("property='og:type'");
    metaService.removeTag("property='og:url'");
  });

  it('should set indexable metadata for a public route', () => {
    service.updateSeoTags(createRouteSnapshot({
      seo: {
        title: 'Multiple Benefits Database | JUSTIFI',
        description: 'Explore JUSTIFI Multiple Benefits, KPIs, and KPMs.',
        robots: 'index,follow',
        canonicalPath: '/nebs-database'
      }
    }));

    const canonicalLink: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');

    expect(document.title).toBe('Multiple Benefits Database | JUSTIFI');
    expect(metaService.getTag("name='description'")?.content)
      .toBe('Explore JUSTIFI Multiple Benefits, KPIs, and KPMs.');
    expect(metaService.getTag("name='robots'")?.content).toBe('index,follow');
    expect(canonicalLink?.href).toBe('https://justifi.ornl.gov/nebs-database');
    expect(metaService.getTag("property='og:url'")?.content).toBe('https://justifi.ornl.gov/nebs-database');
  });

  it('should remove canonical metadata from noindex routes', () => {
    service.updateSeoTags(createRouteSnapshot({
      seo: {
        title: 'About JUSTIFI',
        description: 'Learn about JUSTIFI.',
        robots: 'index,follow',
        canonicalPath: '/about'
      }
    }));

    service.updateSeoTags(createRouteSnapshot({
      seo: NO_INDEX_SEO_ROUTE_DATA
    }));

    expect(metaService.getTag("name='robots'")?.content).toBe('noindex,nofollow');
    expect(document.querySelector('link[rel="canonical"]')).toBeNull();
    expect(metaService.getTag("property='og:url'")).toBeNull();
  });

  it('should inherit noindex metadata from parent workflow routes', () => {
    service.updateSeoTags(createRouteSnapshot(
      { seo: NO_INDEX_SEO_ROUTE_DATA },
      createRouteSnapshot({})
    ));

    expect(metaService.getTag("name='robots'")?.content).toBe('noindex,nofollow');
    expect(document.title).toBe('JUSTIFI');
  });
});

function createRouteSnapshot(data: object, firstChild: ActivatedRouteSnapshot | null = null): ActivatedRouteSnapshot {
  return {
    data,
    firstChild
  } as ActivatedRouteSnapshot;
}

