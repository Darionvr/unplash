import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: Promise<{ imageId: string }> }) {
  const { imageId } = await context.params;

  const client = await connectToDatabase();
  const db = client.db('unsplash');

  // ✅ usar el ID como string, no como ObjectId
  const collections = await db.collection('collections')
    .find({ images: { $nin: [imageId] } }) // asumiendo que guardas los IDs como string
    .toArray();

  const formatted = collections.map((col) => ({
    _id: col._id.toString(),
    name: col.name,
  }));

  return NextResponse.json(formatted);
}
