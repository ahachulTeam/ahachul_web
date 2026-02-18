import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constants';
import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

import LostFoundPostEditor from '../../_components/LostFoundPostEditor';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const title = messages.seo.lostFoundEdit.title.replace('{id}', id);

  return createPageMetadata({
    title: withBrandTitle(title),
    description: messages.seo.lostFoundEdit.description,
    siteUrl: SITE_URL,
    noIndex: true,
    ...getLocalizedMetadataOptions(`/lost-found/${id}/edit`, locale),
  }) as Metadata;
}

export default async function LostFoundEditPage({ params }: Props) {
  const { id } = await params;
  const postId = Number(id);

  if (!Number.isFinite(postId) || postId <= 0) {
    notFound();
  }

  return <LostFoundPostEditor mode="edit" postId={postId} />;
}
