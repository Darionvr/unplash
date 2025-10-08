'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { CollectionsType } from '@/lib/definitions';

interface DialogProps {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;

    imageData: {
        id: string;
        url: string;
        alt: string;
    };
}

const AddToCollectionsDialog = ({ isVisible, setIsVisible, imageData }: DialogProps) => {

    const [collections, setCollections] = useState<CollectionsType[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState('');
    console.log(collections)

    const router = useRouter()

    const dialogRef = useRef<HTMLDialogElement>(null);

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
        <dialog ref={dialogRef}>
            <div>
                <p>Add to Collections</p>
                <input
                    type="text"
                    placeholder="Collection name"

                />
                <button onClick={() => { setIsVisible(false); dialogRef.current?.close(); }}>
                    Cancel
                </button>
                {collections.map((c: any) => (
                    <div key={c._id}>
                        {/*  <img src="#" alt="None" /> */}
                        <p>{c.name}</p>
                        <button onClick={() => handleSave(c._id)} disabled={isSaving}>
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                ))}


                {feedback && <p className="text-red-500 mt-2">{feedback}</p>}
            </div>
        </dialog>
    )
}

export default AddToCollectionsDialog