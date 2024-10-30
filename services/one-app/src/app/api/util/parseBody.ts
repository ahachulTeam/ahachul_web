import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest } from 'next/server';
import { ZodType } from 'zod';

export async function parseBody<T>(
  req: NextRequest,
  zod: ZodType<T>,
): Promise<T> {
  try {
    const body = await req.json();
    return zod.parse(body);
  } catch (e) {
    console.error(e);
    throw new ApiError(400, 'payload validation failed');
  }
}
