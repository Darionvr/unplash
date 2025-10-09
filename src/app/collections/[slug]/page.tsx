'use client'
import React, { useEffect, useState, use } from 'react'
import { Photo, Collection } from '@/lib/definitions';
import Link from 'next/link';
import style from '@/app/css/collectionDetail.module.css'



export default function CollectionDetail({ params }: { params: Promise<{ slug: string }> }) {

  const [photos, setPhotos] = useState<Photo[]>([])
  const [collection, setCollection] = useState<Collection | null>(null)
  console.log(photos)

  const { slug } = use(params);

  useEffect(() => {
    const fetchCollectionDetails = async () => {
      const res = await fetch(`/api/collection-details/${slug}`);
      if (!res.ok) {
        console.error('Error al obtener la colección:', res.status);
        return;
      }

      const data = await res.json();
      setCollection(data.collection);
      setPhotos(data.photos);
    };

    fetchCollectionDetails();
  }, [slug]);



  return (
    <main className={style.main}>
      <h1 className={style.gradient}>{collection?.name}</h1>
      <p> xx Photos</p>
      <ul className={photos.length < 4 ? style.flexGallery : style.columnGallery}>
        {photos.map((photo) => (
          <li key={photo.id} >
            <Link href={`/photo/${photo.id}`}>
              <img src={photo.url} alt={photo.alt} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

