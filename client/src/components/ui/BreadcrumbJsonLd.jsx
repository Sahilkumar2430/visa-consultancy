import { Helmet } from 'react-helmet-async';

export default function BreadcrumbJsonLd({ items = [] }) {
  if (!items.length) return null;

  const base = typeof window !== 'undefined' ? window.location.origin : '';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: base,
      },
      ...items.map((it, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: it.label,
        item: base + (it.path || ''),
      })),
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}