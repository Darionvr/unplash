'use client';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import styles from '@/app/page.module.css'

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

    return (
        <div className={styles.search} data-visible={isVisible ? 'true' : 'false'}>
            { isVisible ? '' :   (
                <>
                    <h1>Search</h1>
                    <p>Search high-resolution images from Unsplash</p>
                </>

            )}

            <div>
                <input
                    placeholder={placeholder}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch((e.target as HTMLInputElement).value);
                            setIsVisible(true)
                        }
                    }}
                    defaultValue={searchParams.get('query')?.toString()}
                    type='text'
                />
                <img src="/resources/Search.svg" alt="search icon" />
            </div>
        </div>

    );
}
