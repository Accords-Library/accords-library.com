import Link from 'next/link'
import styles from './mainmenu.module.css'

export default function MainMenu() {
  return (
    <div className={styles.menu}>

      <Link href="/" passHref>
        <div className={styles.menuLogo}>
          <img src="/icons/accords.png" alt="" />
          <h2>Accord&apos;s Library</h2>
        </div>
      </Link>
      
      <button>Change language</button>

      <hr></hr>

      <Link href="/library" passHref>
        <div className={styles.menuOption}>
          <img src="/icons/books.png" alt="" />
          <h3>Library</h3>
          <p>Browse all physical and digital media</p>
        </div>
      </Link>

      <Link href="/hubs" passHref>
        <div className={styles.menuOption}>
          <img src="/icons/hubs.png" alt="" />
          <h3>Hubs</h3>
          <p>Explore all content of a specific game/series</p>
        </div>
      </Link>

      <Link href="/chronology" passHref>
        <div className={styles.menuOption}>
          <img src="/icons/chronology.png" alt="" />
          <h3>Chronology</h3>
          <p>Follow all events in chronological order</p>
        </div>
      </Link>

      <hr></hr>

      <Link href="/archive" passHref>
        <div className={styles.menuOption}>
          <img src="/icons/archive.png" alt="" />
          <h3>Archive</h3>
        </div>
      </Link>

      <Link href="/news" passHref>
        <div className={styles.menuOption}>
          <img src="/icons/news.png" alt="" />
          <h3>News</h3>
        </div>
      </Link>

      <Link href="/gallery" passHref>
        <div className={styles.menuOption}>
          <img src="/icons/gallery.png" alt="" />
          <h3>Gallery</h3>
        </div>
      </Link>

      <Link href="/about-us" passHref>
        <div className={styles.menuOption}>
          <img src="/icons/info.png" alt="" />
          <h3>About us</h3>
        </div>
      </Link>

    </div>
  )
}