import { NextResponse } from 'next/server';
import { HealthResponse } from '@/app/types';

export async function GET() {
  const response: HealthResponse = {
    status: 'ok',
    version: '0.1.0', // You can update this or fetch from package.json
  };

  return NextResponse.json(response);
}
