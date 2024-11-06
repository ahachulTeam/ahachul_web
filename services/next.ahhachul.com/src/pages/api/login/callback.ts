import type { NextApiRequest, NextApiResponse } from 'next';
import { apiClient } from '../utils/apiClient';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { type: providerType, code: providerCode, returnTo = '' } = req.query;

  try {
    const response = await requestSignIn({
      providerType: providerType as string | null,
      providerCode: providerCode as string | null,
    });
    console.log({ response });

    res.redirect(`${getDomainName()}/${returnTo}`);
  } catch (error) {
    console.error('Error during sign in:', error);
    res.redirect(`${getDomainName()}/signin?error=true`);
  }
}
