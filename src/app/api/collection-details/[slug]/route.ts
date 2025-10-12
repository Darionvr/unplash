import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { UnsplashPhoto } from '@/lib/definitions';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {

    const { slug } = await context.params;

    const client = await connectToDatabase();
    const db = client.db('unsplash');

    const collection = await db.collection('collections').findOne({ name: slug });

    if (!collection) {
        return NextResponse.json({ error: 'Colección no encontrada' }, { status: 404 });
    }


const ids: string[] = (collection.images || []).map((img: { id: string }) => img.id);



    const photos = await Promise.all(
        ids.map(async (id) => {
            const res = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${UNSPLASH_ACCESS_KEY}`);
            if (!res.ok) return null;
            const data: UnsplashPhoto = await res.json();
            return {
                id: data.id,
                urls: data.urls,
                alt: data.alt_description || '',
                createdAt: data.created_at || null,
                height: data.height,
                width: data.width,
            };
        })
    );

    const validPhotos = photos.filter((p): p is NonNullable<typeof p> => p !== null);

    return NextResponse.json({
        collection: {
            _id: collection._id.toString(),
            name: collection.name,
            total: collection.images?.length || 0,
        },
        photos: validPhotos,
    });
}
