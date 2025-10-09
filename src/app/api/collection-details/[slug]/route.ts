import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { Photo } from '@/lib/definitions';

//Ruta para ver el contenido de la colección en collection/[slug]

export async function GET(req: Request, context: { params: Promise<{ slug: string }> }) {

    const { slug } = await context.params;

    const client = await connectToDatabase();
    const db = client.db('unsplash');

    const collection = await db.collection('collections').findOne({ name: slug });

    if (!collection) {
        return NextResponse.json({ error: 'Colección no encontrada' }, { status: 404 });
    }

    const formatted = (collection.images || []).map((img: Photo) => ({
        id: img.id,
        url: img.url,
        alt: img.alt || '',
        createdAt: img.createdAt || null
        
      
    }));

    return NextResponse.json({
        collection: {
            _id: collection._id.toString(),
            name: collection.name,
             total: collection.images?.length || 0,
        },
        photos: formatted,
    });
}
