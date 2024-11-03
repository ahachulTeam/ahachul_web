import { ApiError } from 'next/dist/server/api-utils';
import { NextRequest } from 'next/server';
import { ZodType } from 'zod';

export async function parseBody<T>(
  request: NextRequest,
  schema: ZodType<T>,
): Promise<T> {
  try {
    const requestBody = await request.json();
    return schema.parse(requestBody);
  } catch (error) {
    console.error(error);
    throw new ApiError(400, 'payload validation failed');
  }
}
