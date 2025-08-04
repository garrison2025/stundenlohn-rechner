// Dateipfad: app/sitemap.ts

import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Hauptseite (wichtigste Seite)
    {
      url: 'https://stundenlohnrechner.pro',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Statische Informationsseiten
    {
      url: 'https://stundenlohnrechner.pro/ueber-uns',
      lastModified: '2024-01-01', // Datum kann fix sein, da sich die Seite selten ändert
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://stundenlohnrechner.pro/kontakt',
      lastModified: '2024-01-01',
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    // Rechtliche Seiten (weniger wichtig für SEO-Ranking)
    {
      url: 'https://stundenlohnrechner.pro/datenschutz',
      lastModified: '2024-01-01',
      changeFrequency: 'yearly',
      priority: 0.1,
    },
    {
      url: 'https://stundenlohnrechner.pro/nutzungsbedingungen',
      lastModified: '2024-01-01',
      changeFrequency: 'yearly',
      priority: 0.1,
    },
  ];
}
