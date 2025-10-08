import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';
import { BSON } from 'mongodb';


export async function POST(req: Request) {
  const { image, collectionId } = await req.json();

  if (!image || !collectionId) {
    return NextResponse.json({ message: 'Faltan datos' }, { status: 400 });
  }
  const objectId = new BSON.ObjectId(collectionId);

  const client = await connectToDatabase();
  const db = client.db('unsplash');

  const result = await db.collection('collections').updateOne(
    { _id: objectId },
    { $addToSet: { images: image } } // evita duplicados
  );

  if (result.modifiedCount === 0) {
    return NextResponse.json({ message: 'La imagen ya estaba en la colección' }, { status: 200 });
  }

  return NextResponse.json({ message: 'Imagen agregada a la colección' }, { status: 201 });
}
