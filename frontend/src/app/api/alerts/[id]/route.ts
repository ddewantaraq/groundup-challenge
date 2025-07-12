import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const apiHost = process.env.API_HOST;
  const apiKey = process.env.API_KEY;
  if (!apiHost || !apiKey) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }
  const url = `${apiHost}/alerts/${encodeURIComponent(id)}`;
  try {
    const res = await fetch(url, {
      headers: { 'x-api-key': apiKey },
      cache: 'no-store',
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch alert' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const apiHost = process.env.API_HOST;
  const apiKey = process.env.API_KEY;
  if (!apiHost || !apiKey) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }
  const url = `${apiHost}/alerts/${encodeURIComponent(id)}`;
  const body = await req.json();
  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 