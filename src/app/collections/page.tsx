import CollectionClient from '@/app/ui/collectionClient';
import { Suspense } from 'react';
import styles from '@/app/css/collectionsPage.module.css'
import { getCollections } from '@/lib/data';

export default async function CollectionsPage() {

    const collections  =  await getCollections()

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.gradient}>Collections</h1>
                <h2>
                    Explore the world through collections of beautiful photos free to use under the
                    <a href="https://unsplash.com/es/licencia" target="_blank" rel="noopener noreferrer">
                     Unsplash Licence
                    </a>
                </h2>
            </header>
            <Suspense fallback={<p>Cargando colecciones...</p>}>
                <CollectionClient collections={collections} />;
            </Suspense>
        </>
    )
}
