import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const res = await fetch(`https://api.unsplash.com/photos/${params.id}`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      'Accept-Version': 'v1',
    },
  });

  if (!res.ok) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const photo = await res.json();
  return NextResponse.json(photo);
}
