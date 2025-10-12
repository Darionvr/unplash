import React from 'react'
import style from '@/app/css/collectionDetail.module.css'
import Gallery from '@/app/ui/gallery';
import { getCollectionDetails } from '@/lib/data';


export default async function CollectionDetail({ params }: { params: Promise<{ slug: string }>}) {

  const {slug} = await params

 const { collection, photos } = await getCollectionDetails(slug);

  return (
    <main className={style.main}>
      <h1 className={style.gradient}>{collection.name}</h1>
      <p> {collection.total} {collection.total === 1 ? 'Photo' : 'Photos'}</p>

     {photos?.length> 0 && <Gallery images={photos} />}

    </main>
  )
}

