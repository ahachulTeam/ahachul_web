import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from '@/app/api/util/parseBody';
import { z } from 'zod';
import { requestOAuth, ProviderType } from './requestOAuth';
import { APIResponseCode } from '@/app/api/contant';

export async function POST(req: NextRequest) {
  const { providerType } = await parseBody(
    req,
    z.object({
      providerType: z.nativeEnum(ProviderType),
    }),
  );

  const res = await requestOAuth(providerType);

  const response = NextResponse.json(res);

  if (res.code === APIResponseCode.SUCCESS && res.result) {
    const { redirectUrl } = res.result;

    return NextResponse.redirect(redirectUrl);
  }

  return response;
}
