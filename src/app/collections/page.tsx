import { connectToDatabase } from '@/lib/mongodb';
import CollectionClient from '@/app/ui/collectionClient';
import Link from 'next/link';
import { Suspense } from 'react';
import styles from '@/app/css/collectionsPage.module.css'

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
        total: col.images?.length || 0,
    }));

    console.log(collections)
    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.gradient}>Collections</h1>
                <h2>
                    Explore the world through collections of beautiful photos free to use under the{' '}
                    <Link href="https://unsplash.com/es/licencia">Unsplash Licence</Link>
                </h2>
            </header>
            <Suspense fallback={<p>Cargando colecciones...</p>}>
                <CollectionClient collections={collections} />;
            </Suspense>
        </>
    )
}
