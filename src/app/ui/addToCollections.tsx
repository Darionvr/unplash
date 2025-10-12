'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { CollectionsType, Photo } from '@/lib/definitions';
import styles from '@/app/css/addToCollections.module.css'

interface DialogProps {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    imageData: Photo;
}

const AddToCollectionsDialog = ({ isVisible, setIsVisible, imageData }: DialogProps) => {

    const [collections, setCollections] = useState<CollectionsType[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [filterText, setFilterText] = useState('');

    const router = useRouter()
    const dialogRef = useRef<HTMLDialogElement>(null);

    const filteredCollections = collections.filter((col) =>
        col.name.toLowerCase().includes(filterText.toLowerCase())
    );


    useEffect(() => {
        if (isVisible && dialogRef.current) {
            dialogRef.current.showModal();
        }
    }, [isVisible]);

    useEffect(() => {
        if (feedback) {
            const timer = setTimeout(() => setFeedback(''), 4000);
            return () => clearTimeout(timer);
        }
    }, [feedback]);


    useEffect(() => {
        const fetchAvailableCollections = async () => {
            const res = await fetch(`/api/available-collections/${imageData.id}`);
            const data = await res.json();
            setCollections(data);
        };

        fetchAvailableCollections();
    }, [imageData, isVisible]);


    const handleSave = async (collectionId: string) => {
        setIsSaving(true);
        setFeedback('');
        try {
            const res = await fetch('/api/add-to-collection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: imageData, collectionId }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsVisible(false);
                setCollections([]);
                router.refresh();
            } else {
                setFeedback(data.message);
            }
        } catch (err) {
            console.error('Error de red:', err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <dialog ref={dialogRef} className={styles.dialog}>
            <div>
                <p>Add to Collections</p>
                <input
                    type="text"
                    placeholder="Collection name"
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}

                />
                <button className={styles.close} onClick={() => { setIsVisible(false); dialogRef.current?.close(); }}>
                    <img src="/resources/Plus.svg" alt="close icon" />
                </button>
                {filteredCollections.length === 0 ? (
                    <p>No matching collections found</p>
                ) : (
                    <ul>
                        {filteredCollections.map((c) => (
                            <li key={c._id} >
                                <button className={styles.collection} onClick={() => handleSave(c._id)} disabled={isSaving}>
                                    <img src={c.thumbnail} alt="Collection thumbnail" />
                                    <p>{c.name}</p>
                                    <div className={styles.add}>
                                        <img src="/resources/Plus.svg" alt="Add icon" />
                                        <p> {isSaving ? 'Saving...' : 'Add to collection'}</p>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}


                {feedback && <p className="text-red-500 mt-2">{feedback}</p>}
            </div>
        </dialog>
    )
}

export default AddToCollectionsDialog