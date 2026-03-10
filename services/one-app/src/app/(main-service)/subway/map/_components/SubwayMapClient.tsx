'use client';

import { useEffect, useState } from 'react';

import { SeoulMetroMapViewer } from '@ahhachul/ui';

import { type SupportedLocale } from '@/i18n';

import type { SubwayLineCatalogLine } from '../_lib/getSubwayLineCatalogServer';

export default function SubwayMapClient({
  locale,
  subwayLines,
}: {
  locale: SupportedLocale;
  subwayLines: SubwayLineCatalogLine[];
}) {
  const [debugHotspots, setDebugHotspots] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    setDebugHotspots(new URLSearchParams(window.location.search).get('debug') === '1');
  }, []);

  return (
    <div className="min-h-[100dvh] bg-white">
      <SeoulMetroMapViewer
        subwayLines={subwayLines}
        initialLocale={locale === 'en' ? 'en' : 'ko'}
        debugHotspots={debugHotspots}
        mapTitle="서울 지하철 노선도"
      />
    </div>
  );
}
