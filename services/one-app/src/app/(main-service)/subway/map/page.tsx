import { getServerLocale } from '@/i18n/server';

import SubwayMapClient from './_components/SubwayMapClient';
import { getSubwayLineCatalogServer } from './_lib/getSubwayLineCatalogServer';

export default async function SubwayMapPage() {
  const locale = await getServerLocale();
  const { subwayLines } = await getSubwayLineCatalogServer();

  return <SubwayMapClient locale={locale} subwayLines={subwayLines} />;
}
