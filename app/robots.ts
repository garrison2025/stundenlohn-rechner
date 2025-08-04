// Dateipfad: app/robots.ts

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        // Erlaubt das Crawlen der gesamten Seite, da alle Inhalte öffentlich sind.
        allow: '/',
      },
    ],
    // Der absolute Pfad zu Ihrer Sitemap.
    sitemap: 'https://stundenlohnrechner.pro/sitemap.xml',
  };
}
