import type { Metadata } from 'next';

import { createPageMetadata } from '@ahhachul/seo';

import { SITE_URL, withBrandTitle } from '@/constant';
import { getLocaleMessages } from '@/i18n';
import { getServerLocale } from '@/i18n/server';
import { getLocalizedMetadataOptions } from '@/seo/metadata';

import ProfileOverview from './_components/ProfileOverview';

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const locale = await getServerLocale();
  const messages = getLocaleMessages(locale);
  const title = messages.seo.userProfile.title.replace('{username}', username);
  const description = messages.seo.userProfile.description.replace('{username}', username);

  return createPageMetadata({
    title: withBrandTitle(title),
    description,
    siteUrl: SITE_URL,
    noIndex: true,
    ...getLocalizedMetadataOptions(`/user/${encodeURIComponent(username)}`, locale),
  }) as Metadata;
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;

  return (
    <main className="min-h-screen bg-gray-10">
      <ProfileOverview username={username} />
    </main>
  );
}
