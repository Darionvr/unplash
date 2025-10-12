import React from 'react'
import { UnsplashPhoto } from '@/lib/definitions'
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/app/css/gallery.module.css'

type GalleryProps = {
  images: UnsplashPhoto[];
};

const Gallery = ({images} : GalleryProps) => {
  return (
     <ul className={styles.gallery} >
          {images.map((img) => (
            <li key={img.id}>  <Link href={`/photo/${img.id}`}>
              <Image src={img.urls.small}
                alt={img.alt_description || 'Unsplash image'}
                height={img.height}
              width={img.width}/>
            </Link>
            </li>
          ))}
        </ul>
  )
}

export default Gallery