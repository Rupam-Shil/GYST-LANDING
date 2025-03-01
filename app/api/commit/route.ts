import { NextRequest, NextResponse } from 'next/server';
import { generateCommitMessage } from '@/app/utils/anthropic';
import { CommitRequest, CommitResponse } from '@/app/types';

export async function POST(request: NextRequest) {
  try {
    const body: CommitRequest = await request.json();
    
    const message = await generateCommitMessage(body);
    
    const response: CommitResponse = { message };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating commit message:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
