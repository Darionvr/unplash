'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/css/collectionsPage.module.css'
import AddCollectionDialog from './addCollection';

type Collection = {
    _id: string;
    name: string;
    thumbnail: string;
    total: number;
};

export default function CollectionClient({ collections }: { collections: Collection[] }) {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <main className={styles.main}>

            <ul>
                {collections.map((col) => (
                    <li key={col._id}>
                        <Link href={`/collections/${col.name}`}>
                            <img src={col.thumbnail} alt={`Preview de ${col.name}`} />

                        </Link>
                        <h3>{col.name}</h3>
                        <h4>{col?.total} {col?.total === 1 ? 'Photo' : 'Photos' }</h4>


                    </li>
                ))}
                <li>
                    <button onClick={() => setIsVisible(true)}>
                        <img src="/resources/Plus.svg" alt="Add collection" />
                        <p>Add new collection</p>
                    </button>
                </li>
            </ul>





            {isVisible && (
                <AddCollectionDialog isVisible={isVisible} setIsVisible={setIsVisible} />
            )}
        </main>
    );
}
