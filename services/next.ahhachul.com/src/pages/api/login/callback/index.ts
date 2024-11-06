import { NextRequest, NextResponse } from 'next/server';
import { apiClient } from '../../utils/apiClient';
import { getDomainName } from '@/src/utils/appEnv';

async function requestSignIn({
  providerType,
  providerCode,
}: {
  providerType: string | null;
  providerCode: string | null;
}) {
  try {
    const res = await apiClient.post(`/auth/login`, {
      providerType,
      providerCode,
    });

    return res.data;
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const providerType = searchParams.get('type');
  const providerCode = searchParams.get('code');
  const returnTo = searchParams.get('returnTo') || '';

  try {
    const res = await requestSignIn({
      providerType,
      providerCode,
    });
    console.log({ res });

    return NextResponse.redirect(`${getDomainName()}/${returnTo}`);
  } catch (error) {
    console.error('Error during sign in:', error);
    return NextResponse.redirect(`${getDomainName()}/signin?error=true`);
  }
}
