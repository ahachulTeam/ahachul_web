import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

import LostFoundPostEditor from '../_components/LostFoundPostEditor';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);

  return createPageMetadata({
    title: withBrandTitle(messages.seo.lostFoundNew.title),
    description: messages.seo.lostFoundNew.description,
    siteUrl: SITE_URL,
    noIndex: true,
    ...getLocalizedMetadataOptions('/lost-found/new', locale),
  }) as Metadata;
}

export default function NewLostFoundPage() {
  return <LostFoundPostEditor mode="create" />;
}
