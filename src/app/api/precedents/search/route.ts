import { NextResponse } from 'next/server';
import { DejureAdapter } from '@/lib/precedents/dejureAdapter';

export async function POST(request: Request) {
  try {
    const { query, filters } = await request.json();
    const adapter = new DejureAdapter();
    const results = await adapter.searchPrecedents(query, filters);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      { error: 'Arama sırasında hata oluştu' },
      { status: 500 }
    );
  }
}
