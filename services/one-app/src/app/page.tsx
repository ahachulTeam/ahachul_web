import HomeRenewal from '@/app/_components/HomeRenewal';
import { getServerLocale } from '@/i18n/server';

export default async function Home() {
  const locale = await getServerLocale();
  return <HomeRenewal locale={locale} />;
}
