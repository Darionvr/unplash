
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q');

    if (!query) return NextResponse.json({ results: [] });

    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=8`, {
        headers: {
            'Authorization': `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            'Accept-Version': 'v1',
        } as HeadersInit,
    });


    const data = await res.json();
    return NextResponse.json(data);
}
