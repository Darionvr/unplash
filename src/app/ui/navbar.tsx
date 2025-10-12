import React from 'react'
import styles from '@/app/css/navbar.module.css'
import Link from 'next/link'

const Navbar = () => {
  return (
   <nav className={styles.navbar}>
    <Link href={'/'}> <img className={styles.logo} src="/resources/Logo.svg" alt="Unplash Logo" /></Link>
    <ul>
        <li>
            <Link href={'/'}>Home</Link>
        </li>
        <li>
            <Link href={'/collections'}>Collections</Link>
        </li>
    </ul>
   </nav>
  )
}

export default Navbar