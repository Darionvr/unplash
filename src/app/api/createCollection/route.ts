import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { name } = await req.json();

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ message: 'Nombre inválido' }, { status: 400 });
  }

  try {
    const client = await connectToDatabase();
    const db = client.db('unsplash');

    const existing = await db.collection('collections').findOne({ name });
    if (existing) {
      return NextResponse.json({ message: 'Ya existe una colección con ese nombre' }, { status: 409 });
    }

    const result = await db.collection('collections').insertOne({
      name,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Colección creada', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error al crear colección:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
