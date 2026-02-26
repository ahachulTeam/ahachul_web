import { redirect } from 'next/navigation';

import { localizePathname } from '@/i18n';
import { getServerLocale } from '@/i18n/server';

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function pickFirst(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }
  return value ?? '';
}

export default async function ProofDetailLegacyPage({ searchParams }: Props) {
  const locale = await getServerLocale();
  const params = await searchParams;
  const proofId = pickFirst(params.proofId);

  if (/^\d+$/.test(proofId)) {
    redirect(localizePathname(`/proofs/${proofId}`, locale));
  }

  redirect(localizePathname('/me', locale));
}
