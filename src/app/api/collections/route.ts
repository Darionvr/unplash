import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  const client = await connectToDatabase();
  const db = client.db('unsplash');

  const rawCollections = await db.collection('collections')
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  const collections = rawCollections.map((col) => ({
    _id: col._id.toString(),
    name: col.name,
    thumbnail: col.images?.[0]?.url || null,
    total: col.images?.length || 0,
  }));

  return NextResponse.json(collections);
}
