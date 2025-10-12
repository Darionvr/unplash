'use client'
import styles from "./page.module.css";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Search from "./ui/search";
import { UnsplashPhoto } from "@/lib/definitions";
import Gallery from "./ui/gallery";

export default function Home() {

  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [images, setImages] = useState<UnsplashPhoto[]>([]);
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) {
        setImages([]);
        return;
      }

      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();
      setImages(data.results);
    };
    fetchImages();
  }, [query]);

  useEffect(() => {
      setIsVisible(images.length > 0)
  }, [images])

  return (
    <main className={styles.main} data-visible={isVisible ? 'true' : 'false'}>
      <div className={styles.gradient} />
      <Search placeholder="Enter your keywords" isVisible={isVisible} setIsVisible={setIsVisible} />
      {isVisible && <Gallery images={images}/>}
    </main>
  );
}
