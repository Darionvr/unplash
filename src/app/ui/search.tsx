'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import styles from '@/app/page.module.css'
import { useRef } from 'react';

interface SearchProps {
    placeholder: string;
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Search({ placeholder, isVisible, setIsVisible }: SearchProps) {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()
    const handleSearch = (term: string) => {

        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term)
        } else {
            params.delete('query')
        }
        replace(`${pathname}?${params.toString()}`)
    };
    const inputRef = useRef<HTMLInputElement>(null);
    const triggerSearch = () => {
        const value = inputRef.current?.value || '';
        handleSearch(value);
        setIsVisible(true);
    };

    return (
        <div className={styles.search} data-visible={isVisible ? 'true' : 'false'}>
            {isVisible ? '' : (
                <>
                    <h1>Search</h1>
                    <p>Search high-resolution images from Unsplash</p>
                </>
            )}
            <div>
                <input
                ref={inputRef}
                    placeholder={placeholder}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          triggerSearch();
                        }
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
                    type='text'
                />
                <img src="/resources/Search.svg" alt="search icon" onClick={triggerSearch} />
            </div>
        </div>
    );
}
