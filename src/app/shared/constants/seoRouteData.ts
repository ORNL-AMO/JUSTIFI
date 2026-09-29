export type SeoRobotsPolicy = 'index,follow' | 'noindex,nofollow';

export interface SeoRouteData {
  title: string;
  description: string;
  robots: SeoRobotsPolicy;
  canonicalPath?: string;
}

export const DEFAULT_SEO_ROUTE_DATA: SeoRouteData = {
  title: 'JUSTIFI | Multiple Benefits Energy Assessment Tool',
  description: 'JUSTIFI helps industrial practitioners identify, estimate, and report Multiple Benefits from ' +
    'manufacturing energy efficiency opportunities.',
  robots: 'index,follow',
  canonicalPath: '/'
};

export const NEBS_DATABASE_SEO_ROUTE_DATA: SeoRouteData = {
  title: 'Multiple Benefits Database | JUSTIFI',
  description: 'Explore JUSTIFI Multiple Benefits, Key Performance Indicators, and Key Performance Metrics used in ' +
    'manufacturing energy assessments.',
  robots: 'index,follow',
  canonicalPath: '/nebs-database'
};

export const ABOUT_SEO_ROUTE_DATA: SeoRouteData = {
  title: 'About JUSTIFI',
  description: 'Learn about JUSTIFI, an ORNL and National Laboratory of the Rockies tool for Multiple Benefits from ' +
    'manufacturing energy efficiency opportunities.',
  robots: 'index,follow',
  canonicalPath: '/about'
};

export const FEEDBACK_SEO_ROUTE_DATA: SeoRouteData = {
  title: 'JUSTIFI Feedback And Support',
  description: 'Contact the JUSTIFI team for feedback, bug reporting, and technical support.',
  robots: 'index,follow',
  canonicalPath: '/feedback'
};

export const ACKNOWLEDGMENTS_SEO_ROUTE_DATA: SeoRouteData = {
  title: 'JUSTIFI Acknowledgments',
  description: 'Review the contributors, sponsors, advisory board, and student contributors who supported JUSTIFI ' +
    'development.',
  robots: 'index,follow',
  canonicalPath: '/acknowledgments'
};

export const NO_INDEX_SEO_ROUTE_DATA: SeoRouteData = {
  title: 'JUSTIFI',
  description: 'JUSTIFI application workflow page.',
  robots: 'noindex,nofollow',
  canonicalPath: undefined
};

export const PAGE_NOT_FOUND_SEO_ROUTE_DATA: SeoRouteData = {
  ...NO_INDEX_SEO_ROUTE_DATA,
  title: 'Page Not Found | JUSTIFI',
  description: 'The requested JUSTIFI page could not be found.'
};
