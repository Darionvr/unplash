import React from 'react'
import Image from 'next/image';
import styles from '@/app/css/photoPage.module.css'
import Link from 'next/link';
import AddToCollectionsClient from '@/app/ui/addtoCollectionClient';
import { UnsplashPhoto, CollectionsType, Photo } from '@/lib/definitions';
import { getPhotoById, getCollectionsForPhoto } from '@/lib/data';

export default async function PhotoPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params;

    const photo: UnsplashPhoto = await getPhotoById(id);
    const collections: CollectionsType[] = await getCollectionsForPhoto(id);

    const formattedDate =
        photo?.created_at && !isNaN(new Date(photo.created_at).getTime())
            ? new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }).format(new Date(photo.created_at))
            : 'Fecha no disponible';

    const imageData: Photo = {
        id: photo.id,
        url: photo.urls.regular,
        alt: photo.alt_description || '',
        createdAt: photo.created_at
    };


    return (
        <main className={styles.main}>
            <section className={styles.photoContainer}>
                {photo && (
                    <Image
                        width={photo.width}
                        height={photo.height}
                        src={photo.urls.regular}
                        alt={photo.alt_description}
                        className={styles.photo} />
                )}
            </section>
            <section >
                <div className={styles.userInfo}>
                    <img src={photo?.user.profile_image.small} alt="user's profile image" />
                    <p> {photo?.user.name}</p>
                </div>
                <p className={styles.date}> Publised on {formattedDate}</p>
                <AddToCollectionsClient imageData={imageData} />
                <p className={styles.title}> Collections</p>

                {collections.length > 0 ? (
                    <ul className={styles.collections}>
                        {collections.map((col) => (
                            <li key={col._id}>
                                <Link href={`/collections/${col.name}`}>
                                    <img src={col.thumbnail} alt="collection thumbnail" />
                                    <div>
                                        <p>{col.name}</p>
                                        <p className={styles.total}>{col.total} Photos</p>
                                    </div>
                                    <div className={styles.remove}>
                                        <img src="/resources/Remove.svg" alt="remove icon" />
                                        <p>remove</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>You haven’t added this photo to a collection yet</p>
                )}
            </section>
        </main>
    )
}