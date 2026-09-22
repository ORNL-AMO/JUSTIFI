# SEO And Google Search Console

JUSTIFI only exposes stable public application pages to search engines. Routes that depend on user-entered IndexedDB data, local IDs, reports, setup workflows, or portfolio records are marked `noindex,nofollow`.

## Indexable URLs

- `https://justifi.ornl.gov/`
- `https://justifi.ornl.gov/nebs-database`
- `https://justifi.ornl.gov/about`
- `https://justifi.ornl.gov/feedback`
- `https://justifi.ornl.gov/acknowledgments`

These URLs are listed in `src/sitemap.xml` and should match the canonical tags produced by the Angular SEO metadata service.

## Apache Hosting

The hosted web app uses clean Angular URLs. Apache must serve existing files normally and fall back to `index.html` for application routes so direct page loads and browser refreshes work.

Recommended Apache behavior:

```apache
<Directory "/var/www/html/justifi">
  Options -Indexes +FollowSymLinks
  AllowOverride None
  Require all granted

  RewriteEngine On

  RewriteCond %{REQUEST_FILENAME} -f [OR]
  RewriteCond %{REQUEST_FILENAME} -d
  RewriteRule ^ - [L]

  RewriteRule ^ index.html [L]
</Directory>
```

Ensure `mod_rewrite` is enabled before deploying clean URL routing.

## Search Console

JUSTIFI already loads Google Analytics from `src/index.html` with the `gtag.js` measurement ID `G-TLLVV7DWV0`. Prefer Search Console verification through the Google Analytics method when the verifier has access to that GA property.

If Google Analytics verification fails, add the exact Search Console verification file or meta tag provided by Google.

The production deployment serves `src/robots.txt`, which references the production sitemap. The develop deployment
replaces it with `src/robots.dev.txt` during the web release workflow so staging routes are not crawled or indexed.

After deployment, submit:

```text
https://justifi.ornl.gov/sitemap.xml
```

Use URL Inspection for:

```text
https://justifi.ornl.gov/
https://justifi.ornl.gov/about
https://justifi.ornl.gov/nebs-database
```

## Hosting Acceptance Checks

These URLs should return HTTP 200 and load the Angular app when opened directly:

- `https://justifi.ornl.gov/`
- `https://justifi.ornl.gov/about`
- `https://justifi.ornl.gov/nebs-database`
- `https://justifi.ornl.gov/feedback`
- `https://justifi.ornl.gov/acknowledgments`

These URLs should return static content, not the Angular app shell:

- `https://justifi.ornl.gov/sitemap.xml`
- `https://justifi.ornl.gov/robots.txt`
