import { NextRequest, NextResponse } from 'next/server';
import { suggestCommand } from '@/app/utils/anthropic';
import { CommandRequest, CommandResponse } from '@/app/types';

export async function POST(request: NextRequest) {
  try {
    const body: CommandRequest = await request.json();
    
    const suggestion = await suggestCommand(body);
    
    const response: CommandResponse = { suggestion };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error suggesting command:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
