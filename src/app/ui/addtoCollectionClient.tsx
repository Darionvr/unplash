'use client';
import { useState } from 'react';
import AddToCollectionsDialog from '@/app/ui/addToCollections';
import styles from '@/app/css/photoPage.module.css';
import { Photo } from '@/lib/definitions';

export default function AddToCollectionsClient({ imageData }: { imageData: Photo }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <div className={styles.actions}>
        <button onClick={() => setIsVisible(true)}>
          <img src="/resources/Plus.svg" alt="Plus Icon" />
          Add to collection
        </button>
        <button>
          <img src="/resources/down arrow.svg" alt="Download icon" />
          Download
        </button>
      </div>
      {isVisible && <AddToCollectionsDialog isVisible={isVisible} setIsVisible={setIsVisible} imageData={imageData} />}
    </>
  );
}
