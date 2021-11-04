import Link from 'next/link'
import styles from '../styles/mainmenu.module.css'
import { useRouter } from 'next/router'

export default function MainMenu() {

  const router = useRouter();

  function generateMenuOption(url: string, icon: string, title: string, subtitle?: string) {
    const classActive = router.asPath === url ? styles.active : null;
    return (
      <Link href={url} passHref>
          <div className={styles.menuOption + " " + classActive}>
            <img src={icon} alt="" />
            <h3>{title}</h3>
            <p>{subtitle}</p>
          </div>
      </Link>
    )
  }

  return (

    <div className={styles.menu}>

      <Link href="/" passHref>
        <div className={styles.menuLogo}>
          <img src="/icons/accords.svg" alt="" />
          <h2>Accord&apos;s Library</h2>
        </div>
      </Link>
      
      <button>Change language</button>

      <hr />

      {generateMenuOption("/library", "/icons/book-solid.svg", "Library", "Browse all physical and digital media")}
      {generateMenuOption("/hubs", "/icons/hubs.svg", "Hubs", "Explore all content of a specific game/series")}
      {generateMenuOption("/chronology", "/icons/timeline-solid.svg", "Chronology", "Follow all events in chronological order")}

      <hr />

      {generateMenuOption("/archive", "/icons/box-archive-solid.svg", "Archive")}
      {generateMenuOption("/news", "/icons/newspaper-solid.svg", "News")}
      {generateMenuOption("/gallery", "/icons/images-solid.svg", "Gallery")}
      {generateMenuOption("/about-us", "/icons/circle-info-solid.svg", "About us")}

      <hr />

      <div className={styles.menuFooter}>
        <p>This website&rsquo;s content is made available under <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC-BY-SA</a> unless otherwise noted.</p>
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
          <div className={styles.menuFooterCC}>
            <img src="/icons/creative-commons-brands.svg" alt="" />
            <img src="/icons/creative-commons-by-brands.svg" alt="" />
            <img src="/icons/creative-commons-sa-brands.svg" alt="" />
          </div>
        </a>
        <p>Accord&rsquo;s Library is not affiliated with or endorsed by SQUARE ENIX CO. LTD. All game assets and promotional materials belongs to © SQUARE ENIX CO. LTD.</p>
        <div className={styles.menuFooterSocials}>
          <a href="https://github.com/Accords-Library"><img src="/icons/github-brands.svg" alt="" /></a>
          <a href="https://accords-library.com/discord"><img src="/icons/discord-brands.svg" alt="" /></a>
        </div>
      </div>
    </div>
  )
}