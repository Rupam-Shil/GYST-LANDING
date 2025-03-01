import { NextRequest, NextResponse } from 'next/server';
import { generateCommitSuggestions } from '@/app/utils/anthropic';
import { CommitRequest, SuggestionsResponse } from '@/app/types';

export async function POST(request: NextRequest) {
  try {
    const body: CommitRequest = await request.json();
    const count = body.count || 3;
    
    const suggestions = await generateCommitSuggestions(body, count);
    
    const response: SuggestionsResponse = { suggestions };
    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating commit suggestions:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
