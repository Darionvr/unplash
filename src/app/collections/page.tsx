import { connectToDatabase } from '@/lib/mongodb';
import CollectionClient from '@/app/ui/collectionClient';
import Link from 'next/link';
import { Suspense } from 'react';


export default async function CollectionsPage() {

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
        total: col.total
    }));

    console.log(collections)
    return (
        <>
            <header>
                <h1>Collections</h1>
                <p>
                    Explore the world through collections of beautiful photos free to use under the{' '}
                    <Link href="#">Unsplash Licence</Link>
                </p>
            </header>
            <Suspense fallback={<p>Cargando colecciones...</p>}>
                <CollectionClient collections={collections} />;
            </Suspense>
        </>
    )
}
