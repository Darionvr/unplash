import { connectToDatabase } from "./mongodb";
import { CollectionsType, UnsplashPhoto, Photo } from "./definitions";

export async function getCollections(): Promise<CollectionsType[]> {
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

    return collections;
}

export async function getCollectionDetails(slug: string): Promise<{ collection: CollectionsType; photos: UnsplashPhoto[] }> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/collection-details/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Error al obtener la colección: ${res.status}`);
  }

  const data = await res.json();
  return data;
}

export async function getPhotoById(id: string): Promise<UnsplashPhoto> {
  const res = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${process.env.UNSPLASH_ACCESS_KEY}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Error al obtener la foto: ${res.status}`);
  }

  const data: UnsplashPhoto = await res.json();
  return data;
}

export async function getCollectionsForPhoto(id: string): Promise<CollectionsType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-collections/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`Error al obtener las colecciones: ${res.status}`);
  }

  const data: CollectionsType[] = await res.json();
  return data;
}

