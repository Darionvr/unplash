'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useState, useRef, useEffect } from 'react';
import styles from '@/app/css/collections.module.css';

interface DialogProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCollectionDialog = ({isVisible, setIsVisible} :DialogProps) => {

    const [collectionName, setCollectionName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState('');

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



    const handleSave = async () => {
        setIsSaving(true);
        setFeedback('');
        try {
            const res = await fetch('/api/createCollection', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: collectionName }),
            });

            const data = await res.json();

            if (res.ok) {
                setIsVisible(false);
                setCollectionName('');
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
        <dialog className={styles.dialog} ref={dialogRef}>
            <div>
                <p>Add Collection</p>
                <input
                    type="text"
                    placeholder="Collection name"
                    value={collectionName}
                    onChange={(e) => setCollectionName(e.target.value)}
                />
                <button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save'}
                </button>
                <button onClick={() => { setIsVisible(false); dialogRef.current?.close(); }}>
                    Cancel
                </button>
                {feedback && <p className="text-red-500 mt-2">{feedback}</p>}
            </div>
        </dialog>
    )
}

export default AddCollectionDialog