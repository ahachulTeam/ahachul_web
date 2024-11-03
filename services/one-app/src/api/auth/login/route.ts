import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parseBody } from '../../util/parseBody';
import { ProviderType } from '../../../constants';

const loginSchema = z.object({
  providerType: z.nativeEnum(ProviderType),
  providerCode: z.string(),
});

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Hello, world!' });
}
