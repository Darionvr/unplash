'use client'

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/css/collections.module.css';
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
        <main>

            <button onClick={() => setIsVisible(true)}>
                <img src="/resources/Plus.svg" alt="Add collection" />
                <p>Add New Collection</p>
            </button>

            <ul>
                {collections.map((col) => (
                    <li key={col._id}>
                        <Link href={`/collections/${col.name} `}>
                            <h2>{col.name}</h2>
                            {col.thumbnail ? (
                                <img src={col.thumbnail} alt={`Preview de ${col.name}`} />
                            ) : (
                                <div >Sin imagen</div>
                            )}
                        </Link>
                        <p>{col.total}</p>
                       

                    </li>
                ))}
            </ul>

            {isVisible && (
                <AddCollectionDialog isVisible={isVisible} setIsVisible={setIsVisible} />
            )}
        </main>
    );
}
