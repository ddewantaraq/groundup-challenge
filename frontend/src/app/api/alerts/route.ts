import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const machineId = searchParams.get('machineId');
  if (!machineId) {
    return NextResponse.json({ error: 'Missing machineId' }, { status: 400 });
  }

  const apiHost = process.env.API_HOST;
  const apiKey = process.env.API_KEY;
  if (!apiHost || !apiKey) {
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }

  const url = `${apiHost}/alerts?page=1&pageSize=10&machineId=${encodeURIComponent(machineId)}`;
  try {
    const res = await fetch(url, {
      headers: { 'x-api-key': apiKey },
      cache: 'no-store',
    });
    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json(data?.alerts);
  } catch (err) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 