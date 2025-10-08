import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: Promise<{ imageId: string }> }) {

  const { imageId } = await context.params;

  if (!imageId) {
    return NextResponse.json({ message: 'Faltan datos' }, { status: 400 });
  }

  const client = await connectToDatabase();
  const db = client.db('unsplash');

  const collections = await db.collection('collections')
    .find({ images: { $elemMatch: { id: imageId } } }) // ✅ si guardas como string
    .toArray();

  const formatted = collections.map((col) => ({
    _id: col._id.toString(),
    name: col.name,
    thumbnail: col.images?.[0]?.url || null,
    total: col.images?.length || 0,
  }));

  return NextResponse.json(formatted);

}