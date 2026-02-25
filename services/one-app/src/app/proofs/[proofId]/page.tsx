import { getServerLocale } from '@/i18n/server';

import ProofDetailClient from './_components/ProofDetailClient';

type DelayProofDetailPageProps = {
  params: Promise<{
    proofId: string;
  }>;
};

export default async function DelayProofDetailPage({ params }: DelayProofDetailPageProps) {
  const locale = await getServerLocale();
  const { proofId } = await params;

  return <ProofDetailClient locale={locale} proofId={proofId} />;
}
