import HomeViteParity from '@/app/_components/HomeViteParity';
import { getServerLocale } from '@/i18n/server';

export default async function Home() {
  const locale = await getServerLocale();
  return <HomeViteParity locale={locale} />;
}
