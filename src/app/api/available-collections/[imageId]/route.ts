import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: Promise<{ imageId: string }> }) {
  const { imageId } = await context.params;

  const client = await connectToDatabase();
  const db = client.db('unsplash');

  const collections = await db.collection('collections')
    .find({ images: { $nin: [imageId] } }) 
    .toArray();

  const formatted = collections.map((col) => ({
    _id: col._id.toString(),
    name: col.name,
     thumbnail: col.images?.[0]?.url || null,
  }));

  return NextResponse.json(formatted);
}
