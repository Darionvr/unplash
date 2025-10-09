'use client'
import React, { useEffect, useState, use } from 'react'
import AddToCollectionsDialog from '@/app/ui/addToCollections';
import { UnsplashPhoto } from '@/lib/definitions';
import Image from 'next/image';
import styles from '@/app/css/photoPage.module.css'
import { CollectionsType } from '@/lib/definitions';
import Link from 'next/link';

const PhotoPage = ({ params }: { params: Promise<{ id: string }> }) => {

    const [isVisible, setIsVisible] = useState(false);
    const [collections, setCollections] = useState<CollectionsType[]>([])
    const [photo, setPhoto] = useState<UnsplashPhoto | null>(null)
    const { id } = use(params);

    const rawDate: string = photo?.updated_at ?? '';
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(rawDate));

    const imageData = photo
        ? {
            id: photo.id,
            url: photo.urls.regular,
            alt: photo.alt_description || '',

        }
        : null;

    useEffect(() => {
        if (!id) return;
        const fetchPhoto = async () => {
            const res = await fetch(`/api/photo/${id}`);
            if (!res.ok) {
                console.error('Error al obtener la foto:', res.status);
                return;
            }
            const data = await res.json();
            setPhoto(data);
        };
        fetchPhoto();
    }, [id]);

    console.log(photo)
    useEffect(() => {
        const fetchCollections = async () => {
            const res = await fetch(`/api/get-collections/${id}`);
            const data = await res.json();
            setCollections(data);
        };

        if (photo) fetchCollections();
    }, [photo, isVisible]);

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
                <div className={styles.actions}>
                    <button onClick={() => setIsVisible(true)}> <img src="/resources/Plus.svg" alt="Plus Icon" />Add to collection</button>
                    <button><img src="/resources/down arrow.svg" alt="Download icon" />Download </button>
                </div>
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
            {isVisible && imageData && <AddToCollectionsDialog isVisible={isVisible} setIsVisible={setIsVisible} imageData={imageData} />}
        </main>
    )
}

export default PhotoPage