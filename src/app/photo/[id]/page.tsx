'use client'
import React, { useEffect, useState, use } from 'react'
import AddToCollectionsDialog from '@/app/ui/addToCollections';
import { UnsplashPhoto } from '@/lib/definitions';
import Image from 'next/image';
import styles from '@/app/css/photoPage.module.css'
import { CollectionsType, Photo } from '@/lib/definitions';
import Link from 'next/link';


const PhotoPage = ({ params }: { params: Promise<{ id: string }> }) => {


    const [isVisible, setIsVisible] = useState(false);
    const [collections, setCollections] = useState<CollectionsType[]>([])
    const [photo, setPhoto] = useState<UnsplashPhoto | null>(null)
    const { id } = use(params);

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
            <section>
                {photo && (
                    <Image
                        width={photo.width}
                        height={photo.height}
                        src={photo.urls.regular}
                        alt={photo.alt_description}
                        className={styles.photo} />
                )}
            </section>
            <section>
                <div>
                    <img src={photo?.user.profile_image.small} alt="user's profile image" />
                    <p> {photo?.user.name}</p>
                    <div>
                        <button onClick={() => setIsVisible(true)}>Add to collection</button>
                        <button>Download</button>
                    </div>
                </div>
                <ul>
                    <li> Collections</li>
                    {collections.map((col) => (
                        <li key={col._id}>
                            <Link href={`/collections/${col.name}`}>

                                {/*  <img src="" alt="" /> */}
                                <p>{col.name}</p>
                                <p>{col.total}</p>

                            </Link>


                        </li>
                    ))}
                </ul>

            </section>
            {isVisible && imageData && <AddToCollectionsDialog isVisible={isVisible} setIsVisible={setIsVisible} imageData={imageData} />}
        </main>
    )
}

export default PhotoPage