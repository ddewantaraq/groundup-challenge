import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const apiHost = process.env.API_HOST;
  const apiKey = process.env.API_KEY;
  if (!apiHost || !apiKey) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  // Forward query params from the request
  const url = `${apiHost}/machines?page=1&pageSize=10`;

  const res = await fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch machines' }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json(data);
} 