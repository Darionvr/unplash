import CollectionClient from '@/app/ui/collectionClient';
import { Suspense } from 'react';
import styles from '@/app/css/collectionsPage.module.css'

export default async function CollectionsPage() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/collections`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        console.error('Error al obtener colecciones:', res.status);
        return [];
    }

    const collections = await res.json();

    return (
        <>
            <header className={styles.header}>
                <h1 className={styles.gradient}>Collections</h1>
                <h2>
                    Explore the world through collections of beautiful photos free to use under the{' '}

                    <a href="https://unsplash.com/es/licencia" target="_blank" rel="noopener noreferrer">
                        Ir a Unsplash
                    </a>
                </h2>
            </header>
            <Suspense fallback={<p>Cargando colecciones...</p>}>
                <CollectionClient collections={collections} />;
            </Suspense>
        </>
    )
}
